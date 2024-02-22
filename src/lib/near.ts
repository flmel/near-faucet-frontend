import { FaucetContract } from '@/app/api/faucet/tokens/models';
import { EXEC_GAS } from '@/consts';
import { Account, InMemorySigner, KeyPair } from 'near-api-js';
import { InMemoryKeyStore } from 'near-api-js/lib/key_stores';
import { JsonRpcProvider } from 'near-api-js/lib/providers';

let nearAccount: Account;

const connectToNearAccount = async () => {
  if (nearAccount) return;

  const { NEAR_CALLER_ID, NEAR_CALLER_PRIK } = process.env;

  const keyPair = KeyPair.fromString(NEAR_CALLER_PRIK);
  const keyStore = new InMemoryKeyStore();
  await keyStore.setKey('testnet', NEAR_CALLER_ID, keyPair);

  nearAccount = new Account({
    networkId: 'testnet',
    provider: new JsonRpcProvider({ url: 'https://rpc.testnet.near.org' }),
    signer: new InMemorySigner(keyStore),
    jsvmAccountId: 'jsvm.testnet'
  }, NEAR_CALLER_ID);
};

export const connectToFaucet = async (): Promise<FaucetContract> => {
  await connectToNearAccount();

  return {
    'ft_list_tokens': async () => await nearAccount.viewFunction({ contractId: process.env.NEAR_FAUCET_ID, methodName: 'ft_list_tokens' }),
    'request_near': async (args: { request_amount: string, receiver_id: string; }) => await nearAccount.functionCall({ contractId: process.env.NEAR_FAUCET_ID, methodName: 'request_near', args, gas: EXEC_GAS }),
    'ft_request_funds': async (args: { amount: string, receiver_id: string, ft_contract_id: string; }) => await nearAccount.functionCall({ contractId: process.env.NEAR_FAUCET_ID, methodName: 'ft_request_funds', args, gas: EXEC_GAS })
  };
};

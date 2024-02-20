import { FaucetContract } from '@/app/api/faucet/tokens/models';
import { Account, Contract, InMemorySigner, KeyPair } from 'near-api-js';
import { InMemoryKeyStore } from 'near-api-js/lib/key_stores';
import { JsonRpcProvider } from 'near-api-js/lib/providers';

declare global {
  var faucetContract: Contract & FaucetContract;
  var nearAccount: Account;
}

let nearAccount = globalThis.nearAccount;

export const connectToNearAccount = async () => {
  if (nearAccount) return;
  const { NEAR_CALLER_ID, NEAR_CALLER_PRIK } = process.env;

  const keyPair = KeyPair.fromString(NEAR_CALLER_PRIK);
  const keyStore = new InMemoryKeyStore();
  await keyStore.setKey("testnet", NEAR_CALLER_ID, keyPair);

  const signingAccount = new Account({
    networkId: "testnet",
    provider: new JsonRpcProvider({ url: "https://rpc.testnet.near.org" }),
    signer: new InMemorySigner(keyStore),
    jsvmAccountId: "jsvm.testnet"
  }, NEAR_CALLER_ID);

  globalThis.nearAccount = signingAccount;
};



























// import { FaucetContract } from '@/app/api/faucet/tokens/types';
// import { Account, Contract, InMemorySigner, KeyPair, WalletConnection } from 'near-api-js';
// import { InMemoryKeyStore } from 'near-api-js/lib/key_stores';
// import { JsonRpcProvider } from 'near-api-js/lib/providers';


// declare global {
//   var faucetContract: Contract & FaucetContract;
//   var nearAccount: Account;
// }

// let faucetContract = globalThis.faucetContract;
// let nearAccount = globalThis.nearAccount;


// export const connectToFaucet = async () => {
//   if (faucetContract) return;
//   await connectToAccount();

//   const faucet = new Contract(nearAccount, "v2.faucet.nonofficial.testnet",
//     {
//       viewMethods: ["ft_list_tokens"],
//       changeMethods: ["request_near", "ft_request_funds"],
//       useLocalViewExecution: false
//     }
//   ) as Contract & FaucetContract;

//   globalThis.faucetContract = faucet;
// };

// export const connectToAccount = async () => {
//   if (nearAccount) return;
//   const { NEAR_CALLER_ID, NEAR_CALLER_PRIK } = process.env;

//   const keyPair = KeyPair.fromString(NEAR_CALLER_PRIK);
//   const keyStore = new InMemoryKeyStore();
//   await keyStore.setKey("testnet", NEAR_CALLER_ID, keyPair);

//   const signingAccount = new Account({
//     networkId: "testnet",
//     provider: new JsonRpcProvider({ url: "https://rpc.testnet.near.org" }),
//     signer: new InMemorySigner(keyStore),
//     jsvmAccountId: "jsvm.testnet"
//   }, NEAR_CALLER_ID);

//   globalThis.nearAccount = signingAccount;
// };

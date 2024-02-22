import { FinalExecutionOutcome } from 'near-api-js/lib/providers';
import { NextRequest } from 'next/server';


export interface ITokenDTO {
  ft_config: {
    ft_request_allowance: number,
    ft_available_balance: number,
    ft_metadata: {
      decimals: number;
      icon: string;
      name: string;
      reference: string | null;
      reference_hash: string | null;
      spec: string;
      symbol: string;
    };
  };
  ft_contract_id: string;
}

export interface FaucetContract {
  ft_list_tokens: () => Promise<ITokenDTO[]>;
  request_near: (args: { request_amount: string, receiver_id: string; }) => Promise<FinalExecutionOutcome>;
  ft_request_funds: (args: { amount: string, receiver_id: string, ft_contract_id: string; }) => Promise<FinalExecutionOutcome>;
}

export interface RequestTokensApiRequest extends NextRequest {
  amount: string,
  receiverId: string,
  contractId: string;
}

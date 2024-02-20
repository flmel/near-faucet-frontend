import { Contract } from 'near-api-js';
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

export interface FaucetContract extends Contract {
  ft_list_tokens: () => Promise<ITokenDTO[]>;
  request_near: (body: { args: { request_amount: string, receiver_id: string; }; }) => Promise<unknown>;
  ft_request_funds: (body: { args: { amount: string, receiver_id: string, ft_contract_id: string; }; }) => Promise<unknown>;
}

export interface RequestTokensApiRequest extends NextRequest {
  amount: string,
  receiverId: string,
  contractId: string;
}

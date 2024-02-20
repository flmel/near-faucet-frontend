export interface IToken {
  contractId: string;
  name: string;
  icon: string;
  decimals: number;
  requestAllowance: string; //humanized allowance
  symbol: string;
}

export interface IReqForm {
  amount: string,
  account: string,
}

export interface IRequestFundsDetailsDTO {
  amount: string,
  receiverId: string,
  contractId: string;
}

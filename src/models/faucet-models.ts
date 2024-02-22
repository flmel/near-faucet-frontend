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


type TransactionIndicatorType = 'success' | 'error' | '';
export interface ITransactionIndicatorConfig {
  type: TransactionIndicatorType, txh: string, body?: string;
}

export interface ITransactionIndicatorUI {
  img: string;
  title: TransactionIndicatorType,
  body: string,
  txh: string;
  textColor: 'text-green-400' | 'text-red-400',
  buttonText: 'Close' | 'Try again';
}

export interface ITokensDropdownConfig {
  tokens: IToken[],
  selectedToken: IToken,
  emitToken: (token: IToken) => void;
}

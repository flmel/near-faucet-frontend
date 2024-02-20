import { ITokenDTO } from '@/app/api/faucet/tokens/models';
import { IReqForm, IRequestFundsDetailsDTO, IToken } from '../models/faucet-models';

// transformers
export const toUiTokens = (tokens: ITokenDTO[]): IToken[] => {
  return tokens.map(t => ({
    contractId: t.ft_contract_id,
    name: t.ft_config.ft_metadata.name,
    icon: t.ft_config.ft_metadata.icon,
    decimals: t.ft_config.ft_metadata.decimals,
    requestAllowance: humanizeAmount(BigInt(t.ft_config.ft_request_allowance) + "", t.ft_config.ft_metadata.decimals),
    symbol: t.ft_config.ft_metadata.symbol
  }));
};

export const toFundsReq = (formValues: IReqForm, selectedToken: IToken): IRequestFundsDetailsDTO => {
  return {
    contractId: selectedToken.contractId,
    receiverId: formValues.account,
    amount: parseHumanizedAmount(formValues.amount, selectedToken.decimals)
  };
};

const humanizeAmount = (amount: string, decimals: number) => {
  return amount.slice(0, -decimals);
};

// const amount = nearAPI.utils.format.parseNearAmount("1.5");
const parseHumanizedAmount = (amount: string, decimals: number) => {
  let strAmount = amount;

  for (let i = 0; i < decimals; i++) {
    strAmount += '0';
  }
  return strAmount;
};


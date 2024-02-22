export const isAccountValid = (account: string) => {
  return isAccountExplicit(account) || isAccountImplicit(account) || isAccountDev(account);
};

export const isAmountValid = (amount: string) => {
  return new RegExp(/^[1-9][0-9]*$/).test(amount);
};

const isAccountExplicit = (account: string) => {
  // eslint-disable-next-line no-useless-escape
  return new RegExp(/^([A-Za-z\d]+[\-_])*[A-Za-z\d]+\.testnet$/).test(account);
};

const isAccountImplicit = (account: string) => {
  return new RegExp(/^[a-zA-Z0-9]{64}$/).test(account);
};

const isAccountDev = (account: string) => {
  return new RegExp(/^[a-zA-Z0-9]{64}$/).test(account);
};

'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IReqForm, IToken, ITransactionIndicatorConfig } from '@/models/faucet-models';
import TokensDropdown from './tokens-dropdown';
import { ErrorMessage } from '@hookform/error-message';
import { isAccountValid, isAmountValid } from '../utils/form-validators';
import { useFaucet } from '@/hooks/use-faucet';
import { TransactionIndicator } from './transaction-indicator';
import { DEFAULT_INDICATOR_CONFIG } from '@/consts';

// TODO: Load the component once you get the tokens list
// TODO: Maybe extract the form template in a separate component
// Refactor: Include token in the form
export const RequestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [indicatorConfig, setIndicatorConfig] = useState<ITransactionIndicatorConfig>(DEFAULT_INDICATOR_CONFIG);
  const { tokens, selectedToken, requestFunds, setSelectedToken, resetSelectedToken } = useFaucet();

  const { register, handleSubmit, setValue, reset,
    formState: { errors, isDirty, isValid } } = useForm<IReqForm>({
      mode: 'onChange',
      defaultValues: {
        account: '',
        amount: selectedToken.requestAllowance
      }
    });

  useEffect(() => {
    setValue('amount', selectedToken.requestAllowance);
  }, [selectedToken, setValue]);

  const onSubmit = async (formValues: IReqForm) => {
    if (!isValid || !isDirty) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await requestFunds(formValues);
      setIndicatorConfig({ type: res.error ? 'error' : 'success', txh: res.txh, body: res.error || '' });
      setIsMessageOpen(true);
    } catch (error) {
      console.error(error);
    }

    resetForm();
    setIsLoading(false);
  };

  const resetForm = () => {
    reset();
    resetSelectedToken();
  };

  const closeMessage = () => {
    setIsMessageOpen(false);
    setIndicatorConfig(DEFAULT_INDICATOR_CONFIG);
  };


  return (
    // TODO: change the absolute px values to something else (what else? :()
    <div className='form px-6 py-5 md:py-10 md:px-14 min-w-full min-h-[460px] md:min-h-[544px] flex justify-center items-center'>
      {isLoading && !isMessageOpen ? <div className='animate-fade-in'><div className='loader'></div></div> : <></>}
      {!isLoading && isMessageOpen ? <div className='animate-fade-in'><TransactionIndicator config={indicatorConfig} closeMessage={closeMessage} /></div> : <></>}
      {!isLoading && !isMessageOpen ?
        <form className='animate-fade-in' onSubmit={handleSubmit(onSubmit)}>
          <div className='pr-10 hidden md:block'>
            <h2 className='font-semibold text-3xl mb-2'>Get testnet tokens</h2>
            <p className="text-md mb-12">Use this faucet to request testnet NEAR or provided Fungible Tokens</p>
          </div>
          <fieldset className='mb-4'>
            {/* Token input */}
            <div className='mb-5'>
              <span>Token</span>
              <TokensDropdown tokens={tokens} selectedToken={selectedToken} emitToken={(value: IToken) => setSelectedToken(value)} />
            </div>
            {/* Account input */}
            <div className='pb-5 relative'>
              <label htmlFor="account">Wallet Address</label>
              <input
                id="account"
                placeholder='example.testnet'
                className={`border-2 border-transparent bg-zinc-900 w-full rounded-lg text-sm px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-pink-500 ${errors.account?.message ? '!border-red-400' : ''}`}
                type="text"
                {
                ...register('account', {
                  required: true,
                  minLength: 1,
                  validate: (value) => isAccountValid(value) || 'Invalid account'
                })
                }
              ></input>
              <ErrorMessage
                errors={errors}
                name="account"
                render={({ message }) => <p className='text-red-400 text-sm absolute bottom-0'>{message}</p>}
              />
            </div>
            <div className='pb-5 relative'>
              {/* Amount input */}
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                className={`border-2 border-transparent bg-zinc-900 w-full rounded-lg text-sm px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-pink-500 ${errors.amount?.message ? '!border-red-400' : ''}`}
                type="text"
                {
                ...register('amount',
                  {
                    required: true,
                    minLength: 1,
                    validate: {
                      isAmountValid: (value) => (isAmountValid(value) || value === '') || 'Invalid amount',
                      isAmountGreater: (value) => Number(value) <= Number(selectedToken.requestAllowance) || `Amount cannot be more than ${selectedToken.requestAllowance}`,
                    }
                  }
                )
                }></input>
              <ErrorMessage
                errors={errors}
                name="amount"
                render={({ message }) => <p className='text-red-400 text-sm absolute bottom-0'>{message}</p>}
              />
            </div>
          </fieldset>
          <div className='text-center'>
            <button className='bg-pink-600 hover:bg-pink-500 rounded px-10 py-2 text-lg shadow-inner' type="submit">Request</button>
          </div>
        </form> :
        <></>}
    </div>
  );
};

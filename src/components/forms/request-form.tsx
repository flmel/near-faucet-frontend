'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IReqForm, IToken } from '@/models/faucet-models';
import TokensDropdown from './tokens-dropdown';
import { ErrorMessage } from '@hookform/error-message';
import { isAccountValid, isAmountValid } from '../../utils/form-validators';
import { useFaucet } from '@/hooks/use-faucet';

// TODO:
// Loading indicators
// Error handling
// Success message
// Refactor: Include token in the form
export const RequestForm = () => {
  const { tokens, selectedToken, requestFunds, setSelectedToken } = useFaucet();
  const { register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid } } = useForm<IReqForm>({
      mode: 'onChange',
      defaultValues: {
        account: '',
        amount: selectedToken.requestAllowance
      }
    });

  useEffect(() => {
    setValue("amount", selectedToken.requestAllowance);
  }, [selectedToken, setValue]);

  const onSubmit = async (formValues: IReqForm) => {
    const res = await requestFunds(formValues);
    // display success message on success or error
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Get testnet tokens</legend>
        <TokensDropdown tokens={tokens} selectedToken={selectedToken} emitToken={(value: IToken) => setSelectedToken(value)} />
        {/* Account input */}
        <input
          className='mt-10 border-0 bg-slate-900 w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 placeholder-gray-600'
          type="text"
          {
          ...register("account", {
            required: true,
            validate: isAccountValid
          })
          }
        ></input>
        <ErrorMessage
          errors={errors}
          name="account"
          render={() => <p>Invalid account</p>}
        />
        {/* Amount input */}
        <input
          className='mt-10 border-0 bg-slate-900 w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 placeholder-gray-600'
          type="text"
          {
          ...register("amount",
            {
              required: true,
              validate: {
                isAmountGreater: (value) => Number(value) <= Number(selectedToken.requestAllowance) || `Amount cannot be more than ${selectedToken.requestAllowance}`,
                isAmountValid: (value) => isAmountValid(value) || 'Invalid amount'
              }
            }
          )
          }></input>
        <ErrorMessage
          errors={errors}
          name="amount"
          render={({ message }) => <p>{message}</p>}
        />

      </fieldset>
      <button className="text-slate-900 bg-fuchsia-600 pr-16 pl-2 hover:bg-fuchsia-500 transition-bg duration-500 rounded-r hidden md:inline-block" type="submit" disabled={!isDirty || !isValid}>Request</button>
      <button className="text-slate-900 bg-fuchsia-600 mt-4 py-4 hover:bg-fuchsia-500 transition-bg duration-500 rounded  w-full md:hidden" type="submit" disabled={!isDirty || !isValid}>Request</button>
    </form >
  );
};

'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IReqForm, IToken } from '@/models/faucet-models';
import TokensDropdown from './tokens-dropdown';
import { ErrorMessage } from '@hookform/error-message';
import { isAccountValid, isAmountValid } from '../../utils/form-validators';
import { useFaucet } from '@/hooks/use-faucet';
import Image from 'next/image';

// TODO:
// Responsiveness
// Put messages and loading in separate components
// Refactor: Include token in the form
export const RequestForm = () => {
  const { tokens, selectedToken, requestFunds, setSelectedToken } = useFaucet();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ isOpen: false, type: "", txh: "" });
  const { register, handleSubmit, setValue, reset,
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
    if (!isValid || !isDirty) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await requestFunds(formValues);
      setMessage({ isOpen: true, type: res.error ? "failure" : "success", txh: res.txh });
      reset();
    } catch (error) {
      console.error(error);
    }

    reset();
    setIsLoading(false);
  };

  const closeMessage = () => {
    setMessage({ isOpen: false, type: "", txh: "" });
  };

  return (
    <div className='form pt-10 px-14 pb-12 w-4/5 min-h-[550px] flex justify-center items-center'>
      {isLoading && !message.isOpen ?
        <div className={'fadeIn'}>
          <div className='loader'></div>
        </div> :
        <></>}
      {!isLoading && message.isOpen && message.type === 'success' ? <div className={'fadeIn'}>
        <div className='flex flex-col items-center text-center'>
          <h4 className='text-4xl text-green-400 uppercase font-medium'>Success</h4>
          <p className='text-xs'>Check the transaction for more details</p>
          <Image className='mt-5' src="svgs/success-illustration.svg" width={250} height={250} alt='Success illustration' />
          <div className='mt-4 text-lg flex items-center'>
            <Image className="mr-2" src="icons/arrow-right.svg" alt="Arrow right" width={18} height={18} />
            <a className='underline' href={`https://testnet.nearblocks.io/txns/${message.txh}`} target='_blank'>Go to the transaction</a>
          </div>
          <button type="reset" className='mt-8 bg-pink-600 hover:bg-pink-500 rounded px-10 py-2 text-lg shadow-inner' onClick={() => closeMessage()}>Close</button>
        </div>
      </div> : <></>}
      {!isLoading && message.isOpen && message.type === 'failure' ? <div className={'fadeIn'}>
        <div className='flex flex-col items-center text-center'>
          <h4 className='text-4xl text-red-400 uppercase font-medium'>Error</h4>
          {message.txh ? <p className='text-xs'>Check the transaction for more details</p> : <></>}
          <Image className="mt-5" src="svgs/failure-illustration.svg" width={250} height={250} alt='Failure illustration' />
          {message.txh ? <div className='mt-4 text-lg flex items-center'>
            <Image className="mr-2" src="icons/arrow-right.svg" alt="Arrow right" width={18} height={18} />
            <a className='underline' href={`https://testnet.nearblocks.io/txns/${message.txh}`} target='_blank'>Go to the transaction</a>
          </div> : <></>}
          <button type="reset" className='mt-8 bg-pink-600 hover:bg-pink-500 rounded px-10 py-2 text-lg shadow-inner' onClick={() => closeMessage()}>Try again</button>
        </div>
      </div> : <></>}
      {!isLoading && !message.isOpen ? <form className={`fadeIn`} onSubmit={handleSubmit(onSubmit)}>
        <div className='pr-10'>
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
              placeholder='example.testnet'
              className={`border-2 border-transparent bg-zinc-900 w-full rounded-lg text-sm px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-pink-500 ${errors.account?.message ? 'border-red-400' : ''}`}
              type="text"
              {
              ...register("account", {
                required: true,
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
              className={`border-2 border-transparent bg-zinc-900 w-full rounded-lg text-sm px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-pink-500 ${errors.amount?.message ? 'border-red-400' : ''}`}
              type="text"
              {
              ...register("amount",
                {
                  required: true,
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
      </form> : <></>}
    </div>
  );
};

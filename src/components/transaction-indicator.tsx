import { ITransactionIndicatorConfig, ITransactionIndicatorUI } from '@/models/faucet-models';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const TransactionIndicator = ({ config, closeMessage }: { config: ITransactionIndicatorConfig, closeMessage: () => void; }) => {
  const [message, setMessage] = useState<ITransactionIndicatorUI | null>(null);

  useEffect(() => {
    console.log("when im here");
    const message = {
      img: `svgs/${config.type}-illustration.svg`,
      title: config.type,
      body: config.body || 'Check the transaction for more details.',
      txh: config.txh,
      // Find out whether there is a better way to type these two properties and not typecast
      textColor: config.type === 'success' ? 'text-green-400' as const : 'text-red-400' as const,
      buttonText: config.type === 'success' ? 'Close' as const : 'Try again' as const,
    };
    setMessage(message);
  }, [config]);



  return message ? <div className='flex flex-col items-center text-center'>
    <h4 className={`text-4xl uppercase font-medium ${message.textColor}`}>{message.title}</h4>
    <p className='text-xs'>{message.body}</p>
    <Image className='mt-5' src={message.img} width={250} height={250} alt={`${message.title} illustration`} />
    <div className='mt-4 text-lg flex items-center'>
      <Image className="mr-2" src="icons/arrow-right.svg" alt="Arrow right" width={18} height={18} />
      <a className='underline' href={`https://testnet.nearblocks.io/txns/${message.txh}`} target='_blank'>Go to the transaction</a>
    </div>
    <button type="reset" className='mt-8 bg-pink-600 hover:bg-pink-500 rounded px-10 py-2 text-lg shadow-inner' onClick={() => closeMessage()}>{message.buttonText}</button>
  </div> : <></>;
};

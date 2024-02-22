import Image from 'next/image';

export const NearLogo = () => {
  return <div className='flex flex-col items-center max-w-fit'>
    <Image alt='Near Logo' src="svgs/near-logo.svg" width={350} height={95} />
    <div className='bg-pink-500 text-center py-1 w-11/12 -mt-6 -z-10'>
      <h4 className='font-semibold text-xl'>testnet</h4>
    </div>
    <h1 className='font-semibold text-8xl -mt-6'>faucet</h1>
  </div>;
};

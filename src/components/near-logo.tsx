import Image from 'next/image';

export const NearLogo = () => {
  return <div className='w-1/2 flex flex-col items-center'>
    <Image alt='Near Logo' src="svgs/near-logo.svg" width={350} height={95} />
    <div className='bg-pink-500 text-center py-1 w-full -mt-6 -z-10'>
      <h4 className='font-semibold text-xl'>testnet</h4>
    </div>
    <h1 className='font-semibold text-8xl -mt-6'>faucet</h1>
  </div>;
};

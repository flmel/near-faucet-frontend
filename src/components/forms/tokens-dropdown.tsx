
import { IToken } from '@/models/faucet-models';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useRef, useState } from 'react';
import Image from 'next/image';

// Refactor: Generic dropdown supporting image (optional), title (required)
const TokensDropdown = ({ tokens, selectedToken, emitToken }: { tokens: IToken[], selectedToken: IToken, emitToken: (token: IToken) => void; }) => {
  const DropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  useClickOutside(DropdownRef, () => setOpen(false));


  const handleToggle = (): void => {
    setOpen((prev) => !prev);
  };

  const selectToken = (token: IToken) => {
    if (token.contractId !== selectedToken.contractId) {
      emitToken(token);
    }

    handleToggle();
  };

  return (
    <div className="relative" ref={DropdownRef}>
      <button onClick={handleToggle} data-dropdown-toggle="dropdown" type="button" className={`flex justify-between items-center border-2 border-b-0 border-transparent bg-zinc-900 w-full rounded-lg text-sm px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-pink-500 ${isOpen ? 'rounded-b-none border-b-0' : ""}`}>
        <div className="flex items-center">
          <Image className='bg-white mr-2 p-0.5 rounded-sm' src={selectedToken.icon} alt="logo" width={20} height={20} />
          <span>{selectedToken.name}</span>
        </div>
        {/* {
          isOpen ?
            <Image className='text-white' alt='Dropdown icon' src="icons/dropdown.svg" width={10} height={10} />
            :
            <Image className='text-white rotate-180' alt='Dropdown icon' src="icons/dropdown.svg" width={10} height={10} />
        } */}
        {/* <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg> */}
      </button>

      {/* <!-- Dropdown menu --> */}
      {
        isOpen ?
          <div id="dropdown" className={`z-10 absolute bg-white max-h-64 overflow-scroll divide-y divide-gray-100 rounded-lg rounded-t-none shadow w-full dark:bg-gray-700 ${isOpen ? 'border-2 border-pink-500 border-t-0' : ""}`}>
            <ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
              {/* Make the selected token background cooler and support it on hover :D */}
              {tokens.map((t, i) => (<li key={i} className={`${t.contractId === selectedToken.contractId ? 'bg-pink-500 text-white' : 'text-zinc-900 hover:text-white'}`}>
                <button onClick={() => selectToken(t)} className="flex px-4 py-2 w-full hover:bg-blue-900">
                  <Image className="bg-white mr-2 p-0.5 rounded-sm" src={t.icon} alt="Token logo" width={20} height={20} />
                  {t.name}
                </button>
              </li>))}
            </ul>
          </div>
          : <></>
      }
    </div>
  );
};


export default TokensDropdown;

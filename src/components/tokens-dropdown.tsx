
import { IToken, ITokensDropdownConfig } from '@/models/faucet-models';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useRef, useState } from 'react';
import Image from 'next/image';

// TODO:
// check for the dark tailwind classes and how they behave
// Refactor: Generic dropdown supporting image (optional), title (required)
const TokensDropdown = ({ tokens, selectedToken, emitToken }: ITokensDropdownConfig) => {
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
      <button onClick={handleToggle} data-dropdown-toggle="dropdown" type="button" className={`flex justify-between items-center border-2 border-transparent bg-zinc-900 w-full rounded-lg text-sm px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-pink-500 ${isOpen ? '!rounded-b-none !border-b-transparent' : ""}`}>
        <div className="flex items-center">
          <Image className='bg-white mr-2 p-0.5 rounded-sm' src={selectedToken.icon} alt="logo" width={20} height={20} />
          <span>{selectedToken.name}</span>
        </div>
        {
          !isOpen ?
            <Image alt='Dropdown icon' src="icons/dropdown.svg" width={15} height={15} />
            :
            <Image className='rotate-180' alt='Dropdown icon' src="icons/dropdown.svg" width={15} height={15} />
        }
      </button>

      {/* <!-- Dropdown menu --> */}
      {
        isOpen ?
          <div id="dropdown" className={`z-10 absolute -mt-1 transition-all bg-white max-h-64 overflow-scroll rounded-lg rounded-t-none shadow w-full border-2 border-pink-500 border-t-transparent border-t-0`}>
            <ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
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

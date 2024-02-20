
import { IToken } from '@/models/faucet-models';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useRef, useState } from 'react';

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
    tokens ? <div className="relative" ref={DropdownRef}>
      <button onClick={handleToggle} data-dropdown-toggle="dropdown" type="button" className='justify-between items-center bg-slate-900 w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex'>
        <div className="flex items-center">
          {/* TODO: change to <Image /> */}
          <img className='bg-white' src={selectedToken.icon} alt="logo" width={20} height={20}></img>
          <span>{selectedToken.name}</span>
        </div>
        {/* <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg> */}
      </button>

      {/* <!-- Dropdown menu --> */}
      {isOpen ? <div id="dropdown" className="z-10 absolute bg-white  divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {/* Make the selected token background cooler and support it on hover :D */}
          {tokens.map((t, i) => (<li key={i} className={t.contractId === selectedToken.contractId ? 'bg-red-100' : ""}>
            <button onClick={() => selectToken(t)} className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><img src={t.icon} alt="logo" width={20} height={20}></img>{t.name}</button>
          </li>))}
        </ul>
      </div> : <></>}
    </div> : <></>
  );
};


export default TokensDropdown;

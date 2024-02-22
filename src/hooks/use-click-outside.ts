import { MutableRefObject, useEffect } from 'react';
export const useClickOutside = (ref: MutableRefObject<any>, handler: () => any) => {
  useEffect(() => {
    const listener = (e: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref?.current || ref.current.contains(e.target)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    };
  }, [handler, ref]);
};

import { useEffect } from 'react';
import { sanitiseString } from '../utils/utils';

const useOutsideClick = (callback, className, dependencies = []) => {
  useEffect(() => {
    const handleClick = (e) => {
      const clickedElementClassName = e?.composedPath()[0]?.className;

      if (!sanitiseString(clickedElementClassName).includes(className)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, dependencies);
};

export default useOutsideClick;


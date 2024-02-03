import { FocusEvent } from 'react';

const handleOnBlur =
  <T extends HTMLDivElement | HTMLInputElement>(cb: (target: T) => void) =>
  (e: FocusEvent<T>) => {
    const target = e.currentTarget;

    if (!target) {
      return;
    }

    cb(target);
  };

export default handleOnBlur;

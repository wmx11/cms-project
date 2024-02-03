import { KeyboardEvent } from 'react';

const handleOnEscapeOrEnter =
  <T extends HTMLDivElement | HTMLInputElement>(cb: (target: T) => void) =>
  (e: KeyboardEvent<T>) => {
    const target = e.currentTarget;

    const isExitKey = e.key === 'Enter' || e.key === 'Escape';

    if (!target || !isExitKey) {
      return;
    }

    target.blur();
    cb(target);
  };

export default handleOnEscapeOrEnter;

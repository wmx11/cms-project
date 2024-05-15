import { KeyboardEvent } from 'react';

export const handleOnEscape =
  <T extends HTMLDivElement | HTMLInputElement>(cb: (target: T) => void) =>
  (e: KeyboardEvent<T>) => {
    const target = e.currentTarget;

    const isExitKey = e.key === 'Escape';

    if (!target || !isExitKey) {
      return;
    }

    target.blur();
    cb(target);
  };

export const handleOnEnter =
  <T extends HTMLDivElement | HTMLInputElement>(cb: (target: T) => void) =>
  (e: KeyboardEvent<T>) => {
    const target = e.currentTarget;

    const isExitKey = e.key === 'Enter';

    if (!target || !isExitKey) {
      return;
    }

    target.blur();
    cb(target);
  };

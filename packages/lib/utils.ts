import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce(cb: (args: any[]) => void, timeout = 1000) {
  let timer: NodeJS.Timeout | number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(args);
    }, timeout);
  };
}

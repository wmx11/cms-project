import React, { ComponentPropsWithoutRef, FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const BrowserTab: FC<PropsWithChildren & ComponentPropsWithoutRef<'div'>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        'flex h-[28px] w-[240px] items-center rounded-[9px] bg-[#363636] px-[9px] py-[6px]',
        className
      )}
    >
      <div className="mr-[8px] h-[16px] w-[16px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          id="globe"
        >
          <path
            fill="#5F6368"
            d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm5.2 5.3c.4 0 .7.3 1.1.3-.3.4-1.6.4-2-.1.3-.1.5-.2.9-.2zM1 8c0-.4 0-.8.1-1.3.1 0 .2.1.3.1 0 0 .1.1.1.2 0 .3.3.5.5.5.8.1 1.1.8 1.8 1 .2.1.1.3 0 .5-.6.8-.1 1.4.4 1.9.5.4.5.8.6 1.4 0 .7.1 1.5.4 2.2C2.7 13.3 1 10.9 1 8zm7 7c-.7 0-1.5-.1-2.1-.3-.1-.2-.1-.4 0-.6.4-.8.8-1.5 1.3-2.2.2-.2.4-.4.4-.7 0-.2.1-.5.2-.7.3-.5.2-.8-.2-.9-.8-.2-1.2-.9-1.8-1.2s-1.2-.5-1.7-.2c-.2.1-.5.2-.5-.1 0-.4-.5-.7-.4-1.1-.1 0-.2 0-.3.1s-.2.2-.4.1c-.2-.2-.1-.4-.1-.6.1-.2.2-.3.4-.4.4-.1.8-.1 1 .4.3-.9.9-1.4 1.5-1.8 0 0 .8-.7.9-.7s.2.2.4.3c.2 0 .3 0 .3-.2.1-.5-.2-1.1-.6-1.2 0-.1.1-.1.1-.1.3-.1.7-.3.6-.6 0-.4-.4-.6-.8-.6-.2 0-.4 0-.6.1-.4.2-.9.4-1.5.4C5.2 1.4 6.6 1 8 1h.8c-.6.1-1.2.3-1.6.5.6.1.7.4.5.9-.1.2 0 .4.2.5s.4.1.5-.1c.2-.3.6-.4.9-.5.4-.1.7-.3 1-.7 0-.1.1-.1.2-.2.6.2 1.2.6 1.8 1-.1 0-.1.1-.2.1-.2.2-.5.3-.2.7.1.2 0 .3-.1.4-.2.1-.3 0-.4-.1s-.1-.3-.4-.3c-.1.2-.4.3-.4.6.5 0 .4.4.5.7-.6.1-.8.4-.5.9.1.2-.1.3-.2.4-.4.6-.8 1-.8 1.7s.5 1.4 1.3 1.3c.9-.1.9-.1 1.2.7 0 .1.1.2.1.3.1.2.2.4.1.6-.3.8.1 1.4.4 2 .1.2.2.3.3.4-1.3 1.4-3 2.2-5 2.2z"
          />
        </svg>
      </div>
      <div className="relative mr-[13px] w-[225px] overflow-hidden whitespace-nowrap text-[13px] text-white">
        {children}
        <div className="absolute right-[-5px] top-0 h-full w-[10px] bg-[#363636] blur-[2px]"></div>
      </div>
      <div className="text-[10px] text-white">x</div>
    </div>
  );
};

export default BrowserTab;

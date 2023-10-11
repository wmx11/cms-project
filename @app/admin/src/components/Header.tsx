import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Header: FC<PropsWithChildren & HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        'flex items-center justify-between flex-wrap gap-4 mb-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Header;

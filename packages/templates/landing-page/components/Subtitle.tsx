import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Subtitle: FC<PropsWithChildren & HTMLAttributes<HTMLTitleElement>> = ({
  children,
  className,
}) => {
  return <h2 className={twMerge('text-xl mb-4', className)}>{children}</h2>;
};

export default Subtitle;

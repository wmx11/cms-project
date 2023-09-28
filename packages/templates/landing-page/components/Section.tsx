import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const Section: FC<PropsWithChildren & HTMLAttributes<HTMLBaseElement>> = ({
  children,
  className,
}) => {
  return <section className={twMerge('py-24', className)}>{children}</section>;
};

export default Section;

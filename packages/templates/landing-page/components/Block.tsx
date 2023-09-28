import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';

const Block: FC<PropsWithChildren & HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};

export default Block;

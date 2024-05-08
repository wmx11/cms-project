import React, { ComponentPropsWithoutRef, FC } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {}

const GridWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(265px,1fr))] items-start gap-8">
      {children}
    </div>
  );
};

export default GridWrapper;

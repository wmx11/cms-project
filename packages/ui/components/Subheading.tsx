import React, { FC, PropsWithChildren } from 'react';

const Subheading: FC<PropsWithChildren> = ({ children }) => {
  return <h2>{children}</h2>;
};

export default Subheading;

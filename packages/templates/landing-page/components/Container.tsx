import React, { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="container mx-auto p-4">{children}</div>;
};

export default Container;

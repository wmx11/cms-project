import React, { FC, PropsWithChildren } from 'react';

const Paragraph: FC<PropsWithChildren> = ({ children }) => {
  return <p>{children}</p>;
};

export default Paragraph;

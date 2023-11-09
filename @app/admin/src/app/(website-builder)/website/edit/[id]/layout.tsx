import React from 'react';
import './builder.scss';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <div className="relative">{children}</div>;
};

export default layout;

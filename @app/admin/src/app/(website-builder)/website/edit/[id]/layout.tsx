import React from 'react';
import './builder.css';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <div className="relative">{children}</div>;
};

export default layout;

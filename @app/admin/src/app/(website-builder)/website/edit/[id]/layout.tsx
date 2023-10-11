import React from 'react';

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

const layout = ({ children, params }: Props) => {
  return <div className="relative">{children}</div>;
};

export default layout;

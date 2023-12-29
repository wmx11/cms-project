import React from 'react';
import '@cms/packages/template-engine/styles/global.scss';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <div className="relative">{children}</div>;
};

export default layout;

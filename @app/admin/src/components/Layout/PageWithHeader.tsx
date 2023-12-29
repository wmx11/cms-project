import React from 'react';
import Header from '../Header';
import GoBackButton from '../GoBackButton';
import Title from '@cms/packages/ui/components/Title';

type Props = {
  title?: string;
  children: React.ReactNode;
};

const PageWithHeader = ({ title, children }: Props) => {
  return (
    <>
      <Header>
        <div className="space-y-4">
          <GoBackButton />
          {title && <Title>{title}</Title>}
        </div>
      </Header>
      <>{children}</>
    </>
  );
};

export default PageWithHeader;

'use client';
import Container from '@cms/ui/components/Container';
import { FC, PropsWithChildren } from 'react';
import AppMenu from './AppMenu';

const AppShell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <div className="grid grid-cols-[200px,1fr,200px] gap-4 min-h-screen [&>div]:p-4">
        <AppMenu />
        <div className="border-r-1 border-l-1 border-zinc-200">{children}</div>
        <div>
          <p>Something helpful could be here</p>
        </div>
      </div>
    </Container>
  );
};

export default AppShell;

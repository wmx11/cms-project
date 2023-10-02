'use client';
import Container from '@cms/ui/components/Container';
import { FC, PropsWithChildren } from 'react';
import AppMenu from './AppMenu';

const AppShell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <div className="grid grid-cols-[220px,1fr] min-h-screen">
        <AppMenu />
        <div className="border-r-1 border-l-1 border-zinc-200 p-4">
          {children}
        </div>
        {/* <div className="p-4">
          <p>Something helpful could be here</p>
        </div> */}
      </div>
    </main>
  );
};

export default AppShell;

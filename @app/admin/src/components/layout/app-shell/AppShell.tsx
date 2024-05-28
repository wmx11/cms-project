import { FC, PropsWithChildren } from 'react';
import AppMenu from './AppMenu';

const AppShell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="max-w-[265px] flex-1 border-r border-zinc-200">
          <AppMenu />
        </div>
        <div className="flex-1 [&>*]:p-4">
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default AppShell;

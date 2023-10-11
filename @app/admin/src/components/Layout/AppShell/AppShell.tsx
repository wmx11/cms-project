import { FC, PropsWithChildren } from 'react';
import AppMenu from './AppMenu';

const AppShell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-[300px,1fr,300px] min-h-screen">
        <AppMenu />
        <div className="border-r-1 border-l-1 border-zinc-200 p-4">
          {children}
        </div>
        <div className="p-4 space-y-4">
          <span className="font-bold">Useful links</span>
          <div className="space-y-4 text-primary  ">
            <p>How to create a website?</p>
            <p>How to write a blog post?</p>
            <p>How to collect testimonials?</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppShell;

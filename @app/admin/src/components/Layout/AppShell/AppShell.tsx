import { FC, PropsWithChildren } from 'react';
import AppMenu from './AppMenu';
import { Button } from '@cms/ui/components/Button';
import Link from 'next/link';
import routes from '@admin/utils/routes';

const AppShell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-1 max-w-[265px] border-r border-zinc-200">
          <AppMenu />
        </div>
        <div className="[&>*]:p-4 flex-1">
          <div className="border-b border-zinc-200 flex justify-between items-center">
            <div>Recents</div>
            <div>
              <Button size="xs" asChild>
                <Link href={routes.website.create}>New site</Link>
              </Button>
            </div>
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AppShell;

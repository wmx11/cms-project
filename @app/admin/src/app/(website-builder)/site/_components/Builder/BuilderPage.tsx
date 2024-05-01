import { BuilderStoreProps } from '@admin/store/useBuilderStore';
import { ScrollArea, ScrollBar } from '@cms/packages/ui/components/ScrollArea';
import { TooltipProvider } from '@cms/ui/components/Tooltip';
import { FC } from 'react';
import ComponentsListDialog from '../ComponentsListDialog';
import BuilderCanvas from './BuilderCanvas';
import BuilderProvider from './BuilderProvider';
import BuilderSidebar from './BuilderSidebar';
import BuilderHeader from './builder-header';

export interface BuilderSidebarProps {
  title: string | null;
  description: string | null;
  icon: string | null;
  image: string | null;
}

interface BuilderPageProps extends BuilderStoreProps, BuilderSidebarProps {}

const BuilderPage: FC<BuilderPageProps> = (props) => {
  return (
    <BuilderProvider {...props}>
      <TooltipProvider delayDuration={300}>
        <div className="overflow-hidden">
          <div className="fixed top-0 z-10 w-full">
            <BuilderHeader />
          </div>

          <div className="grid grid-cols-[1fr,320px]">
            <ScrollArea
              data-builder-canvas-wrapper
              className="max-h-screen w-full"
            >
              <BuilderCanvas />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="fixed bottom-0 right-0 top-[47px] z-10 w-full max-w-[320px] border-l border-zinc-200">
              <ScrollArea className="h-full w-full">
                <BuilderSidebar {...props} />
              </ScrollArea>
            </div>
          </div>

          <ComponentsListDialog />
        </div>
      </TooltipProvider>
    </BuilderProvider>
  );
};

export default BuilderPage;

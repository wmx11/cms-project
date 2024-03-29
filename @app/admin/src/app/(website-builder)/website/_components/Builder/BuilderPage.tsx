import { BuilderStoreProps } from '@admin/store/useBuilderStore';
import { ScrollArea, ScrollBar } from '@cms/packages/ui/components/ScrollArea';
import { FC } from 'react';
import ComponentsListDialog from '../ComponentsListDialog';
import BuilderCanvas from './BuilderCanvas';
import BuilderProvider from './BuilderProvider';
import BuilderSidebar from './BuilderSidebar';
import BuilderHeader from './builder-header';
import { TooltipProvider } from '@cms/ui/components/Tooltip';

interface BuilderPageProps extends BuilderStoreProps {}

const BuilderPage: FC<BuilderPageProps> = (props) => {
  return (
    <BuilderProvider {...props}>
      <TooltipProvider>
        <div className="overflow-hidden">
          <div className="fixed top-0 w-full z-10">
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
            <div className="fixed top-[47px] bottom-0 right-0 max-w-[320px] w-full border-l border-zinc-200 z-10">
              <ScrollArea className="h-full w-full">
                <BuilderSidebar />
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

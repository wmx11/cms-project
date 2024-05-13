import {
  BuilderHeaderStoreProps,
  BuilderSidebarStoreProps,
  BuilderStoreProps,
} from '@admin/store/useBuilderStore';
import { ScrollArea, ScrollBar } from '@cms/packages/ui/components/ScrollArea';
import { TooltipProvider } from '@cms/ui/components/Tooltip';
import { FC } from 'react';
import ComponentsListDialog from './ui/ComponentsListDialog';
import BuilderCanvas from './BuilderCanvas';
import BuilderProvider from './providers/BuilderProvider';
import BuilderSidebar from './BuilderSidebar';
import BuilderHeader from './builder-header';
import BuilderHeaderProvider from './providers/BuilderHeaderProvider';
import BuilderSidebarProvider from './providers/BuilderSidebarProvider';

interface BuilderPageProps
  extends BuilderStoreProps,
    BuilderHeaderStoreProps,
    BuilderSidebarStoreProps {}

const BuilderPage: FC<BuilderPageProps> = (props) => {
  return (
    <BuilderProvider {...props}>
      <TooltipProvider delayDuration={300}>
        <div className="overflow-hidden">
          <div className="fixed top-0 z-10 w-full">
            <BuilderHeaderProvider {...props}>
              <BuilderHeader />
            </BuilderHeaderProvider>
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
                <BuilderSidebarProvider {...props}>
                  <BuilderSidebar />
                </BuilderSidebarProvider>
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

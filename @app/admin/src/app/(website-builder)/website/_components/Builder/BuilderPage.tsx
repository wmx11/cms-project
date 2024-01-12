import { Schema } from '@cms/packages/template-engine/types';
import { Component } from '@prisma/client';
import BuilderProvider from './BuilderProvider';
import BuilderCanvas from './BuilderCanvas';
import BuilderHeader from './BuilderHeader';
import BuilderSidebar from './BuilderSidebar';
import { ScrollArea } from '@cms/packages/ui/components/ScrollArea';
import { FC } from 'react';

interface BuilderPageProps {
  schema: Schema[];
  templateId: string;
  templateComponents: Component[];
}

const BuilderPage: FC<BuilderPageProps> = (props) => {
  return (
    <BuilderProvider {...props}>
      <div className="overflow-hidden">
        <div className="fixed top-0 w-full z-10">
          <BuilderHeader />
        </div>
        <div className="grid grid-cols-[1fr,320px]">
          <ScrollArea className="h-full max-h-screen w-full">
            <BuilderCanvas />
          </ScrollArea>
          <div className="fixed top-[53px] bottom-0 right-0 max-w-[320px] w-full border-l border-zinc-200 z-10">
            <ScrollArea className="h-full w-full">
              <BuilderSidebar />
            </ScrollArea>
          </div>
        </div>
      </div>
    </BuilderProvider>
  );
};

export default BuilderPage;

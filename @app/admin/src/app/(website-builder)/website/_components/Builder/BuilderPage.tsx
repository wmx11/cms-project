import { Schema } from '@cms/template-engine/types';
import { Component } from '@prisma/client';
import BuilderProvider from './BuilderProvider';
import BuilderCanvas from './BuilderCanvas';
import BuilderHeader from './BuilderHeader';
import BuilderSidebar from './BuilderSidebar';

type Props = {
  schema: Schema[];
  templateId: string;
  templateComponents: Component[];
};

const BuilderPage = (props: Props) => {
  return (
    <BuilderProvider {...props}>
      <div className="overflow-hidden">
        <div className="fixed top-0 w-full z-10">
          <BuilderHeader />
        </div>
        <div className="grid grid-cols-[1fr,320px]">
          <div className="max-h-screen overflow-auto">
            <BuilderCanvas />
          </div>
          <div className="fixed top-[49px] bottom-0 right-0 max-w-[320px] overflow-auto border-l-1 border-zinc-20 z-10">
            <BuilderSidebar />
          </div>
        </div>
      </div>
    </BuilderProvider>
  );
};

export default BuilderPage;

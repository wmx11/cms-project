import { Schema } from '@cms/template-engine/types';
import { Component } from '@prisma/client';
import BuilderCanvas from './BuilderCanvas';
import BuilderHeader from './BuilderHeader';
import BuilderSidebar from './BuilderSidebar';
import BuilderProvider from '../../Builder/BuilderProvider';

type Props = {
  schema: Schema[];
  templateId: string;
  templateComponents: Component[];
};

const WebsiteBuilder = (props: Props) => {
  return (
    <BuilderProvider {...props}>
      <div>
        <BuilderHeader />
        <div className="grid">
          <BuilderCanvas />
          {/* <BuilderSidebar /> */}
        </div>
      </div>
    </BuilderProvider>
  );
};

export default WebsiteBuilder;

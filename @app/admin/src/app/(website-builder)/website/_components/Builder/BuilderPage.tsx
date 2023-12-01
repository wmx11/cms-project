import { Schema } from '@cms/template-engine/types';
import { Component } from '@prisma/client';
import BuilderProvider from './BuilderProvider';
import BuilderCanvas from './BuilderCanvas';
import BuilderHeader from './BuilderHeader';

type Props = {
  schema: Schema[];
  templateId: string;
  templateComponents: Component[];
};

const BuilderPage = (props: Props) => {
  return (
    <BuilderProvider {...props}>
      <div>
        <BuilderHeader />
        <div className="grid">
          <BuilderCanvas />
        </div>
      </div>
    </BuilderProvider>
  );
};

export default BuilderPage;

import { Schema } from '@cms/template-engine/types';
import BuilderCanvas from './BuilderCanvas';
import BuilderHeader from './BuilderHeader';
import BuilderSidebar from './BuilderSidebar';
import { Component } from '@prisma/client';

type Props = {
  schema: Schema[];
  templateAlias: string;
  templateComponents: Component[];
};

const WebsiteBuilder = ({
  schema,
  templateAlias,
  templateComponents,
}: Props) => {
  return (
    <div>
      <BuilderHeader />
      <div className="grid grid-cols-[1fr,320px]">
        <BuilderCanvas
          schema={schema}
          templateAlias={templateAlias}
          templateComponents={templateComponents}
        />
        <BuilderSidebar />
      </div>
    </div>
  );
};

export default WebsiteBuilder;

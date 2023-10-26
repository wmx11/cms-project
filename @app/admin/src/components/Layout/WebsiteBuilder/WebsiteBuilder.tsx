import { Schema } from '@cms/template-engine/types';
import BuilderCanvas from './BuilderCanvas';
import BuilderHeader from './BuilderHeader';
import BuilderSidebar from './BuilderSidebar';
import { Component } from '@prisma/client';

type Props = {
  draftSchema: Schema[];
  templateId: string;
  templateComponents: Component[];
};

const WebsiteBuilder = ({
  draftSchema,
  templateId,
  templateComponents,
}: Props) => {
  return (
    <div>
      <BuilderHeader />
      <div className="grid grid-cols-[1fr,320px]">
        <BuilderCanvas
          draftSchema={draftSchema}
          templateId={templateId}
          templateComponents={templateComponents}
        />
        <BuilderSidebar />
      </div>
    </div>
  );
};

export default WebsiteBuilder;

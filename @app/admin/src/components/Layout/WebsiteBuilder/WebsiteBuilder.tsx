import { Schema } from '@cms/template-engine/types';
import BuilderCanvas from './BuilderCanvas';
import BuilderHeader from './BuilderHeader';
import BuilderSidebar from './BuilderSidebar';

type Props = {
  schema?: Schema[];
};

const WebsiteBuilder = ({ schema }: Props) => {
  return (
    <div>
      <BuilderHeader />
      <div className="grid grid-cols-[1fr,320px]">
        <BuilderCanvas schema={schema} />
        <BuilderSidebar />
      </div>
    </div>
  );
};

export default WebsiteBuilder;

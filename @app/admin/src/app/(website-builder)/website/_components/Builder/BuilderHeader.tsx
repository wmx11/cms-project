import { Grid } from '@cms/ui/components/Icons';
import PublishButton from './PublishButton';
import SaveDraftButton from './SaveDraftButton';
import BreakpointControls from './canvas-controls/BreakpointControls';
import { Toggle } from '@cms/packages/ui/components/Toggle';

const BuilderHeader = () => {
  return (
    <>
      <div className="p-2 bg-white border-b border-zinc-200 flex justify-between z-50">
        <div>
          <Toggle>
            <Grid />
          </Toggle>
        </div>
        <div>
          <BreakpointControls />
        </div>
        <div className="space-x-4">
          <SaveDraftButton />
          <PublishButton />
        </div>
      </div>
    </>
  );
};

export default BuilderHeader;

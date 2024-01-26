import PublishButton from './PublishButton';
import { ToggleGridButton } from './ToggleGridButton';
import BreakpointControls from './canvas-controls/BreakpointControls';

const BuilderHeader = () => {
  return (
    <>
      <div className="p-2 bg-background border-b border-zinc-200 flex justify-between z-50">
        <div>
          <ToggleGridButton />
        </div>
        <div>
          <BreakpointControls />
        </div>
        <div className="space-x-4">
          {/* <SaveDraftButton /> */}

          <PublishButton />
        </div>
      </div>
    </>
  );
};

export default BuilderHeader;

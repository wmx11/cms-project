import PublishButton from './PublishButton';
import SaveDraftButton from './SaveDraftButton';
import BreakpointControls from './canvas-controls/BreakpointControls';

const BuilderHeader = () => {
  return (
    <>
      <div className="p-2 bg-white border-b border-zinc-200 flex justify-between z-50">
        <div></div>
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

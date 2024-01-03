import { Redo, Undo } from '@cms/packages/ui/components/Icons';
import { Button } from '@cms/packages/ui/components/Button';
import GoBackButton from '@admin/components/GoBackButton';
import PublishButton from './PublishButton';
import SaveDraftButton from './SaveDraftButton';
import BreakpointControls from './canvas-controls/BreakpointControls';

const BuilderHeader = () => {
  return (
    <>
      <div className="p-2 bg-white border-b border-zinc-200 flex justify-between z-50">
        <div>
          <GoBackButton />
        </div>
        <div className="space-x-4">
          <Button size="sm">
            <Undo />
          </Button>
          <Button size="sm">
            <Redo />
          </Button>
        </div>
        <div className="space-x-4">
          <SaveDraftButton />
          <PublishButton />
        </div>
      </div>
      <div className="grid  grid-cols-[1fr,320px]">
        <div className="p-2 border-b border-zinc-200 flex justify-end items-center bg-white z-10">
          <BreakpointControls />
        </div>
      </div>
    </>
  );
};

export default BuilderHeader;

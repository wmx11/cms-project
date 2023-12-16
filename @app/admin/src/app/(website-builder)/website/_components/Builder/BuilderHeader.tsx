import { Redo, Undo } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/button';
import GoBackButton from '@admin/components/GoBackButton';
import PublishButton from './PublishButton';
import SaveDraftButton from './SaveDraftButton';
import BreakpointControls from './canvas-controls/BreakpointControls';

const BuilderHeader = () => {
  return (
    <>
      <div className="p-2 bg-white border-b-1 border-zinc-200 flex justify-between z-50">
        <div>
          <GoBackButton />
        </div>
        <div className="space-x-4">
          <Button
            color="primary"
            size="sm"
            variant="light"
            startContent={<Undo />}
          ></Button>
          <Button
            color="primary"
            size="sm"
            variant="light"
            startContent={<Redo />}
          ></Button>
        </div>
        <div className="space-x-4">
          <SaveDraftButton />
          <PublishButton />
        </div>
      </div>
      <div className="grid  grid-cols-[1fr,280px]">
        <div className="p-2 border-b-1 border-zinc-200 flex justify-end items-center bg-white z-10">
          <BreakpointControls />
        </div>
      </div>
    </>
  );
};

export default BuilderHeader;

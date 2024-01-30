import BreakpointControls from './_components/BreakpointControls';
import CanvasOptions from './_components/CanvasOptions';
import PublishButton from './_components/PublishButton';
import SaveDraftButton from './_components/SaveDraftButton';
import ThemeSelector from './_components/ThemeSelector';

const BuilderHeader = () => {
  return (
    <>
      <div className="p-2 bg-background border-b border-zinc-200 flex justify-between items-center z-50 h-[47px]">
        <div>
          <ThemeSelector />
        </div>
        <div>
          <BreakpointControls />
        </div>
        <div className="flex gap-2">
          <SaveDraftButton />
          <PublishButton />
          <CanvasOptions />
        </div>
      </div>
    </>
  );
};

export default BuilderHeader;

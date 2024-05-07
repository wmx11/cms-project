import PublishSiteButton from '../ui/buttons/PublishSiteButton';
import BreakpointControls from './_components/BreakpointControls';
import CanvasOptions from './_components/CanvasOptions';
import SaveDraftButton from './_components/SaveDraftButton';
import SiteOptionsMenu from './_components/site-options/SiteOptionsMenu';

const BuilderHeader = () => {
  return (
    <>
      <div className="bg-background z-50 flex h-[47px] items-center justify-between border-b border-zinc-200 p-2">
        <div>
          <SiteOptionsMenu />
        </div>
        <div>
          <BreakpointControls />
        </div>
        <div className="flex gap-2">
          <SaveDraftButton />
          <PublishSiteButton />
          <CanvasOptions />
        </div>
      </div>
    </>
  );
};

export default BuilderHeader;

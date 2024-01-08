'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';
import {
  BREAKPOINT_2XL,
  BREAKPOINT_LG,
  BREAKPOINT_MD,
  BREAKPOINT_SM,
  BREAKPOINT_XL,
  BREAKPOINT_XS,
} from '@cms/packages/template-engine/constants';
import { Button } from '@cms/packages/ui/components/Button';
import { Desktop, Mobile, Reset, Tablet } from '@cms/ui/components/Icons';

const BreakpointControls = () => {
  const { breakpoint, setBreakpoint } = useBuilderProviderState();

  return (
    <div className="flex items-center gap-2">
      <div
        className={`text-xs ${
          breakpoint === BREAKPOINT_XS ? '' : 'text-red-500'
        }`}
      >
        {breakpoint === BREAKPOINT_XS ? '100%' : `${breakpoint}px`}
      </div>
      <div className="space-x-2">
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_2XL)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_2XL, breakpoint)}
        >
          <Desktop className="h-3 w-3 mr-2" />
          2xl
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_XL)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_XL, breakpoint)}
        >
          <Desktop className="h-3 w-3 mr-2" />
          xl
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_LG)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_LG, breakpoint)}
        >
          <Desktop className="h-3 w-3 mr-2" />
          lg
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_MD)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_MD, breakpoint)}
        >
          <Tablet className="h-3 w-3 mr-2" />
          md
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_SM)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_SM, breakpoint)}
        >
          <Mobile className="h-3 w-3 mr-2" />
          sm
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_XS)}
          variant="destructive"
          size="xs"
        >
          <Reset className="h-3 w-3 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default BreakpointControls;

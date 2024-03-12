'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';
import {
  BREAKPOINT_2XL,
  BREAKPOINT_DEFAULT,
  BREAKPOINT_DEFAULT_WIDTH,
  BREAKPOINT_LG,
  BREAKPOINT_MD,
  BREAKPOINT_SM,
  BREAKPOINT_XL,
  BREAKPOINT_XS,
} from '@cms/packages/tiglee-engine/constants';
import { Button } from '@cms/packages/ui/components/Button';
import { Desktop, Mobile, Reset, Tablet } from '@cms/ui/components/Icons';

const BreakpointControls = () => {
  const breakpoint = useBuilderProviderState((state) => state.breakpoint);
  const setBreakpoint = useBuilderProviderState((state) => state.setBreakpoint);

  return (
    <div className="flex items-center gap-2">
      <div
        className={`text-xs ${
          breakpoint === BREAKPOINT_DEFAULT ? '' : 'text-red-500'
        }`}
      >
        {breakpoint === BREAKPOINT_DEFAULT
          ? `${BREAKPOINT_DEFAULT_WIDTH}px`
          : `${breakpoint}px`}
      </div>
      <div className="space-x-2">
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_2XL)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_2XL, breakpoint)}
        >
          <Desktop className="mr-2 h-3 w-3" />
          2xl
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_XL)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_XL, breakpoint)}
        >
          <Desktop className="mr-2 h-3 w-3" />
          xl
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_LG)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_LG, breakpoint)}
        >
          <Desktop className="mr-2 h-3 w-3" />
          lg
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_MD)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_MD, breakpoint)}
        >
          <Tablet className="mr-2 h-3 w-3" />
          md
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_SM)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_SM, breakpoint)}
        >
          <Mobile className="mr-2 h-3 w-3" />
          sm
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_XS)}
          color="secondary"
          size="xs"
          variant={getActiveButtonVariant(BREAKPOINT_XS, breakpoint)}
        >
          <Mobile className="mr-2 h-3 w-3" />
          xs
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_DEFAULT)}
          variant="destructive"
          size="xs"
        >
          <Reset className="mr-2 h-3 w-3" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default BreakpointControls;

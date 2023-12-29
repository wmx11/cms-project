'use client';
import {
  BREAKPOINT_2XL,
  BREAKPOINT_LG,
  BREAKPOINT_MD,
  BREAKPOINT_SM,
  BREAKPOINT_XL,
  BREAKPOINT_XS,
} from '@cms/packages/template-engine/constants';
import { Button } from '@nextui-org/react';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import getActiveButtonVariant from '@admin/utils/getActiveButtonVariant';

const BreakpointControls = () => {
  const { breakpoint, setBreakpoint } = useBuilderProviderState();

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs">Breakpoints:</div>
      <div>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_2XL)}
          color="secondary"
          size="sm"
          variant={getActiveButtonVariant(BREAKPOINT_2XL, breakpoint)}
        >
          2xl
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_XL)}
          color="secondary"
          size="sm"
          variant={getActiveButtonVariant(BREAKPOINT_XL, breakpoint)}
        >
          xl
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_LG)}
          color="secondary"
          size="sm"
          variant={getActiveButtonVariant(BREAKPOINT_LG, breakpoint)}
        >
          lg
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_MD)}
          color="secondary"
          size="sm"
          variant={getActiveButtonVariant(BREAKPOINT_MD, breakpoint)}
        >
          md
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_SM)}
          color="secondary"
          size="sm"
          variant={getActiveButtonVariant(BREAKPOINT_SM, breakpoint)}
        >
          sm
        </Button>
        <Button
          onClick={() => setBreakpoint(BREAKPOINT_XS)}
          color="warning"
          size="sm"
          variant="flat"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default BreakpointControls;

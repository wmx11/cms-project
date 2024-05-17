'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  BREAKPOINT_DEFAULT,
  DATA_LABEL,
} from '@cms/packages/tiglee-engine/constants';
import { Badge } from '@cms/packages/ui/components/Badge';
import RemoveStylesButton from '../../ui/buttons/RemoveStylesButton';
import DynamicComponentControls from '../../ui/DynamicComponentControls';

const Header = () => {
  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );
  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );

  const breakpoint = useBuilderProviderState((state) => state.breakpoint);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between rounded-md border bg-slate-100 p-2">
        <div className="space-x-2">
          <Badge>
            {selectedComponent?.displayName || selectedComponent?.component}
          </Badge>
          {breakpoint !== BREAKPOINT_DEFAULT && <Badge>@{breakpoint}px</Badge>}
        </div>
        <div>
          <RemoveStylesButton />
        </div>
      </div>
      <DynamicComponentControls />
    </div>
  );
};

export default Header;

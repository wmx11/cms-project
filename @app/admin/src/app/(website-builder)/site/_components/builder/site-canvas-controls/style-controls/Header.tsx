'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  BREAKPOINT_DEFAULT,
  DATA_LABEL,
} from '@cms/packages/tiglee-engine/constants';
import React from 'react';
import { Badge } from '@cms/packages/ui/components/Badge';
import RemoveStylesButton from '../../ui/buttons/RemoveStylesButton';

const Header = () => {
  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );
  const breakpoint = useBuilderProviderState((state) => state.breakpoint);

  return (
    <div className="mb-2 flex items-center justify-between rounded-md border bg-slate-100 p-2">
      <div className="space-x-2">
        <Badge>{selectedElement?.getAttribute(DATA_LABEL)}</Badge>
        {breakpoint !== BREAKPOINT_DEFAULT ? (
          <>
            <Badge>@{breakpoint}px</Badge>
          </>
        ) : (
          ''
        )}
      </div>
      <div>
        <RemoveStylesButton />
      </div>
    </div>
  );
};

export default Header;

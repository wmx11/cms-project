'use client';
import DefaultTooltip from '@admin/components/DefaultTooltip';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  DATA_DESCRIPTION,
  DATA_LABEL,
} from '@cms/packages/template-engine/constants';
import { Info } from '@cms/packages/ui/components/Icons';

const ElementInfoButton = () => {
  const { selectedElement } = useBuilderProviderState();

  return (
    <div className="flex text-xs px-2 text-violet-500 border">
      <DefaultTooltip
        content={selectedElement?.getAttribute(DATA_DESCRIPTION) || ''}
      >
        <div className="flex items-center">
          <Info className="h-3 w-3 mr-2" />
          <span>{selectedElement?.getAttribute(DATA_LABEL)}</span>
        </div>
      </DefaultTooltip>
    </div>
  );
};

export default ElementInfoButton;

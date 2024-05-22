'use client';
import DefaultTooltip from '@admin/components/DefaultTooltip';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  DATA_DESCRIPTION,
  DATA_DISPLAY_NAME,
  DATA_LABEL,
} from '@cms/packages/tiglee-engine/constants';
import { ICON_STYLES, Info } from '@cms/packages/ui/components/Icons';

const ElementInfoButton = () => {
  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );

  return (
    <div className="flex px-2 text-xs text-violet-500">
      <DefaultTooltip
        content={selectedElement?.getAttribute(DATA_DESCRIPTION) || ''}
      >
        <div className="flex items-center">
          <Info className={ICON_STYLES} />
          <span className="max-w-[140px] truncate">
            {selectedElement?.getAttribute(DATA_DISPLAY_NAME) ||
              selectedElement?.getAttribute(DATA_LABEL)}
          </span>
        </div>
      </DefaultTooltip>
    </div>
  );
};

export default ElementInfoButton;

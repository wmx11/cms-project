'use client';
import DefaultTooltip from '@admin/components/DefaultTooltip';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import turnIntoComponent from '@cms/tiglee-engine/modules/turnIntoComponent';
import { Button } from '@cms/ui/components/Button';
import { Command } from '@cms/ui/components/Command';
import { ElipsisIcon, ICON_STYLES } from '@cms/ui/components/Icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@cms/ui/components/Popover';
import ComponentsList from '../../ui/ComponentsList';

/**
 * @description - This button displays a popover with a component list. The component list will turn a selected component into a new one.
 */
const TurnIntoButton = () => {
  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );

  return (
    <DefaultTooltip
      content={`Turn ${selectedComponent?.displayName || selectedComponent?.component} into a different component`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="xs">
            <span className="mr-2">Turn into</span>
            <ElipsisIcon className={ICON_STYLES} />
          </Button>
        </PopoverTrigger>
        <PopoverContent asChild>
          <Command>
            <ComponentsList turnIntoComponent={turnIntoComponent} />
          </Command>
        </PopoverContent>
      </Popover>
    </DefaultTooltip>
  );
};

export default TurnIntoButton;

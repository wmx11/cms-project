'use client';
import DefaultTooltip from '@admin/components/DefaultTooltip';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Button } from '@cms/ui/components/Button';
import { Command, CommandInput } from '@cms/ui/components/Command';
import { ElipsisIcon, ICON_STYLES } from '@cms/ui/components/Icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@cms/ui/components/Popover';
import ComponentsList from '../../ui/ComponentsList';

// Turns component into a different component
const TurnIntoButton = () => {
  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );
  const selectedComonentPath = useBuilderProviderState(
    (state) => state.selectedComonentPath
  );
  const schema = useBuilderProviderState((state) => state.schema);
  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );

  // const handleSelect = (key: React.Key, path: string) => {
  //   const newComponent = templateComponents.find((item) => item.id === key);

  //   if (!newComponent) {
  //     return null;
  //   }

  //   const newSchema = turnIntoComponent({ schema, newComponent, path });

  //   if (!newSchema) {
  //     return null;
  //   }

  //   renderTemplate(newSchema);
  // };

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
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Type a command to search..." />
            <ComponentsList />
          </Command>
        </PopoverContent>
      </Popover>
    </DefaultTooltip>
  );
};

export default TurnIntoButton;

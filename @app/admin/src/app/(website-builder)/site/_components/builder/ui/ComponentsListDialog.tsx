'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import addComponent from '@cms/tiglee-engine/modules/addComponent';
import { CommandDialog, CommandInput } from '@cms/ui/components/Command';
import ComponentsList from './ComponentsList';

const ComponentsListDialog = () => {
  const isCommandOpen = useBuilderProviderState((state) => state.isCommandOpen);

  const setIsCommandOpen = useBuilderProviderState(
    (state) => state.setIsCommandOpen
  );

  return (
    <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
      <ComponentsList
        onSelect={() => setIsCommandOpen(false)}
        addComponent={addComponent}
      />
    </CommandDialog>
  );
};

export default ComponentsListDialog;

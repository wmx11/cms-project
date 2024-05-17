'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import addComponent from '@cms/packages/tiglee-engine/modules/addComponent';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@cms/ui/components/Command';
import ComponentsList from './ComponentsList';

const ComponentsListDialog = () => {
  const isCommandOpen = useBuilderProviderState((state) => state.isCommandOpen);

  const setIsCommandOpen = useBuilderProviderState(
    (state) => state.setIsCommandOpen
  );

  return (
    <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
      <CommandInput placeholder="Type a command to search..." />
      <ComponentsList onSelect={() => setIsCommandOpen(false)} />
      {/* <CommandList>
        <CommandEmpty>No components found.</CommandEmpty>
        <CommandGroup heading="Components">
          {componentsToRender().map((item) => (
            <CommandItem
              key={item.id}
              onSelect={() => {
                handleSelect(item.component, selectedComonentPath);
                setIsCommandOpen(false);
              }}
            >
              <div className="cursor-pointer p-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 bg-zinc-200"></div>
                  <div>
                    <div className="font-bold">
                      {item.displayName || item.component}
                    </div>
                    <div className="text-xs">{item.description}</div>
                  </div>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList> */}
    </CommandDialog>
  );
};

export default ComponentsListDialog;

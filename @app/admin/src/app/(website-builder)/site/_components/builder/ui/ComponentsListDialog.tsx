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

const ComponentsListDialog = () => {
  const isCommandOpen = useBuilderProviderState((state) => state.isCommandOpen);

  const components = useBuilderProviderState((state) => state.components);

  const selectedComonentPath = useBuilderProviderState(
    (state) => state.selectedComonentPath
  );

  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );

  const schema = useBuilderProviderState((state) => state.schema);

  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );

  const setIsCommandOpen = useBuilderProviderState(
    (state) => state.setIsCommandOpen
  );

  const handleSelect = (component: string, path: string) => {
    const selectedComponent = components?.find(
      (item) => item?.component === component
    );

    if (!selectedComponent) {
      return;
    }

    try {
      const newSchema = addComponent({
        componentSchema: selectedComponent,
        schema,
        path,
      });

      if (!newSchema) {
        return null;
      }

      renderTemplate(newSchema);
    } catch (error) {
      console.error(error);
    }
  };

  const componentsToRender = () => {
    if (!selectedComponent) {
      return components?.filter((item) => item?.category === 'layout');
    }

    if (
      !components?.find((item) =>
        item?.props.find((prop) => prop.type === 'component')
      )
    ) {
      return [];
    }

    return components;
  };

  return (
    <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
      <CommandInput placeholder="Type a command to search..." />
      <CommandList>
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
                    <div className="font-bold">{item.component}</div>
                    <div className="text-xs">{item.description}</div>
                  </div>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default ComponentsListDialog;

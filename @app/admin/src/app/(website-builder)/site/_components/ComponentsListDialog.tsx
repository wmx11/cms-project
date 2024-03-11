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
import React from 'react';

const ComponentsListDialog = () => {
  const isCommandOpen = useBuilderProviderState((state) => state.isCommandOpen);

  const templateComponents = useBuilderProviderState(
    (state) => state.templateComponents
  );

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

  const handleSelect = (componentId: string, path: string) => {
    const selectedComponent = templateComponents?.find(
      (item) => item?.id === componentId
    );

    if (!selectedComponent || !selectedComponent?.schema) {
      return;
    }

    const componentSchema = JSON.parse(selectedComponent?.schema as string);

    const newSchema = addComponent({
      componentSchema,
      schema,
      path,
    });

    if (!newSchema) {
      return null;
    }

    renderTemplate(newSchema);
  };

  const componentsToRender = () => {
    if (!selectedComponent) {
      return templateComponents?.filter((item) => item?.category === 'layout');
    }

    if (!selectedComponent?.props?.find((item) => item?.type === 'component')) {
      return [];
    }

    return templateComponents;
  };

  return (
    <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
      <CommandInput placeholder="Type a command to search..." />
      <CommandList>
        <CommandEmpty>No components found.</CommandEmpty>
        <CommandGroup heading="Components">
          {componentsToRender()?.map((item) => (
            <CommandItem
              key={item.id}
              onSelect={() => {
                handleSelect(item.id, selectedComonentPath);
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

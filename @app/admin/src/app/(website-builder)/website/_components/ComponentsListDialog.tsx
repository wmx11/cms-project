'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import addComponent from '@cms/template-engine/modules/addComponent';
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
  const {
    isOpen,
    templateComponents,
    selectedComonentPath,
    selectedComponent,
    schema,
    renderTemplate,
    setIsOpen,
  } = useBuilderProviderState();

  const handleSelect = (componentId: string, path: string) => {
    const selectedComponent = templateComponents.find(
      (item) => item.id === componentId
    );

    if (!selectedComponent || !selectedComponent?.schema) {
      return;
    }

    const componentSchema = JSON.parse(selectedComponent?.schema as string);

    const updatedSchema = addComponent({
      componentSchema,
      schema,
      path,
    });

    if (!updatedSchema) {
      return null;
    }

    renderTemplate(updatedSchema);
  };

  const componentsToRender = () => {
    if (!selectedComponent) {
      return templateComponents.filter((item) => item.category === 'layout');
    }

    if (!selectedComponent.props.find((item) => item.type === 'component')) {
      return [];
    }

    return templateComponents;
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Type a command to search..." />
      <CommandList>
        <CommandEmpty>No components found.</CommandEmpty>
        <CommandGroup heading="Components">
          {componentsToRender().map((item) => (
            <CommandItem
              key={item.id}
              onSelect={() => {
                handleSelect(item.id, selectedComonentPath);
                setIsOpen(false);
              }}
            >
              <div className="p-2 cursor-pointer">
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

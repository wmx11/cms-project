'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import addComponent from '@cms/tiglee-engine/modules/addComponent';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@cms/ui/components/Command';
import React, { FC } from 'react';

interface Props {
  onSelect?: () => void;
}

const ComponentsList: FC<Props> = ({ onSelect }) => {
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

  const handleSelect = (component: string, path: string) => {
    const _selectedComponent = components?.find(
      (item) => item?.component === component
    );

    if (!_selectedComponent) {
      return;
    }

    try {
      const newSchema = addComponent({
        componentSchema: _selectedComponent,
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
    <>
      <CommandList>
        <CommandEmpty>No components found.</CommandEmpty>
        <CommandGroup heading="Components">
          {componentsToRender().map((item) => (
            <CommandItem
              key={item.id}
              onSelect={() => {
                handleSelect(item.component, selectedComonentPath);
                onSelect && onSelect();
              }}
            >
              <div className="cursor-pointer p-2">
                <div className="flex items-center gap-2">
                  <div className="h-[45px] w-[45px] rounded-md border bg-white"></div>
                  <div className="flex-1">
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
      </CommandList>
    </>
  );
};

export default ComponentsList;

'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { AddComponentProps } from '@cms/tiglee-engine/modules/addComponent';
import { TurnIntoComponentProps } from '@cms/tiglee-engine/modules/turnIntoComponent';
import { Schema } from '@cms/tiglee-engine/types';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@cms/ui/components/Command';
import { ScrollArea } from '@cms/ui/components/ScrollArea';
import { FC } from 'react';

type PropsWithAddComponent = {
  addComponent?: (props: AddComponentProps) => Schema[] | null;
  turnIntoComponent?: never;
};

type PropsWithTurnIntoComponent = {
  addComponent?: never;
  turnIntoComponent?: (props: TurnIntoComponentProps) => Schema[] | null;
};

type Props = {
  onSelect?: () => void;
} & (PropsWithAddComponent | PropsWithTurnIntoComponent);

const ComponentsList: FC<Props> = ({
  onSelect,
  addComponent,
  turnIntoComponent,
}) => {
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

    const data = {
      componentSchema: _selectedComponent,
      schema,
      path,
    };

    try {
      let newSchema;

      if (addComponent) {
        newSchema = addComponent(data);
      }

      if (turnIntoComponent) {
        newSchema = turnIntoComponent(data);
      }

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
      <CommandInput placeholder="Find component..." />
      <CommandList>
        <ScrollArea className="h-72">
          <CommandEmpty>Co components by this name found.</CommandEmpty>
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
        </ScrollArea>
      </CommandList>
    </>
  );
};

export default ComponentsList;

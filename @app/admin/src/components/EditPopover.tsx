'use client';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { RefObject } from 'react';
import useBuilderProviderState from '../hooks/useBuilderProviderState';

type Props = {
  triggerRef: RefObject<HTMLElement>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setTriggerRef: (ref: RefObject<HTMLElement>) => void;
};

const EditPopover = ({
  triggerRef,
  isOpen,
  setIsOpen,
  setTriggerRef,
}: Props) => {
  const { schema, setSchema } = useBuilderProviderState();

  const componentSchema = traverseComponentsTree({
    schema,
    path: triggerRef.current?.id as string,
  });

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      triggerRef={triggerRef}
      placement="bottom-start"
      showArrow
      backdrop="blur"
      onClose={() => {
        console.log('Schema saved');
        setSchema(schema);
        setTriggerRef({ current: null });
      }}
    >
      <PopoverTrigger>
        <></>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <p className="font-bold">
            Edit Element ({componentSchema?.component})
          </p>
          <div className="mt-2 flex flex-col gap-2 w-full">
            {componentSchema &&
              componentSchema.props.map((item, index) => {
                if (item.type === 'component') {
                  return null;
                }

                return (
                  <Input
                    key={`${item.name}_${index}`}
                    label={item.displayName}
                    description={item.description}
                    size="sm"
                    variant="bordered"
                    defaultValue={(item?.value as string) || ''}
                    onChange={(e) => {
                      if (!triggerRef.current) {
                        return;
                      }

                      if (item.name === 'children' && item.type === 'string') {
                        triggerRef.current.innerText = e.currentTarget.value;
                        item.value = e.currentTarget.value;
                      }

                      if (item.name !== 'children' && item.type === 'string') {
                        item.value = e.currentTarget.value;
                      }
                    }}
                  />
                );
              })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditPopover;

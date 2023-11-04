'use client';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import useBuilderProviderState from '../hooks/useBuilderProviderState';
import {
  ItemsAlignBottom,
  ItemsAlignCenterHorizontal,
  ItemsAlignCenterVertical,
  ItemsAlignLeft,
  ItemsAlignRight,
  ItemsAlignTop,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
} from '@cms/ui/components/Icons';

const EditPopover = () => {
  const {
    schema,
    renderTemplate,
    isOpen,
    setIsOpen,
    setTriggerRef,
    triggerRef,
  } = useBuilderProviderState();

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
      backdrop="blur"
      onClose={() => {
        console.log('Schema saved');
        setTriggerRef({ current: null });
        renderTemplate(schema);
      }}
    >
      <PopoverTrigger>
        <></>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <div>
            <p className="font-bold">{componentSchema?.component} options</p>
            <p className="text-zinc-500 text-xs">
              Use these options to edit and change the element to your liking
            </p>
          </div>
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

            <div>
              <div>Text color</div>
              <div>
                <Input
                  size="sm"
                  radius="none"
                  variant="flat"
                  description="Choose a text color"
                  type="color"
                />
              </div>
            </div>

            <div>
              <div>Background color</div>
              <div>
                <Input
                  size="sm"
                  radius="none"
                  variant="flat"
                  description="Choose a background color"
                  type="color"
                />
              </div>
            </div>

            <div>
              <div>Text alignment</div>
              <div className="flex justify-between w-full">
                <Button
                  variant="light"
                  color="secondary"
                  radius="none"
                  startContent={<TextAlignLeft />}
                >
                  Left
                </Button>
                <Button
                  variant="light"
                  color="secondary"
                  radius="none"
                  startContent={<TextAlignCenter />}
                >
                  Center
                </Button>
                <Button
                  variant="light"
                  color="secondary"
                  radius="none"
                  startContent={<TextAlignRight />}
                >
                  Right
                </Button>
              </div>
            </div>

            <div>
              <div>Horizontal alignment</div>
              <div className="flex justify-between w-full">
                <Button
                  variant="light"
                  color="secondary"
                  radius="none"
                  startContent={<ItemsAlignLeft />}
                >
                  Left
                </Button>
                <Button
                  variant="light"
                  color="secondary"
                  radius="none"
                  startContent={<ItemsAlignCenterHorizontal />}
                >
                  Center
                </Button>
                <Button
                  variant="light"
                  color="secondary"
                  radius="none"
                  startContent={<ItemsAlignRight />}
                >
                  Right
                </Button>
              </div>
            </div>

            <div>
              <div>Vertical alignment</div>
              <div className="flex justify-between w-full">
                <Button
                  variant="light"
                  color="secondary"
                  radius="none"
                  startContent={<ItemsAlignTop />}
                >
                  Top
                </Button>
                <Button
                  variant="light"
                  color="secondary"
                  radius="none"
                  startContent={<ItemsAlignCenterVertical />}
                >
                  Middle
                </Button>
                <Button
                  variant="light"
                  color="secondary"
                  radius="none"
                  startContent={<ItemsAlignBottom />}
                >
                  Bottom
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditPopover;

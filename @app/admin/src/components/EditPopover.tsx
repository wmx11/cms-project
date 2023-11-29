'use client';
import { DATA_TARGET_ID } from '@cms/template-engine/constants';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import useBuilderProviderState from '../hooks/useBuilderProviderState';
import ElementsGapsControls from './Builder/Controls/LayoutControls/ElementsGapsControls';
import FlexColumnsControls from './Builder/Controls/LayoutControls/FlexColumnsControls';
import HorizontalAlignmentControls from './Builder/Controls/LayoutControls/HorizontalAlignmentControls';
import LayoutTypeControls from './Builder/Controls/LayoutControls/LayoutTypeControls';
import TextAlignmentControls from './Builder/Controls/LayoutControls/TextAlignmentControls';
import VerticalAlignmentControls from './Builder/Controls/LayoutControls/VerticalAlignmentControls';
import FontSizeControls from './Builder/Controls/LayoutControls/FontSizeControls';

const EditPopover = () => {
  const {
    schema,
    renderTemplate,
    isOpen,
    setIsOpen,
    setTriggerRef,
    triggerRef,
  } = useBuilderProviderState();

  const path =
    triggerRef.current?.getAttribute(DATA_TARGET_ID) ||
    triggerRef.current?.id ||
    '';

  const component = traverseComponentsTree({
    schema,
    path,
  });

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      triggerRef={triggerRef}
      placement="bottom-start"
      backdrop="blur"
      onClose={() => {
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
            <p className="font-bold">{component?.component} options</p>
            <p className="text-zinc-500 text-xs">
              Use these options to edit and change the element to your liking
            </p>
          </div>
          <div className="mt-2 flex flex-col gap-2 w-full">
            {component &&
              component.props.map((item, index) => {
                if (item.type === 'component') {
                  return null;
                }

                return (
                  <Textarea
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

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="font-semibold">Text</div>
                <div className="flex justify-between w-full">
                  <TextAlignmentControls path={path} />
                </div>

                <FontSizeControls path={path} />
                <div>Font spacing</div>
                <div>Text color</div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold">Extra stuff</div>
                <div>
                  <div>Relative, absolute, sticky, fixed</div>
                  <div>Top, bottom, left, right</div>
                  <div>max width</div>
                  <div>min width</div>
                  <div>max height</div>
                  <div>min height</div>
                  <div>margin</div>
                  <div>padding</div>
                  <div>border</div>
                  <div>background</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold">Layout type</div>
                <div className="flex justify-between w-full">
                  <LayoutTypeControls path={path} />
                </div>
              </div>

              {component?.componentVariants?.layoutType?.includes('flex') && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between w-full gap-4">
                      <FlexColumnsControls path={path} />
                      <ElementsGapsControls path={path} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold">Horizontal alignment</div>
                    <div className="flex justify-between w-full">
                      <HorizontalAlignmentControls path={path} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold">Vertical alignment</div>
                    <div className="flex justify-between w-full">
                      <VerticalAlignmentControls path={path} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditPopover;

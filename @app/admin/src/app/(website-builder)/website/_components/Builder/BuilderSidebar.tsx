'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Divider } from '@nextui-org/react';
import ElementsGapsControls from './canvas-controls/element-controls/ElementsGapsControls';
import FlexColumnsControls from './canvas-controls/element-controls/FlexColumnsControls';
import FontSizeControls from './canvas-controls/element-controls/FontSizeControls';
import HeightAndWidthControls from './canvas-controls/element-controls/HeightAndWidthControls';
import HorizontalAlignmentControls from './canvas-controls/element-controls/HorizontalAlignmentControls';
import LayoutTypeControls from './canvas-controls/element-controls/LayoutTypeControls';
import MarginAndPaddingControls from './canvas-controls/element-controls/MarginAndPaddingControls';
import PositionControls from './canvas-controls/element-controls/PositionControls';
import PositionedElementControls from './canvas-controls/element-controls/PositionedElementControls';
import TextAlignmentControls from './canvas-controls/element-controls/TextAlignmentControls';
import VerticalAlignmentControls from './canvas-controls/element-controls/VerticalAlignmentControls';

const BuilderSidebar = () => {
  const {
    styles,
    schema,
    isOpen,
    triggerRef,
    selectedComponent: component,
    setIsOpen,
    setTriggerRef,
    renderTemplate,
  } = useBuilderProviderState();

  return (
    <div>
      <div>
        <code>
          {/* <pre>{JSON.stringify(styles, null, 2)}</pre> */}
        </code>
      </div>
      <div className="bg-white p-4">
        <div className="space-y-4 text-sm">
          <div className="space-y-4">
            <div className="font-semibold">Text</div>
            <div className="flex justify-between">
              <TextAlignmentControls />
            </div>
            <FontSizeControls />
            <Divider />
            <PositionControls />
            <Divider />
            <PositionedElementControls />
            <Divider />
            <HeightAndWidthControls />
            <Divider />
            <MarginAndPaddingControls />
            <Divider />

            <div>Font spacing</div>
            <div>Text color</div>
          </div>
          {/* 
        <div className="space-y-2">
          <Divider />
          <div className="font-semibold">Extra stuff</div>
          <div>
            <div>padding</div>
            <div>border</div>
            <div>background</div>
          </div>
        </div> */}

          <div className="space-y-4">
            <Divider />
            <div className="font-semibold">Layout type</div>
            <div className="flex flex-wrap justify-between [&>*]:max-w-[calc(50%-16px)] [&>*]:w-full gap-4 w-full">
              <LayoutTypeControls />
            </div>
          </div>

          {!component?.componentVariants?.layoutType?.includes('flex') && (
            <>
              <div className="space-y-4">
                <Divider />
                <div className="flex justify-between w-full [&>*]:max-w-[calc(50%-16px)] [&>*]:w-full gap-4">
                  <FlexColumnsControls />
                  <ElementsGapsControls />
                </div>
              </div>

              <div className="space-y-4">
                <Divider />
                <div className="font-semibold">Horizontal alignment</div>
                <div className="flex flex-wrap justify-between w-full [&>*]:max-w-[calc(50%-16px)] [&>*]:w-full gap-4">
                  <HorizontalAlignmentControls />
                </div>
              </div>

              <div className="space-y-4">
                <Divider />
                <div className="font-semibold">Vertical alignment</div>
                <div className="flex flex-wrap justify-between w-full [&>*]:max-w-[calc(50%-16px)] [&>*]:w-full gap-4">
                  <VerticalAlignmentControls />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderSidebar;

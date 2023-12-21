import { Accordion, AccordionItem } from '@nextui-org/react';
import ControlsWrapper from './ControlsWrapper';
import ElementsGapsControls from './element-controls/ElementsGapsControls';
import FlexColumnsControls from './element-controls/FlexColumnsControls';
import FontSizeControls from './element-controls/FontSizeControls';
import HeightAndWidthControls from './element-controls/HeightAndWidthControls';
import HorizontalAlignmentControls from './element-controls/HorizontalAlignmentControls';
import LayoutTypeControls from './element-controls/LayoutTypeControls';
import MarginAndPaddingControls from './element-controls/MarginAndPaddingControls';
import PositionControls from './element-controls/PositionControls';
import PositionedElementControls from './element-controls/PositionedElementControls';
import TextAlignmentControls from './element-controls/TextAlignmentControls';
import VerticalAlignmentControls from './element-controls/VerticalAlignmentControls';

const StyleControls = () => {
  const controls = [
    {
      key: 'text',
      title: 'Text Controls',
      component: (
        <>
          <TextAlignmentControls />
          <FontSizeControls />
        </>
      ),
    },
    {
      key: 'position',
      title: 'Position Controls',
      component: (
        <>
          <PositionControls />
        </>
      ),
    },
    {
      key: 'positioned-controls',
      title: 'Positioned Element Controls',
      component: (
        <>
          <PositionedElementControls />
        </>
      ),
    },
    {
      key: 'height-width',
      title: 'Height & Width',
      component: (
        <>
          <HeightAndWidthControls />
        </>
      ),
    },
    {
      key: 'margin-padding',
      title: 'Margin & Padding',
      component: (
        <>
          <MarginAndPaddingControls />
        </>
      ),
    },
    {
      key: 'layout-controls',
      title: 'Layout Controls',
      component: (
        <>
          <LayoutTypeControls />
        </>
      ),
    },
    {
      key: 'columns-gaps',
      title: 'Columns & Gaps',
      component: (
        <ControlsWrapper>
          <FlexColumnsControls />
          <ElementsGapsControls />
        </ControlsWrapper>
      ),
    },
    {
      key: 'horizontal-alignment',
      title: 'Horizontal Alignment',
      component: (
        <>
          <HorizontalAlignmentControls />
        </>
      ),
    },
    {
      key: 'vertical-alignment',
      title: 'Vertical Alignment',
      component: (
        <>
          <VerticalAlignmentControls />
        </>
      ),
    },
  ];

  return (
    <Accordion
      isCompact
      selectionMode="multiple"
      defaultExpandedKeys={controls.map((item) => item.key)}
    >
      {controls.map((data) => (
        <AccordionItem key={data.key} title={data.title}>
          <>{data.component}</>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default StyleControls;

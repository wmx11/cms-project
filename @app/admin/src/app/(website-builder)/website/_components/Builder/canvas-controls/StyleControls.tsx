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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@cms/packages/ui/components/Accordion';

const StyleControls = () => {
  const controls = [
    {
      key: 'text',
      title: 'Text Controls',
      description: 'Text alignment and sizing',
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
      description: 'What position type the element uses',
      component: (
        <>
          <PositionControls />
        </>
      ),
    },
    {
      key: 'positioned-controls',
      title: 'Positioned Element Controls',
      description: 'How the element is positioned in the X and Y axis.',
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
      description: 'What is the selected element layout type',
      component: (
        <>
          <LayoutTypeControls />
        </>
      ),
    },
    {
      key: 'columns-gaps',
      title: 'Columns & Gaps',
      description: 'How many columns & gap spacing the element has',
      component: (
        <ControlsWrapper>
          <FlexColumnsControls />
          <ElementsGapsControls />
        </ControlsWrapper>
      ),
    },
    {
      key: 'horizontal-alignment',
      title: 'Horizontal Alignment (X axis)',
      description: 'How the items inside the element are aligned on the X axis',
      component: (
        <>
          <HorizontalAlignmentControls />
        </>
      ),
    },
    {
      key: 'vertical-alignment',
      title: 'Vertical Alignment (Y axis)',
      description: 'How the items inside the element are aligned on the Y axis',
      component: (
        <>
          <VerticalAlignmentControls />
        </>
      ),
    },
  ];

  return (
    <Accordion type="multiple" defaultValue={controls.map((item) => item.key)}>
      {controls.map((data) => (
        <AccordionItem value={data.key} key={data.key}>
          <AccordionTrigger>
            <div className="text-left">
              <div className="font-bold text-sm">{data.title}</div>
              <span className="text-xs">{data?.description}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="mt-2">{data.component}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default StyleControls;

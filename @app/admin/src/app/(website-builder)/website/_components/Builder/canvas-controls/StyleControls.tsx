import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
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
import { Badge } from '@cms/packages/ui/components/Badge';
import { BREAKPOINT_XS, DATA_LABEL } from '@cms/template-engine/constants';

const StyleControls = () => {
  const { selectedElement, selectedComponent, breakpoint } =
    useBuilderProviderState();

  const controls = [
    {
      key: 'text',
      title: 'Text',
      description: 'Text alignemnt, sizing, colors, and typography.',
      component: (
        <div className="space-y-2">
          <TextAlignmentControls />
          <FontSizeControls />
          <div>Color</div>
        </div>
      ),
    },
    {
      key: 'position',
      title: 'Position',
      description: 'What position type the element uses',
      component: (
        <>
          <PositionControls />
        </>
      ),
    },
    {
      key: 'positioned-controls',
      title: 'Position Coordinates',
      description: 'How the element is positioned in the X and Y axis.',
      component: (
        <>
          <PositionedElementControls />
        </>
      ),
    },
    {
      key: 'layout-controls',
      title: 'Layout',
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

    {
      key: 'overflow',
      title: 'Overflow',
      description: 'Overflow and stacking controls of the element.',
      component: (
        <>
          <div>Z index</div>
          <div>Oveflow</div>
        </>
      ),
    },
    {
      key: 'height-width',
      title: 'Height & Width',
      description: 'Height and width controls of the element.',
      component: (
        <>
          <HeightAndWidthControls />
        </>
      ),
    },
    {
      key: 'margin-padding',
      title: 'Margin & Padding',
      description: 'Maring and padding controls of the element.',
      component: (
        <>
          <MarginAndPaddingControls />
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="bg-zinc-100/80 p-2 rounded-md border mb-2">
        <div className="space-x-2">
          <Badge>{selectedElement?.getAttribute(DATA_LABEL)}</Badge>
          {breakpoint !== BREAKPOINT_XS ? (
            <>
              <Badge>@{breakpoint}px</Badge>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="mb-2">
        {selectedComponent?.props
          ?.filter((item) => item.type === 'string')
          .map((item) => (
            <div>{item?.value || ''}</div>
          ))}
      </div>
      <Accordion
        type="multiple"
        defaultValue={controls.map((item) => item.key)}
      >
        {controls.map((data) => (
          <AccordionItem value={data.key} key={data.key}>
            <AccordionTrigger className="bg-zinc-100/80 p-2">
              <div className="text-left">
                <div className="font-bold text-sm">{data.title}</div>
                <span className="text-xs">{data?.description}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-2">
              {data.component}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default StyleControls;

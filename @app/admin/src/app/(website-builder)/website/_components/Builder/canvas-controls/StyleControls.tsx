'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@cms/packages/ui/components/Accordion';
import { Badge } from '@cms/packages/ui/components/Badge';
import { BREAKPOINT_DEFAULT, DATA_LABEL } from '@cms/template-engine/constants';
import ControlsWrapper from './ControlsWrapper';
import ElementsGapsControls from './element-controls/ElementsGapsControls';
import FlexColumnsControls from './element-controls/FlexColumnsControls';
import FontSizeControls from './element-controls/FontSizeControls';
import HeightAndWidthControls from './element-controls/HeightAndWidthControls';
import HorizontalAlignmentControls from './element-controls/HorizontalAlignmentControls';
import LayoutTypeControls from './element-controls/LayoutTypeControls';
import MarginAndPaddingControls from './element-controls/MarginAndPaddingControls';
import OverflowControls from './element-controls/OverflowControls';
import PositionControls from './element-controls/PositionControls';
import PositionedElementControls from './element-controls/PositionedElementControls';
import ShadowControls from './element-controls/ShadowControls';
import TextAlignmentControls from './element-controls/TextAlignmentControls';
import VerticalAlignmentControls from './element-controls/VerticalAlignmentControls';
import ZIndexControls from './element-controls/ZIndexControls';
import dynamic from 'next/dynamic';
import OpacityControls from './element-controls/OpacityControls';
import BorderControls from './element-controls/BorderControls';
import { Card, CardContent, CardHeader } from '@cms/ui/components/Card';

const DynamicShadowControls = dynamic(
  () => import('./element-controls/ShadowControls'),
  {
    loading: () => <p>It's loading</p>,
  }
);

const DynamicBackgroundColorControls = dynamic(
  () => import('./element-controls/ColorControls/BackgroundColorControls'),
  {
    loading: () => <p>It's loading</p>,
  }
);

const DynamicTextColorControls = dynamic(
  () => import('./element-controls/ColorControls/TextColorControls'),
  {
    loading: () => <p>It's loading</p>,
  }
);

const controls = [
  {
    key: 'text',
    title: 'Text',
    description: 'Text alignemnt, sizing, colors, and typography.',
    component: (
      <div className="space-y-2">
        <TextAlignmentControls />
        <FontSizeControls />
        <DynamicTextColorControls />
        <ShadowControls label="Text shadow" type="text-shadow" />
      </div>
    ),
  },
  {
    key: 'effects',
    title: 'Effects',
    description: 'Text & background colors, shadows, borders, etc.',
    component: (
      <div className="space-y-2">
        <OpacityControls />
        <BorderControls />
        <DynamicBackgroundColorControls />
        <DynamicShadowControls label="Box shadow" type="box-shadow" />
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
      <div className="space-y-4">
        <ZIndexControls />
        <OverflowControls />
      </div>
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

const StyleControls = () => {
  const { selectedComponent, selectedElement, breakpoint } =
    useBuilderProviderState();

  if (!selectedComponent) {
    return (
      <Card className="text-center mb-4">
        <CardHeader className="p-4">
          <p className="font-bold">No Selection</p>
        </CardHeader>
        <CardContent className="p-4">
          <p>Select an element on the canvas to activate this panel</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="bg-slate-100 p-2 rounded-md border mb-2">
        <div className="space-x-2">
          <Badge>{selectedElement?.getAttribute(DATA_LABEL)}</Badge>
          {breakpoint !== BREAKPOINT_DEFAULT ? (
            <>
              <Badge>@{breakpoint}px</Badge>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="mb-2">
        <Accordion
          type="multiple"
          defaultValue={controls.map((item) => item.key)}
        >
          {controls.map((data) => (
            <AccordionItem value={data.key} key={data.key}>
              <AccordionTrigger className="bg-slate-100 px-2">
                <div className="text-left">
                  <div className="font-bold text-xs">{data.title}</div>
                  <span className="text-xs text-slate-500">
                    {data?.description}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-2 bg-slate-100/50">
                {data.component}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default StyleControls;

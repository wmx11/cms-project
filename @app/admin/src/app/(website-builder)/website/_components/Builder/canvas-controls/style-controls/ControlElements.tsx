import dynamic from 'next/dynamic';
import TextAlignmentControls from '../element-controls/TextAlignmentControls';
import FontSizeControls from '../element-controls/FontSizeControls';
import ShadowControls from '../element-controls/ShadowControls';
import ControlsWrapper from '../ControlsWrapper';
import BlurControls from '../element-controls/BlurControls';
import OpacityControls from '../element-controls/OpacityControls';
import BorderControls from '../element-controls/BorderControls';
import PositionControls from '../element-controls/PositionControls';
import PositionedElementControls from '../element-controls/PositionedElementControls';
import LayoutTypeControls from '../element-controls/LayoutTypeControls';
import FlexColumnsControls from '../element-controls/FlexColumnsControls';
import ElementsGapsControls from '../element-controls/ElementsGapsControls';
import HorizontalAlignmentControls from '../element-controls/HorizontalAlignmentControls';
import VerticalAlignmentControls from '../element-controls/VerticalAlignmentControls';
import ZIndexControls from '../element-controls/ZIndexControls';
import OverflowControls from '../element-controls/OverflowControls';
import HeightAndWidthControls from '../element-controls/HeightAndWidthControls';
import MarginAndPaddingControls from '../element-controls/MarginAndPaddingControls';

const DynamicShadowControls = dynamic(
  () => import('../element-controls/ShadowControls'),
  {
    loading: () => <p>It's loading</p>,
  }
);

const DynamicBackgroundColorControls = dynamic(
  () => import('../element-controls/color-controls/BackgroundColorControls'),
  {
    loading: () => <p>It's loading</p>,
  }
);

const DynamicTextColorControls = dynamic(
  () => import('../element-controls/color-controls/TextColorControls'),
  {
    loading: () => <p>It's loading</p>,
  }
);

export default [
  {
    key: 'text',
    title: 'Text & Typography',
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
        <ControlsWrapper>
          <BlurControls />
          <OpacityControls />
        </ControlsWrapper>
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
    title: 'Overflow & Stacking',
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

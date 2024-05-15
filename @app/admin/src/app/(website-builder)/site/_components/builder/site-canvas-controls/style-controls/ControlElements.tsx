import dynamic from 'next/dynamic';
import TextAlignmentControls from '../element-controls/TextAlignmentControls';
import FontSizeControls from '../element-controls/FontSizeControls';
import ShadowControls from '../element-controls/ShadowControls';
import ControlsWrapper from '../../ui/ControlsWrapper';
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
import ImageControls from '../element-controls/ImageControls';
import Loading from './Loading';
import React from 'react';
import { SchemaCategory } from '@cms/tiglee-engine/types';

interface Controls {
  key: string;
  title: string;
  category: SchemaCategory;
  description: string;
  component: React.JSX.Element;
}

const DynamicShadowControls = dynamic(
  () => import('../element-controls/ShadowControls'),
  {
    loading: () => <Loading />,
  }
);

const DynamicBackgroundColorControls = dynamic(
  () => import('../element-controls/color-controls/BackgroundColorControls'),
  {
    loading: () => <Loading />,
  }
);

const DynamicTextColorControls = dynamic(
  () => import('../element-controls/color-controls/TextColorControls'),
  {
    loading: () => <Loading />,
  }
);

const imageControls: Controls = {
  key: 'image',
  category: 'image',
  title: 'Image & Video',
  description: 'Image and video controls',
  component: (
    <div className="space-y-2">
      <ImageControls />
    </div>
  ),
};

const textControls: Controls = {
  key: 'text',
  category: 'text',
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
};

const effectsControls: Controls = {
  key: 'effects',
  category: 'custom',
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
};

const positionControls: Controls = {
  key: 'position',
  category: 'layout',
  title: 'Position',
  description: 'What position type the element uses',
  component: (
    <>
      <PositionControls />
    </>
  ),
};

const positionedControls: Controls = {
  key: 'positioned-controls',
  category: 'layout',
  title: 'Position Coordinates',
  description: 'How the element is positioned in the X and Y axis.',
  component: (
    <>
      <PositionedElementControls />
    </>
  ),
};

const layoutControls: Controls = {
  key: 'layout-controls',
  category: 'layout',
  title: 'Layout',
  description: 'What is the selected element layout type',
  component: (
    <>
      <LayoutTypeControls />
    </>
  ),
};

const columnControls: Controls = {
  key: 'columns-gaps',
  category: 'layout',
  title: 'Columns & Gaps',
  description: 'How many columns & gap spacing the element has',
  component: (
    <ControlsWrapper>
      <FlexColumnsControls />
      <ElementsGapsControls />
    </ControlsWrapper>
  ),
};

const horizontalAlignmentControls: Controls = {
  key: 'horizontal-alignment',
  category: 'layout',
  title: 'Horizontal Alignment (X axis)',
  description: 'How the items inside the element are aligned on the X axis',
  component: (
    <>
      <HorizontalAlignmentControls />
    </>
  ),
};

const verticalAlignmentControls: Controls = {
  key: 'vertical-alignment',
  category: 'layout',
  title: 'Vertical Alignment (Y axis)',
  description: 'How the items inside the element are aligned on the Y axis',
  component: (
    <>
      <VerticalAlignmentControls />
    </>
  ),
};

const stackingControls: Controls = {
  key: 'overflow',
  category: 'layout',
  title: 'Overflow & Stacking',
  description: 'Overflow and stacking controls of the element.',
  component: (
    <div className="space-y-2">
      <ZIndexControls />
      <OverflowControls />
    </div>
  ),
};

const heightAndWidthControls: Controls = {
  key: 'height-width',
  category: 'layout',
  title: 'Height & Width',
  description: 'Height and width controls of the element.',
  component: (
    <>
      <HeightAndWidthControls />
    </>
  ),
};

const marginAndPaddingControls: Controls = {
  key: 'margin-padding',
  category: 'layout',
  title: 'Margin & Padding',
  description: 'Maring and padding controls of the element.',
  component: (
    <>
      <MarginAndPaddingControls />
    </>
  ),
};

const createControls = (category?: SchemaCategory) => {
  const controls = [
    textControls,
    effectsControls,
    positionControls,
    positionedControls,
    layoutControls,
    columnControls,
    horizontalAlignmentControls,
    verticalAlignmentControls,
    stackingControls,
    heightAndWidthControls,
    marginAndPaddingControls,
  ];

  if (category && category === 'image') {
    controls.unshift(imageControls);
  }

  return controls;
};

export default createControls;

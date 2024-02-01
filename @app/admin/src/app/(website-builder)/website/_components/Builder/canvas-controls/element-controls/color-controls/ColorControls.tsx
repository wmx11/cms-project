'use client';
import useStyles from '@admin/hooks/useStyles';
import { ColorPickerPipette } from '@cms/ui/components/Icons';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@cms/ui/components/Tabs';
import { FC } from 'react';
import { useColorPicker } from 'react-best-gradient-color-picker';
import ControlsPopover from '../../ControlsPopover';
import BackgroundImageController from './BackgroundImageController';
import ColorPicker from './ColorPicker';
import { ColorControlsProps } from '../types';
import Input from '../../../ui/Input';

export const initialBackgroundState = {
  attachment: null,
  color: null,
  image: null,
  position: null,
  repeat: null,
  size: null,
};

const ColorControls: FC<ColorControlsProps> = (props) => {
  const { getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles(props.type);

  const getCurrentColor = () => {
    if (!activeStyles) {
      return '';
    }

    const entry = activeStyles[props.type];

    if (!entry) {
      return '';
    }

    if (
      props.type === 'box-shadow' ||
      props.type === 'text-shadow' ||
      props.type === 'border'
    ) {
      return entry?.color ?? '';
    }

    if (props.type === 'background') {
      return entry?.image ? entry?.image : entry?.color ?? '';
    }

    return entry;
  };

  const currentColor = getCurrentColor();

  const { valueToHex } = useColorPicker(currentColor, props.onChange);

  const hexValue = valueToHex();

  return (
    <div className="flex gap-2 items-end">
      <ControlsPopover
        icon={<ColorPickerPipette />}
        style={{
          background: props.type === 'background' ? currentColor : hexValue,
        }}
      >
        <Tabs>
          <TabsList>
            <TabsTrigger value="color">Colors</TabsTrigger>
            {props.type === 'background' && (
              <TabsTrigger value="image">Image</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="color">
            <ColorPicker
              color={hexValue}
              onChange={props.onChange}
              type={props.type}
            />
          </TabsContent>

          {props.type === 'background' && (
            <TabsContent value="image">
              <BackgroundImageController />
            </TabsContent>
          )}
        </Tabs>
      </ControlsPopover>
      <div className="flex-1">
        <Input
          id={`colorPicker${props.type}`}
          label={props.label || 'Color'}
          value={hexValue}
          readOnly
        />
      </div>
    </div>
  );
};

export default ColorControls;

'use client';
import useStyles from '@admin/hooks/useStyles';
import {
  BorderBottom,
  BorderLeft,
  BorderOuter,
  BorderRadiusTopLeft,
  BorderRight,
  BorderSides,
  BorderStyle,
  BorderTop,
  BorderWidth,
  Cog,
  ICON_STYLES,
} from '@cms/ui/components/Icons';
import { Label } from '@cms/ui/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cms/ui/components/Select';
import { useState } from 'react';
import ControlsPopover from '../ControlsPopover';
import Input from '../../ui/Input';
import ColorControls from './color-controls';
import { BorderTypes } from './types';

const initialBorderState = {
  width: null,
  style: null,
  color: null,
  radius: null,
};

const BorderControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const [borderType, setBorderType] = useState<BorderTypes>('border');

  const activeStyles = getActiveStyles(borderType);

  const state = {
    ...initialBorderState,
    ...(activeStyles ? activeStyles[borderType] : {}),
  };

  const handleChange = (type: keyof typeof state, value: string) => {
    const newValue = {
      [type]:
        type === 'color' || type === 'style' ? value : parseFloat(value) || 0,
    };

    applyStyles({ [borderType]: { ...state, ...newValue } });
  };

  const controls = (
    <ControlsPopover icon={<Cog />} style={{ background: state?.color || '' }}>
      <div className="border-b text-sm mb-2">Border controls</div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-grow flex gap-4 justify-between">
          <Input
            type="number"
            label="Border radius"
            value={state?.radius || ''}
            min={0}
            endContent={
              <>
                <BorderRadiusTopLeft className={ICON_STYLES} />
              </>
            }
            onChange={(value) => handleChange('radius', value)}
          />
          <Input
            type="number"
            label="Border thickness"
            value={state?.width || ''}
            min={0}
            endContent={
              <>
                <BorderWidth className={ICON_STYLES} />
              </>
            }
            onChange={(value) => handleChange('width', value)}
          />
        </div>
        <div className="flex-grow flex gap-4 justify-between">
          <div className="flex-1">
            <Select
              onValueChange={(value) => handleChange('style', value)}
              value={state?.style || ''}
            >
              <Label>Border style</Label>
              <SelectTrigger>
                <>
                  <BorderStyle className={ICON_STYLES} />
                  <SelectValue placeholder="Border style" />
                </>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="groove">Groove</SelectItem>
                <SelectItem value="ridge">Ridge</SelectItem>
                <SelectItem value="inset">Inset</SelectItem>
                <SelectItem value="outset">Outset</SelectItem>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select
              onValueChange={(value: BorderTypes) => setBorderType(value)}
              value={borderType || ''}
            >
              <Label>Border sides</Label>
              <SelectTrigger>
                <>
                  <BorderSides className={ICON_STYLES} />
                  <SelectValue placeholder="Border sides" />
                </>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="border">
                  <div className="flex gap-2 items-center">
                    <BorderOuter className={ICON_STYLES} /> All
                  </div>
                </SelectItem>
                <SelectItem value="border-top">
                  <div className="flex gap-2 items-center">
                    <BorderTop className={ICON_STYLES} /> Top
                  </div>
                </SelectItem>
                <SelectItem value="border-right">
                  <div className="flex gap-2 items-center">
                    <BorderRight className={ICON_STYLES} /> Right
                  </div>
                </SelectItem>
                <SelectItem value="border-bottom">
                  <div className="flex gap-2 items-center">
                    <BorderBottom className={ICON_STYLES} /> Bottom
                  </div>
                </SelectItem>
                <SelectItem value="border-left">
                  <div className="flex gap-2 items-center">
                    <BorderLeft className={ICON_STYLES} /> Left
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex-grow">
          <ColorControls
            onChange={(value) => handleChange('color', value)}
            label="Border color"
            type="border"
          />
        </div>
      </div>
    </ControlsPopover>
  );

  return (
    <div className="flex gap-2 items-end">
      <div>{controls}</div>
      <div className="flex-1">
        <Input
          readOnly
          type="text"
          label="Border"
          value={Object.values(state).join('')}
        />
      </div>
    </div>
  );
};

export default BorderControls;

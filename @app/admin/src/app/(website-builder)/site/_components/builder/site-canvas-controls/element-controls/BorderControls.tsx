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
import ControlsPopover from '../../ui/ControlsPopover';
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
      <div className="mb-2 border-b text-sm">Border controls</div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-grow justify-between gap-4">
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
        <div className="flex flex-grow justify-between gap-4">
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
                  <div className="flex items-center gap-2">
                    <span>All</span>
                    <BorderOuter className={ICON_STYLES} />
                  </div>
                </SelectItem>
                <SelectItem value="border-top">
                  <div className="flex items-center gap-2">
                    <span>Top</span>
                    <BorderTop className={ICON_STYLES} />
                  </div>
                </SelectItem>
                <SelectItem value="border-right">
                  <div className="flex items-center gap-2">
                    <span>Right</span>
                    <BorderRight className={ICON_STYLES} />
                  </div>
                </SelectItem>
                <SelectItem value="border-bottom">
                  <div className="flex items-center gap-2">
                    <span>Bottom</span>
                    <BorderBottom className={ICON_STYLES} />
                  </div>
                </SelectItem>
                <SelectItem value="border-left">
                  <div className="flex items-center gap-2">
                    <span>Left</span>
                    <BorderLeft className={ICON_STYLES} />
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
    <div className="flex items-end gap-2">
      <div>{controls}</div>
      <div className="flex-1">
        <div></div>
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

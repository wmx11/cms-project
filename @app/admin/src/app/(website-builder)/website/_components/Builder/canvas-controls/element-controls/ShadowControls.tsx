'use client';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/template-engine/constants';
import { Button } from '@cms/ui/components/Button';
import { Cog } from '@cms/ui/components/Icons';
import { Input } from '@cms/ui/components/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@cms/ui/components/Popover';
import { FC, useEffect, useState } from 'react';
import InputElement from '../InputElement';
import ColorControls from './ColorControls';

interface ShadowControlsProps {
  type: 'box-shadow' | 'text-shadow';
  label?: string;
}

const SHADOW_X_INDEX = 0;
const SHADOW_Y_INDEX = 1;
const SHADOW_BLUR_INDEX = 2;
const SHADOW_SPREAD_INDEX = 3;
const SHADOW_COLOR_INDEX = 4;

const ShadowControls: FC<ShadowControlsProps> = (props) => {
  const { applyStyles, getActiveStyles } = useStyles();

  const currentShadowString = getActiveStyles(props.type)?.replace(
    /(, )/g,
    ','
  );

  const currentShadow = currentShadowString?.split(' ');

  const x =
    currentShadow?.at(SHADOW_X_INDEX) === 'none'
      ? '0'
      : currentShadow?.at(SHADOW_X_INDEX)?.replace(DEFAULT_UNIT, '') || '0';

  const y = currentShadow?.at(SHADOW_Y_INDEX)?.replace(DEFAULT_UNIT, '') || '0';

  const blur =
    currentShadow?.at(SHADOW_BLUR_INDEX)?.replace(DEFAULT_UNIT, '') || '0';

  const spread =
    currentShadow?.at(SHADOW_SPREAD_INDEX)?.replace(DEFAULT_UNIT, '') || '0';

  const color =
    currentShadow?.at(
      SHADOW_COLOR_INDEX - (props.type === 'text-shadow' ? 1 : 0)
    ) || '#000000';

  const [state, setState] = useState({
    x: x,
    y: y,
    blur: blur,
    spread: spread,
    color: color,
    shadowString: currentShadowString || '',
  });

  useEffect(() => {
    applyStyles({ [props.type]: state.shadowString });
  }, [state]);

  const constructShadowString = ({
    x,
    y,
    blur,
    color,
    spread,
  }: typeof state) => {
    const values = [x, y, blur];

    if (props.type === 'box-shadow') {
      values.push(spread);
    }

    values.push(color);

    return values
      .map((item, index) => {
        if (index + 1 !== values.length) {
          return item + DEFAULT_UNIT;
        }

        return item;
      })
      .join(' ');
  };

  const handleChange = (type: keyof typeof state, value: string) => {
    setState((prevState) => {
      const shadowString = constructShadowString({
        ...prevState,
        [type]: value,
      });

      return {
        ...prevState,
        [type]: value,
        shadowString,
      };
    });
  };

  return (
    <div>
      <Input
        label={props.label || 'Shadows'}
        defaultValue={currentShadowString}
        startContent={
          <Popover>
            <PopoverTrigger>
              <Button size="icon" className="border">
                <Cog />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[330px]" side="left">
              <div className="border-b text-sm">{props.label}</div>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 w-full">
                  <InputElement
                    type="number"
                    label="X"
                    value={state.x}
                    onChange={(value) => handleChange('x', value)}
                  />
                  <InputElement
                    type="number"
                    label="Y"
                    value={state.y}
                    onChange={(value) => handleChange('y', value)}
                  />
                </div>
                <div className="flex-1 w-full">
                  <InputElement
                    type="number"
                    label="Blur"
                    value={state.blur}
                    onChange={(value) => handleChange('blur', value)}
                  />
                  {props.type === 'box-shadow' ? (
                    <InputElement
                      type="number"
                      label="Spread"
                      value={state.spread}
                      onChange={(value) => handleChange('spread', value)}
                    />
                  ) : (
                    <div className="w-full"></div>
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <ColorControls
                  onChange={(value) => handleChange('color', value)}
                  label={`${props.label} color`}
                  type={props.type}
                />
              </div>
            </PopoverContent>
          </Popover>
        }
      />
    </div>
  );
};

export default ShadowControls;

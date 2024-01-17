'use client';
import useStyles from '@admin/hooks/useStyles';
import { Cog } from '@cms/ui/components/Icons';
import { Input } from '@cms/ui/components/Input';
import { FC, useState } from 'react';
import ControlsPopover from '../ControlsPopover';
import InputElement from '../InputElement';
import ColorControls from './ColorControls';

interface ShadowControlsProps {
  type: 'box-shadow' | 'text-shadow';
  label?: string;
}

const initialShadowState = {
  x: null,
  y: null,
  blur: null,
  spread: null,
  color: null,
};

const ShadowControls: FC<ShadowControlsProps> = (props) => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles<{
    [K in ShadowControlsProps['type']]: typeof initialShadowState;
  }>(props.type);

  const [state, setState] = useState(
    activeStyles ? activeStyles[props.type] : initialShadowState
  );

  const handleChange = (type: keyof typeof state, value: string) => {
    const newValue = {
      [type]: type === 'color' ? value : parseFloat(value) || 0,
    };

    setState((prevState) => {
      return {
        ...prevState,
        ...newValue,
      };
    });

    applyStyles({ [props.type]: { ...state, ...newValue } });
  };

  const controls = (
    <ControlsPopover icon={<Cog />} style={{ background: state?.color || '' }}>
      <div className="border-b text-sm mb-2">{props.label}</div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 w-full">
          <InputElement
            type="number"
            label="X axis"
            value={state?.x || 0}
            onChange={(value) => handleChange('x', value)}
          />
          <InputElement
            type="number"
            label="Y axis"
            value={state?.y || 0}
            onChange={(value) => handleChange('y', value)}
          />
        </div>
        <div className="flex-1 w-full">
          <InputElement
            type="number"
            label="Blur"
            value={state?.blur || 0}
            onChange={(value) => handleChange('blur', value)}
          />
          {props.type === 'box-shadow' ? (
            <InputElement
              type="number"
              label="Spread"
              value={state?.spread || 0}
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
    </ControlsPopover>
  );

  return (
    <div className="flex gap-2 items-end">
      <div>{controls}</div>
      <div className="flex-1">
        <Input readOnly label={props.label || 'Shadows'} />
      </div>
    </div>
  );
};

export default ShadowControls;

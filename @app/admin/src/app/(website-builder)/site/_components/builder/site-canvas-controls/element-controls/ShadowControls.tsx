'use client';
import useStyles from '@admin/hooks/useStyles';
import { Cog } from '@cms/ui/components/Icons';
import { FC } from 'react';
import ControlsPopover from '../ControlsPopover';
import Input from '../../ui/Input';
import ColorControls from './color-controls';
import { ShadowControlsProps } from './types';

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

  const parseActiveStyles = () => {
    if (!activeStyles) {
      return {};
    }

    const values = activeStyles[props.type];

    if (typeof values === 'string') {
      return {};
    }

    return values;
  };

  const state = {
    ...initialShadowState,
    ...parseActiveStyles(),
  };

  const handleChange = (type: keyof typeof state, value: string) => {
    const newValue = {
      [type]: type === 'color' ? value : parseFloat(value) || 0,
    };

    applyStyles({ [props.type]: { ...state, ...newValue } });
  };

  const controls = (
    <ControlsPopover icon={<Cog />} style={{ background: state?.color || '' }}>
      <div className="border-b text-sm mb-2">{props.label}</div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 w-full">
          <Input
            type="number"
            label="X axis"
            value={state?.x || ''}
            onChange={(value) => handleChange('x', value)}
          />
          <Input
            type="number"
            label="Y axis"
            value={state?.y || ''}
            onChange={(value) => handleChange('y', value)}
          />
        </div>
        <div className="flex-1 w-full">
          <Input
            type="number"
            label="Blur"
            value={state?.blur || ''}
            min={0}
            onChange={(value) => handleChange('blur', value)}
          />
          {props.type === 'box-shadow' ? (
            <Input
              type="number"
              label="Spread"
              value={state?.spread || ''}
              min={0}
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
        <Input
          readOnly
          label={props.label || 'Shadows'}
          value={Object.values(state).join(' ')}
        />
      </div>
    </div>
  );
};

export default ShadowControls;

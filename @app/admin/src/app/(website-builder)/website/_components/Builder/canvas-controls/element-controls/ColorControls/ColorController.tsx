'use client';
import useStyles from '@admin/hooks/useStyles';
import { FC, useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';
import { ColorControlsProps } from './types';

const ColorController: FC<ColorControlsProps> = (props) => {
  const { getActiveStyles } = useStyles();

  const currentColorString = getActiveStyles(props.type);

  const [colorString, setColorString] = useState(currentColorString);

  const onChange = (value: string) => {
    props.onChange(value);
    setColorString(value);
  };

  return (
    <div>
      <ColorPicker
        value={colorString}
        onChange={onChange}
        hideControls={props.type !== 'background'}
        className=""
      />
    </div>
  );
};

export default ColorController;

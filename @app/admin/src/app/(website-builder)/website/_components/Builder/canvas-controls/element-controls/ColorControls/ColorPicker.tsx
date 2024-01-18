'use client';
import { FC, useState } from 'react';
import ReactColorPicker from 'react-best-gradient-color-picker';
import { ColorControlsProps } from '../types';

interface ColorPickerProps extends ColorControlsProps {
  color: string;
}

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const [colorString, setColorString] = useState(props.color);

  const onChange = (value: string) => {
    props.onChange(value);
    setColorString(value);
  };

  return (
    <div>
      <ReactColorPicker
        value={colorString}
        onChange={onChange}
        hideControls={props.type !== 'background'}
        className=""
      />
    </div>
  );
};

export default ColorPicker;

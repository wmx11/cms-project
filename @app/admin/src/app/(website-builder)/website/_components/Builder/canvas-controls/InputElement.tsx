import { Input } from '@nextui-org/react';
import React from 'react';

type InputElementsProps = {
  label: string;
  type?: string;
  value: string;
  min?: number;
  icon?: React.ReactElement | string;
  onChange?: (value: string) => void;
};

const InputElement = (props: InputElementsProps) => {
  return (
    <Input
      size="sm"
      radius="none"
      label={props.label}
      labelPlacement="outside"
      fullWidth
      type={props.type || 'text'}
      endContent={props.icon}
      value={props.value}
      min={props.min}
      onValueChange={props.onChange}
    />
  );
};

export default InputElement;

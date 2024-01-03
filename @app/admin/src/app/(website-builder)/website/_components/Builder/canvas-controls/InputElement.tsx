import { Input } from '@cms/packages/ui/components/Input';
import React, { FC } from 'react';

interface InputElementsProps {
  label: string;
  type?: string;
  className?: string;
  value: string;
  min?: number;
  endContent?: React.ReactElement | string;
  onChange?: (value: string) => void;
}

const InputElement: FC<InputElementsProps> = (props) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.onChange) {
      return;
    }

    if (!e) {
      return;
    }

    props.onChange(e?.target?.value);
  };

  return (
    <Input
      label={props.label}
      name={props.label}
      placeholder="-"
      type={props.type || 'text'}
      value={props.value}
      min={props.min}
      className={props.className}
      endContent={props.endContent}
      onChange={handleOnChange}
    />
  );
};

export default InputElement;

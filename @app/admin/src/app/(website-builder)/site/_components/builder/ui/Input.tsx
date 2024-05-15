'use client';
import {
  Input as InputElement,
  InputProps as InputPropsTypes,
} from '@cms/packages/ui/components/Input';
import React, { ChangeEvent, FC, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends Omit<InputPropsTypes, 'onChange'> {
  label?: string;
  endContent?: React.ReactElement | string;
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!props.onChange || !e) {
      return;
    }
    props.onChange(e?.target?.value, e);
  };

  return (
    <InputElement
      {...props}
      ref={ref}
      placeholder="-"
      className={twMerge(props.className, 'h-8')}
      onChange={handleOnChange}
      errorMessage={''}
    />
  );
});

Input.displayName = 'Input';

export default Input;

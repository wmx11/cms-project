import { Input } from '@cms/packages/ui/components/Input';
import React, { ComponentPropsWithRef, FC, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputElementProps
  extends Omit<ComponentPropsWithRef<'input'>, 'onChange'> {
  label?: string;
  endContent?: React.ReactElement | string;
  onChange?: (value: string) => void;
}

const InputElement: FC<InputElementProps> = forwardRef((props, ref) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.onChange || !e) {
      return;
    }

    props.onChange(e?.target?.value);
  };

  return (
    <Input
      {...props}
      ref={ref}
      placeholder="-"
      className={twMerge(props.className, 'h-8')}
      onChange={handleOnChange}
    />
  );
});

export default InputElement;

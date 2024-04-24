'use client';
import { Button } from '@cms/ui/components/Button';
import React, { ComponentPropsWithoutRef, FC } from 'react';
import { useFormStatus } from 'react-dom';

interface Props extends ComponentPropsWithoutRef<'button'> {}

const SubmitButton: FC<Props> = (props) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} loading={pending}>
      {props.children}
    </Button>
  );
};

export default SubmitButton;

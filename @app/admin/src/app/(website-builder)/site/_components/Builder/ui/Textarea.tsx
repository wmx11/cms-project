'use client';
import React, { FC, useState } from 'react';
import {
  Textarea as TextareaComponent,
  TextareaProps,
} from '@cms/ui/components/Textarea';
import { MAX_META_DESCRIPTION_LENGTH } from '@cms/tiglee-engine/constants';

interface Props extends TextareaProps {
  showLength?: boolean;
  maxLength?: number;
}

export const Textarea: FC<Props> = ({
  showLength,
  maxLength = MAX_META_DESCRIPTION_LENGTH,
  ...props
}) => {
  const [value, setValue] = useState<string>((props.value as string) || '');

  return (
    <div>
      <TextareaComponent
        {...props}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      {showLength && (
        <p className="text-xs text-zinc-500">
          <span className={value?.length > maxLength ? 'text-red-500' : ''}>
            {value?.length}
          </span>
          /{maxLength}
        </p>
      )}
    </div>
  );
};

Textarea.displayName = 'Textarea';

import { MAX_STRING_LENGTH } from '@cms/tiglee-engine/constants';
import {
  Textarea as TextareaComponent,
  TextareaProps,
} from '@cms/ui/components/Textarea';
import { FC } from 'react';

interface Props extends Omit<TextareaProps, 'value'> {
  showLength?: boolean;
  maxLength?: number;
  value: string;
}

export const Textarea: FC<Props> = ({
  showLength,
  maxLength = MAX_STRING_LENGTH,
  ...props
}) => {
  return (
    <div>
      <TextareaComponent {...props} />
      {showLength && (
        <p className="text-xs text-dim">
          <span
            className={props.value?.length > maxLength ? 'text-red-500' : ''}
          >
            {props.value?.length}
          </span>
          /{maxLength}
        </p>
      )}
    </div>
  );
};

Textarea.displayName = 'Textarea';

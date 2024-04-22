import * as React from 'react';

import { cn } from '@cms/lib/utils';
import ErrorMessage, { ErrorMessageProps } from './ErrorMessage';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    ErrorMessageProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, errorMessage, ...props }, ref) => {
    return (
      <div>
        <textarea
          className={cn(
            'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };

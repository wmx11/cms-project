import * as React from 'react';
import { cn } from '@cms/packages/lib/utils';
import { Label } from './Label';
import ErrorMessage, { ErrorMessageProps } from './ErrorMessage';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    ErrorMessageProps {
  label?: string;
  endContent?: React.ReactElement | string;
  startContent?: React.ReactElement | string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, startContent, endContent, errorMessage, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {props.label && (
          <Label htmlFor={props.name} className="text-xs">
            {props.label}
          </Label>
        )}
        <div className="border-input relative flex items-center rounded-md border">
          {startContent && (
            <div className="mr-2 text-xs text-zinc-500">{startContent}</div>
          )}
          <div className="flex-1">
            <input
              type={type}
              className={cn(
                'bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
              )}
              ref={ref}
              {...props}
            />
          </div>
          {endContent && (
            <div className="text-xs text-zinc-500">{endContent}</div>
          )}
        </div>
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };

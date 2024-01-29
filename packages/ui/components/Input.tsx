import * as React from 'react';
import { cn } from '@cms/packages/lib/utils';
import { Label } from './Label';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  endContent?: React.ReactElement | string;
  startContent?: React.ReactElement | string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startContent, endContent, ...props }, ref) => {
    return (
      <div className="w-full">
        {props.label && (
          <Label htmlFor={props.name} className="text-xs">
            {props.label}
          </Label>
        )}
        <div className="relative flex items-center rounded-md border border-input">
          {startContent && (
            <div className="text-xs text-zinc-500 mr-2">{startContent}</div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-10 w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            ref={ref}
            {...props}
          />
          {endContent && (
            <div className="text-xs text-zinc-500">{endContent}</div>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };

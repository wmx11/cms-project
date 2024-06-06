import { cn } from '@cms/packages/lib/utils';
import { Schema } from '@cms/packages/tiglee-engine/types';
import {
  Button as ButtonComponent,
  ButtonProps,
} from '@cms/packages/ui/components/Button';
import { ArrowRight, ICON_STYLES } from '@cms/packages/ui/components/Icons';
import Link from 'next/link';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonProps {
  href?: string;
  target?: boolean;
  showLinkIcon?: boolean;
  isEnabled?: boolean;
}

const Button: FC<Props> = ({
  href,
  target,
  showLinkIcon,
  isEnabled,
  children,
  ...props
}) => {
  const className = twMerge(
    'rounded-base border-2 border-black bg-tg-primary px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none',
    props.className
  );

  if (href) {
    const hrefTypes = isEnabled
      ? { href: href }
      : { 'data-href': href, href: '#' };

    return (
      <ButtonComponent {...props} className={className}>
        <Link
          {...hrefTypes}
          target={target && isEnabled ? '_blank' : '_self'}
          className="group flex h-full w-full justify-center"
        >
          <span className='flex gap-2 items-center'>
            <span data-children className={cn(showLinkIcon && 'mr-2')}>
              {children}
            </span>
            {showLinkIcon && (
              <ArrowRight
                className={`${ICON_STYLES} mr-0 transition-transform group-hover:translate-x-1`}
              />
            )}
          </span>
        </Link>
      </ButtonComponent>
    );
  }

  return (
    <ButtonComponent {...props} className={className}>
      <span data-children>{children}</span>
    </ButtonComponent>
  );
};

export default Button;

export const schema: Schema = {
  component: 'Button',
  category: 'button',
  editable: true,
  description: 'Link to other pages or call to action.',
  displayName: 'Button',
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Button',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
    },
    {
      name: 'href',
      displayName: 'Link',
      type: 'string',
      value: '',
    },
    {
      name: 'target',
      displayName: 'Open in new window?',
      type: 'boolean',
      value: false,
    },
    {
      name: 'showLinkIcon',
      displayName: 'Show link icon?',
      type: 'boolean',
      value: false,
    },
    {
      name: 'isEnabled',
      displayName: 'Is link enabled?',
      type: 'boolean',
      value: true,
    },
  ],
};

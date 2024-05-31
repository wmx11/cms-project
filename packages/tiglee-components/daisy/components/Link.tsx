import { Schema } from '@cms/tiglee-engine/types';
import * as LinkComponent from 'next/link';
import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentPropsWithoutRef<'a'> {
  isEnabled?: boolean;
}

const Link: FC<Props> = ({ isEnabled, href, target, ...props }) => {
  const hrefTypes = isEnabled
    ? { href: href as string }
    : { 'data-href': href, href: '#' };

  return (
    <LinkComponent.default
      {...hrefTypes}
      target={target && isEnabled ? '_blank' : '_self'}
      className={twMerge('link hover:underline', props.className)}
      {...props}
    ></LinkComponent.default>
  );
};

export default Link;

export const schema: Schema = {
  component: 'Link',
  category: 'link',
  description: 'Link to other pages or websites.',
  editable: true,
  props: [
    {
      name: 'children',
      type: 'string',
      value: 'Link',
    },
    {
      name: 'className',
      type: 'string',
      value: '',
    },
    {
      name: 'href',
      displayName: 'Href',
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
      name: 'isEnabled',
      displayName: 'Is link enabled?',
      type: 'boolean',
      value: false,
    },
  ],
};

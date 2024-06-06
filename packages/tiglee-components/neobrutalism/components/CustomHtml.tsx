import { Schema } from '@cms/tiglee-engine/types';
import { FC } from 'react';

interface CustomHtmlProps {
  html: string | TrustedHTML;
}

const CustomHtml: FC<CustomHtmlProps> = ({ html }) => {
  return (
    <div data-component-parent dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

export default CustomHtml;

export const schema: Schema = {
  component: 'CustomHtml',
  category: 'custom',
  description: 'Insert custom HTML code.',
  displayName: 'Custom HTML code',
  props: [
    {
      name: 'html',
      type: 'string',
      value: '<div>Custom HMTL code will be shown here</div>',
      description: 'Paste or write your custom HTML code.',
      displayName: 'Custom HTML Code',
    },
  ],
};

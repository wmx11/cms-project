import { Schema } from '@cms/template-engine/types';
import { FC } from 'react';

interface CustomHtmlProps {
  html: string;
}

const CustomHtml: FC<CustomHtmlProps> = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default CustomHtml;

export const schema: Schema = {
  component: 'CustomHtml',
  category: 'custom',
  description: 'Use this to insert custom HTML code',
  displayName: 'Custom HTML code',
  props: [
    {
      name: 'html',
      type: 'string',
      value: '',
      description: 'Takes in custom HTML',
      displayName: 'Custom HTML',
    },
  ],
};

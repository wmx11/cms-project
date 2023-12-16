import {
  elementGaps,
  flexColumns,
  fontSize,
  horizontalAlign,
  layoutType,
  positionType,
  textAlign,
  verticalAlign,
} from './variants/variants';

export type Props = {
  name: 'children' | 'className' | string;
  type: 'string' | 'number' | 'component' | 'boolean';
  value: string | Schema[] | true | false;
  displayName?: string | undefined;
  description?: string | undefined;
};

// // Indicates whether the element is editable and will be contenteditable=true in the builder
type SchemaWithEditable = { editable?: boolean; richText?: never };
// // Indicates whether the element is richText and will be a Slate editor in the builder
type SchemaWithRichText = { editable?: never; richText?: boolean };

export type ComponentVariants = {
  textAlign?: keyof typeof textAlign;
  horizontalAlign?: keyof typeof horizontalAlign;
  verticalAlign?: keyof typeof verticalAlign;
  layoutType?: keyof typeof layoutType;
  flexColumns?: keyof typeof flexColumns;
  elementGaps?: keyof typeof elementGaps;
  fontSize?: keyof typeof fontSize;
  positionType?: keyof typeof positionType;
};

export type Schema = {
  component: string;
  props: Props[];
  componentVariants?: ComponentVariants;
  category?:
    | 'layout'
    | 'button'
    | 'navigation'
    | 'typography'
    | 'text'
    | 'form';
  description?: string | undefined;
} & (SchemaWithEditable | SchemaWithRichText);

export type TemplateID = string;

export type TemplateMetadata = {
  id?: string;
  name?: string;
  slug?: string;
  image?: string;
  description?: string;
  icon?: string;
  schema?: JSON;
  category?: 'profile' | 'landing' | 'form' | 'portfolio' | 'sectioned';
};

export type TemplateSchema = {
  metadata: TemplateMetadata;
  schema: Schema[];
};

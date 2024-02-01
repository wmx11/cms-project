/**
 * Possible categories of the component
 */
type SchemaCategory =
  | 'layout'
  | 'button'
  | 'navigation'
  | 'text'
  | 'heading'
  | 'form'
  | 'custom'
  | 'media';

type TemplateCategory =
  | 'profile'
  | 'landing'
  | 'form'
  | 'portfolio'
  | 'sectioned';

type StringProps = { type: 'string'; value: string };

type NumberProps = { type: 'number'; value: string };

type ComponentProps = { type: 'component'; value: Schema[] };

export type Props = {
  name: 'children' | 'className' | string;
  displayName?: string | undefined;
  description?: string | undefined;
} & (StringProps | NumberProps | ComponentProps);

/**
 * Indicates whether the element is editable and will be contenteditable=true in the builder
 */
type SchemaWithEditable = { editable?: boolean; richText?: never };

/**
 * Indicates whether the element is richText and will be a Slate editor in the builder
 */
type SchemaWithRichText = { editable?: never; richText?: boolean };

export type Schema = {
  component: string;
  props: Props[];
  id?: string;
  displayName?: string;
  description?: string | undefined;
  category?: SchemaCategory;
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
  category?: TemplateCategory;
};

export type TemplateSchema = {
  metadata: TemplateMetadata;
  schema: Schema[];
};

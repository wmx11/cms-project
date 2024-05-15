import { StylesObjectWithBreakpoints } from './styles/jssStyles';

declare global {
  namespace PrismaJson {
    type _Schema = Schema[];
    type _StylesSchema = StylesObjectWithBreakpoints;
  }
}

/**
 * Possible categories of the component
 */
export type SchemaCategory =
  | 'button'
  | 'custom'
  | 'footer'
  | 'form'
  | 'input'
  | 'header'
  | 'heading'
  | 'image'
  | 'layout'
  | 'link'
  | 'navigation'
  | 'text'
  | 'video';

/**
 * Possible categories of templates
 */
type TemplateCategory =
  | 'form'
  | 'landing'
  | 'marketing'
  | 'portfolio'
  | 'profile'
  | 'saas'
  | 'sectioned';

type StringProps = { type: 'string'; value: string };

type NumberProps = { type: 'number'; value: string };

type ComponentProps = { type: 'component'; value: Schema[] };

type BooleanProps = { type: 'boolean'; value: boolean };

export type Props = {
  name: 'children' | 'className' | string;
  displayName?: string | undefined;
  description?: string | undefined;
} & (StringProps | NumberProps | ComponentProps | BooleanProps);

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

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
  | 'block'
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

type ControlTypes = 'input' | 'textarea';

type SelectProps = {
  type: 'select';
  value: string;
  options: { value: string; label: string; id?: string }[];
};

type StringProps = { type: 'string'; value: string };

type NumberProps = { type: 'number'; value: string };

type ComponentProps = { type: 'component'; value: Schema[] };

type BooleanProps = { type: 'boolean'; value: boolean };

type ClassNameProps = { name: 'className' } & StringProps;

type HtmlProps = { name: 'html' } & StringProps;

type ChildrenProps = { name: 'children' } & (ComponentProps | StringProps);

type PropTypes =
  | StringProps
  | NumberProps
  | ComponentProps
  | BooleanProps
  | SelectProps
  | ClassNameProps
  | HtmlProps
  | ChildrenProps;

export type Props = {
  name: string & {};
  displayName?: string | undefined;
  description?: string | undefined;
  controlType?: ControlTypes;
  allowedComponents?: string[];
} & PropTypes;

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
  allowedComponents?: string[];
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

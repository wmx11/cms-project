export interface Props {
  name: 'children' | 'className' | string;
  type: 'string' | 'number' | 'component' | 'boolean';
  value: string | Schema[] | true | false;
  displayName?: string | undefined;
  description?: string | undefined;
}

// // Indicates whether the element is editable and will be contenteditable=true in the builder
type SchemaWithEditable = { editable?: boolean; richText?: never };
// // Indicates whether the element is richText and will be a Slate editor in the builder
type SchemaWithRichText = { editable?: never; richText?: boolean };

export type Schema = {
  component: string;
  displayName?: string;
  description?: string | undefined;
  props: Props[];
  category?:
    | 'layout'
    | 'button'
    | 'navigation'
    | 'text'
    | 'heading'
    | 'form'
    | 'custom'
    | 'media';
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

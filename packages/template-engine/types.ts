export type Props = {
  name: string;
  type: 'string' | 'number' | 'component';
  value: string | Schema[];
  displayName?: string | undefined;
  description?: string | undefined;
};

// // Indicates whether the element is editable and will be contenteditable=true in the builder
type SchemaWithEditable = { editable: boolean; richText?: never };
// // Indicates whether the element is richText and will be a Slate editor in the builder
type SchemaWithRichText = { editable?: never; richText: boolean };

export type Schema = {
  component: string;
  props: Props[];
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

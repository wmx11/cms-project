export type Props = {
  name: string;
  type: 'string' | 'number' | 'component';
  value: string | Schema[];
  displayName?: string | undefined;
  description?: string | undefined;
};

export type Schema = {
  component: string;
  props: Props[];
  editable?: boolean;
  category?:
    | 'layout'
    | 'button'
    | 'navigation'
    | 'typography'
    | 'text'
    | 'form';
  description?: string | undefined;
};

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

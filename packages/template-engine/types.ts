export type Props = {
  name: string;
  type: 'string' | 'number' | 'component';
  value: string | Schema[];
  displayName?: string | undefined;
  description?: string | undefined;
};

export type Schema = {
  component: string;
  category?: 'layout' | 'button' | 'navigation' | 'typography' | 'form';
  props: Props[];
};

export type TemplateID = string;

export type TemplateMetadata = {
  name: string;
  id: TemplateID;
  component: string;
  title: string;
  name: string;
  slug: string;
  image: string;
  category?: 'profile' | 'landing' | 'form' | 'portfolio' | 'sectioned';
  description: string;
  icon: string;
};

export type TemplateSchema = {
  metadata: TemplateMetadata;
  schema: Schema[];
};

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
};

export type TemplateID = string;

export type TemplateMetadata = {
  name: string;
  id: TemplateID;
  component: string;
  title: string;
  description: string;
  icon: string;
};

export type TemplateSchema = {
  metadata: TemplateMetadata;
  schema: Schema[];
};

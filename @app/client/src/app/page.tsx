import TemplateSchema from '@cms/templates/landing-page/schema.json';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: TemplateSchema.metadata.title,
  description: TemplateSchema.metadata.description,
  icons: {
    icon: TemplateSchema.metadata.icon,
  },
};

export default async function Home() {
  const page = await import(
    `@cms/templates/${TemplateSchema.metadata.id}/${TemplateSchema.metadata.component}`
  );
  return page.default({
    context: TemplateSchema,
  });
}

import fs from 'fs';
import path from 'path';
import prisma from '@cms/packages/data/prisma';
import { Schema, TemplateMetadata } from './types';

const registerComponents = async (template: string[] = [], update = false) => {
  let templatesToRegister: string[] = template ?? [];
  let templateRegistryArray: string[] = [];

  if (!template || !template.length) {
    const templates = fs
      .readdirSync(path.resolve('packages', 'templates'), {
        withFileTypes: true,
      })
      .reduce((arr, file) => {
        if (file.isDirectory()) {
          arr.push(file?.name);
        }
        return arr;
      }, [] as string[]);

    const templateRegistry = fs.readFileSync(
      path.resolve('packages', 'templates', 'templateRegistry.json'),
      {
        encoding: 'utf-8',
      }
    );

    if (!templateRegistry) {
      return console.error('Cannot find template registry');
    }

    templateRegistryArray = JSON.parse(templateRegistry) as string[];

    templatesToRegister = templates.filter(
      (item) => !templateRegistry.includes(item)
    );
  }

  if (!templatesToRegister || !templatesToRegister.length) {
    console.log(
      'There are no new templates to register or no templates were specified to be updated.'
    );

    return;
  }

  for (const template of templatesToRegister) {
    let existingTemplate = await prisma.template.findFirst({
      where: {
        slug: template,
      },
    });

    if (!existingTemplate) {
      const importedTemplate = await import(
        `@cms/packages/templates/${template}/index`
      );

      if (!importedTemplate) {
        console.error('Cannot import template');
        continue;
      }

      const templateSchema = importedTemplate.schema as TemplateMetadata;

      existingTemplate = await prisma.template.create({
        data: {
          name: templateSchema?.name,
          slug: templateSchema?.slug,
          description: templateSchema?.description,
          category: templateSchema?.category,
        },
      });

      templateRegistryArray.push(templateSchema.slug as string);

      console.log(`Created new template ${existingTemplate.slug}`);
    }

    const components = fs.readdirSync(
      path.resolve(
        'packages',
        'templates',
        existingTemplate.slug as string,
        'components'
      )
    );

    if (!components || !components.length) {
      console.error(
        `No components for ${existingTemplate.slug} template were found`
      );
      continue;
    }

    for (const component of components) {
      const importedComponent = await import(
        `@cms/packages/templates/${existingTemplate.slug}/components/${component}`
      );

      if (!importedComponent) {
        console.error(
          `Cannot import ${component} component for ${existingTemplate.slug} template`
        );
        continue;
      }

      const componentSchema = importedComponent?.schema as Schema;

      if (!componentSchema) {
        console.error(
          `${component} component for ${existingTemplate.slug} template has no available schema declaration`
        );
        continue;
      }

      if (!update) {
        const newComponent = await prisma.component.create({
          data: {
            component: componentSchema.component,
            category: componentSchema.category,
            schema: JSON.stringify(componentSchema),
            description: componentSchema.description,
            template_id: existingTemplate.id,
          },
        });

        console.log('Created new component ->', newComponent);
      } else {
        const existingComponent = await prisma.component.findFirst({
          where: {
            component: componentSchema.component,
            template_id: existingTemplate.id,
          },
        });

        const updatedComponent = await prisma.component.upsert({
          create: {
            component: componentSchema.component,
            category: componentSchema.category,
            schema: JSON.stringify(componentSchema),
            description: componentSchema.description,
            template_id: existingTemplate.id,
          },
          update: {
            component: componentSchema.component,
            category: componentSchema.category,
            description: componentSchema.description,
            schema: JSON.stringify(componentSchema),
          },
          where: {
            id: existingComponent?.id || 'undefined-component',
            template_id: existingTemplate.id,
          },
        });

        console.log('Updated existing component ->', updatedComponent);
      }
    }
  }

  fs.writeFileSync(
    path.resolve('packages', 'templates', 'templateRegistry.json'),
    JSON.stringify(templateRegistryArray)
  );

  console.log('Templates have been successfully registered!');
};

registerComponents(['landing-page'], true);

export default registerComponents;

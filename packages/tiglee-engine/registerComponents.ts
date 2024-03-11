import fs from 'fs';
import path from 'path';
import prisma from '@cms/packages/data/prisma';
import { Schema } from './types';
import { TigleeComponentsInterface } from '@cms/tiglee-components/types';

const COMPONENTS_FOLDER_NAME = 'tiglee-components';

const registerComponents = async () => {
  const componentNamesToRegister: string[] = [];

  fs.readdirSync(path.resolve('packages', COMPONENTS_FOLDER_NAME), {
    withFileTypes: true,
  }).forEach((file) => {
    if (file.isDirectory()) {
      componentNamesToRegister.push(file?.name);
    }
  });

  for (const componentAlias of componentNamesToRegister) {
    const componentSchemaArray: Schema[] = [];

    const components = fs.readdirSync(
      path.resolve(
        'packages',
        COMPONENTS_FOLDER_NAME,
        componentAlias,
        'components'
      )
    );

    if (!components || !components.length) {
      console.error(
        `No components with the alias ${componentAlias} were found.`
      );
      continue;
    }

    interface ComponentsMetaData {
      default: TigleeComponentsInterface;
    }

    const componentsMetaData: ComponentsMetaData = await import(
      `@cms/packages/${COMPONENTS_FOLDER_NAME}/${componentAlias}/index`
    );

    if (!componentsMetaData) {
      console.error(`No metadata for ${componentAlias} was found.`);
    }

    for (const component of components) {
      const importedComponent = await import(
        `@cms/packages/${COMPONENTS_FOLDER_NAME}/${componentAlias}/components/${component}`
      );

      if (!importedComponent) {
        console.error(
          `Cannot import ${component} component from ${componentAlias}.`
        );
        continue;
      }

      const componentSchema = importedComponent?.schema as Schema;

      if (!componentSchema) {
        console.error(
          `${component} component inside ${componentAlias} folder has no schema declaration.`
        );
        continue;
      }

      componentSchemaArray.push(componentSchema);
    }

    try {
      const schema = JSON.stringify(componentSchemaArray);

      const component = await prisma.component.upsert({
        create: {
          name: componentsMetaData.default?.name,
          description: componentsMetaData.default?.description,
          alias: componentAlias,
          schema,
        },
        update: {
          name: componentsMetaData.default?.name,
          description: componentsMetaData.default?.description,
          alias: componentAlias,
          schema,
        },
        where: {
          alias: componentAlias,
        },
      });

      console.log(`Registered new component schema -> ${component.alias}`);
    } catch (error) {
      console.error(
        `Component ${componentAlias} registration failed. ${error}`
      );
    }
  }

  console.log('Components have been registered successfully');
};

registerComponents();

export default registerComponents;

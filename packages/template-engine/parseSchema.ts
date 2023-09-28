import importComponent from './importComponent';
import { Schema, TemplateID, TemplateSchema } from './types';

const parseSchema = async (
  schema: TemplateSchema['schema'],
  id: TemplateID,
  componentsArray: Schema[] = []
) => {
  const components = componentsArray;

  for (const item of schema) {
    const props = {};
    const component = await importComponent(id, item.component);

    for (const prop of item.props) {
      if (prop.type !== 'component') {
        Object.assign(props, { [prop.name]: prop.value });
      }

      if (prop.type === 'component') {
        const childComponent = await parseSchema(
          prop.value as Schema[],
          id,
          []
        );

        Object.assign(props, { [prop.name]: childComponent });
      }
    }

    components.push(component.default(props));
  }

  return components;
};

export default parseSchema;

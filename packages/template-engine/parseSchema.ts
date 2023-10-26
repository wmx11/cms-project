import {
  DATA_ACCEPTS_CHILDREN,
  DATA_COMPONENT,
  DATA_DESCRIPTION,
  DATA_EDITABLE,
  DATA_LABEL,
} from './constants/dataAttributes';
import {
  STLYES_ELEMENT_INSIDE_BUILDER,
  STYLES_CONTENT_EDITABLE,
} from './constants/styles';
import importComponent from './importComponent';
import { Props, Schema } from './types';

const generatePath = (
  path: string | undefined,
  index: number,
  item: Schema
) => {
  const defaultPath = `${index}.${item.component}`;

  if (path) {
    return `${path}.${defaultPath}`;
  }

  return `${index}.${item.component}`;
};

export const getComponentSchemaFromPath = (
  schema: Schema[],
  path: string
): Schema | null => {
  if (!path) {
    return null;
  }

  // 0.Section.0.Container.0.Title
  const splitPath = path.split('.');

  const iterate = (schemaArray: Schema[] | Schema, iteration = 0): Schema => {
    let schemaEntry = schemaArray;
    let _iteration = iteration;
    const index = splitPath[iteration];

    if (_iteration + 1 > splitPath.length) {
      return schemaEntry as Schema;
    }

    if (
      !isNaN(parseInt(splitPath[iteration], 10)) &&
      Array.isArray(schemaEntry)
    ) {
      schemaEntry = schemaEntry[parseInt(splitPath[iteration], 10)];
      _iteration += 1;
      return iterate(schemaEntry, _iteration);
    }

    if (
      !Array.isArray(schemaEntry) &&
      schemaEntry.component === index &&
      _iteration + 1 < splitPath.length
    ) {
      schemaEntry = schemaEntry.props.find((item) => item.type === 'component')
        ?.value as Schema[];
      _iteration += 1;
      return iterate(schemaEntry, _iteration);
    }

    if (
      !Array.isArray(schemaEntry) &&
      schemaEntry.component === index &&
      _iteration + 1 === splitPath.length
    ) {
      schemaEntry = schemaEntry;
      return schemaEntry;
    }

    return schemaEntry as Schema;
  };

  return iterate(schema);
};

type HandleAddRemoveComponentProps = {
  schema: Schema[];
  path?: string;
  component: Schema;
};

export const handleAddRemoveComponent = (
  options: HandleAddRemoveComponentProps
) => {
  const { schema, component, path } = options;
  if (path) {
    const schemaCopy = [...schema];
    const splitPath = path.split('.');
    let schemaEntry: Schema | Schema[] | Props | undefined = undefined;

    for (const pathItem of splitPath) {
      const index = parseInt(pathItem, 10);

      if (!isNaN(index)) {
        schemaEntry = schemaEntry
          ? (schemaEntry as Schema[])[index]
          : schemaCopy[index];
      }

      if (schemaEntry && (schemaEntry as Schema)?.component === pathItem) {
        schemaEntry = (schemaEntry as Schema)?.props.find(
          (item) => item.name === 'children' && item.type === 'component'
        )?.value as Schema[];
      }
    }

    if (schemaEntry && Array.isArray(schemaEntry)) {
      schemaEntry.push(component);
      return schemaCopy;
    }
  }

  const schemaCopy = [...schema];
  schemaCopy.push(component);
  return schemaCopy;
};

type ParseSchemaProps = {
  schema: Schema[];
  templateId: string;
  componentsArray: Schema[];
  isBuilder?: boolean;
  path?: string;
};

const parseSchema = async (options: ParseSchemaProps) => {
  const { schema, templateId, componentsArray = [], isBuilder, path } = options;

  const components = componentsArray;

  for (const [index, item] of schema?.entries()) {
    const component = await importComponent(templateId, item.component);
    const props = {};

    for (const prop of item.props) {
      if (prop.type !== 'component') {
        Object.assign(props, { [prop.name]: prop.value });
      }

      if (prop.type === 'component') {
        const childComponent = await parseSchema({
          ...options,
          schema: prop.value as Schema[],
          templateId,
          componentsArray: [],
          path: generatePath(path, index, item),
        });

        Object.assign(props, { [prop.name]: childComponent });
      }
    }

    // Returns a frozen React Object
    const componentNode = component.default(props);

    // Create a copy of the frozen React Object so we can manipulate data like {key, props}
    let componentNodeModified = {
      ...componentNode,
      key: `${item.component}_${index}` || '',
    };

    if (isBuilder) {
      // If parseSchema is called from a WebsiteBuilder, add borders to elements
      const acceptsChildren = Array.isArray(
        componentNodeModified?.props?.children
      );
      const hasChildren = componentNodeModified?.props?.children?.length > 0;

      Object.assign(componentNodeModified, {
        props: {
          ...componentNodeModified?.props,
          id: generatePath(path, index, item),
          [DATA_LABEL]: item.component,
          [DATA_EDITABLE]: item.editable,
          [DATA_COMPONENT]: true,
          [DATA_DESCRIPTION]: item.description,
          [DATA_ACCEPTS_CHILDREN]: acceptsChildren,
          className: `${componentNodeModified?.props?.className} ${
            item.editable ? `${STYLES_CONTENT_EDITABLE} outline-none` : ''
          } ${STLYES_ELEMENT_INSIDE_BUILDER}`,
        },
      });
    }

    components.push(componentNodeModified);
  }

  return components;
};

export default parseSchema;

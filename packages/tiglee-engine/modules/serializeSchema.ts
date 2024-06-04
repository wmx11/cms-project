import { nanoid } from 'nanoid';
import React from 'react';
import {
  DATA_ACCEPTS_CHILDREN,
  DATA_COMPONENT,
  DATA_DESCRIPTION,
  DATA_DISPLAY_NAME,
  DATA_DND_INITIALIZED,
  DATA_EDITABLE,
  DATA_ID,
  DATA_LABEL,
} from '../constants';
import { Props, Schema } from '../types';
import generatePath from './generatePath';
import importComponent from './importComponent';

interface SerializeComponentForBuilderProps {
  componentNode: React.ReactElement;
  path: string;
  index: number;
  item: Schema;
}

const serializeComponentForBuilder = (
  props: SerializeComponentForBuilderProps
) => {
  const { componentNode, index, item, path } = props;

  const componentNodeCopy = { ...componentNode };

  const acceptsChildren = Array.isArray(componentNodeCopy?.props?.children);

  const className: string = componentNodeCopy?.props?.className;

  Object.assign(componentNodeCopy, {
    props: {
      ...componentNodeCopy.props,
      id: generatePath(path, index, item),
      className,
      draggable: true,
      [DATA_LABEL]: item.component,
      [DATA_EDITABLE]: item.editable,
      [DATA_COMPONENT]: true,
      [DATA_DESCRIPTION]: item.description,
      [DATA_DISPLAY_NAME]: item.displayName,
      [DATA_DND_INITIALIZED]: false,
      [DATA_ACCEPTS_CHILDREN]: acceptsChildren,
    },
  });

  return componentNodeCopy;
};

interface SerializeSchemaProps {
  schema: Schema[];
  componentAlias: string;
  componentsArray?: React.ReactElement[];
  serializeForBuilder?: boolean;
  path?: string;
}

const serializeSchema = async (props: SerializeSchemaProps) => {
  const {
    schema,
    componentAlias,
    componentsArray = [],
    path,
    serializeForBuilder,
  } = props;

  const _components = [...componentsArray];

  for (const [index, item] of schema?.entries()) {
    const component = await importComponent(componentAlias, item.component);

    const componentProps = {};

    // If it's the first time serializing this schema, we will add a new data-id to it
    // data-id attribute is used to link components with other components, for selectors, or other business logic
    if (!item.id) {
      item.id = nanoid();
    }

    for (const prop of item.props) {
      if (prop.type !== 'component') {
        Object.assign(componentProps, { [prop.name]: prop.value });
      }

      if (prop.type === 'component') {
        const childComponent = await serializeSchema({
          ...props,
          schema: prop.value as Schema[],
          componentAlias,
          path: generatePath(path, index, item),
        });

        Object.assign(componentProps, { [prop.name]: childComponent });
      }
    }

    let componentNode = component.default(componentProps);

    // if (item.richText) {
    //   const editor = await import('../editor/SlateWrapper');
    //   const componentWithEditor = editor.default({ id: path as string });
    //   componentNode = componentWithEditor;
    // }

    const componentNodeCopy: React.ReactElement = {
      ...componentNode,
      key: `${item.component}_${index}` || '',
      props: {
        ...componentNode.props,
        [DATA_ID]: item.id,
      },
    };

    if (serializeForBuilder) {
      const componentForBuilder = serializeComponentForBuilder({
        componentNode: componentNodeCopy,
        path: path as string,
        index,
        item,
      });
      _components.push(componentForBuilder);
    } else {
      _components.push(componentNodeCopy);
    }
  }

  return _components as unknown as Schema[];
};

export default serializeSchema;

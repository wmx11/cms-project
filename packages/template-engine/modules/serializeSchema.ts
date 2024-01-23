import React from 'react';
import {
  DATA_ACCEPTS_CHILDREN,
  DATA_COMPONENT,
  DATA_DESCRIPTION,
  DATA_DND_INITIALIZED,
  DATA_EDITABLE,
  DATA_LABEL,
  STLYES_ELEMENT_INSIDE_BUILDER,
  STYLES_CONTENT_EDITABLE,
} from '../constants';
import { Props, Schema } from '../types';
import generatePath from './generatePath';
import importComponent from './importComponent';

interface SerializeSchemaProps {
  schema: Schema[];
  templateId: string;
  componentsArray?: React.ReactElement[];
  serializeForBuilder?: boolean;
  path?: string;
}

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

  const className: string = `${
    componentNodeCopy?.props?.className
  } ${'STLYES_ELEMENT_INSIDE_BUILDER'} ${
    item.editable ? `${'STYLES_CONTENT_EDITABLE'} outline-none cursor-text` : ''
  }`;

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
      [DATA_DND_INITIALIZED]: false,
      [DATA_ACCEPTS_CHILDREN]: acceptsChildren,
      ...(item.editable ? { contentEditable: true } : {}),
    },
  });

  return componentNodeCopy;
};

const serializeSchema = async (props: SerializeSchemaProps) => {
  const {
    schema,
    templateId,
    componentsArray = [],
    path,
    serializeForBuilder,
  } = props;

  const _components = [...componentsArray];

  for (const [index, item] of schema?.entries()) {
    const component = await importComponent(templateId, item.component);
    const componentProps: Record<Props['name'], string> = {};

    for (const prop of item.props) {
      if (prop.type !== 'component') {
        Object.assign(componentProps, { [prop.name]: prop.value });
      }

      if (prop.type === 'component') {        
        const childComponent = await serializeSchema({
          ...props,
          schema: prop.value as Schema[],
          templateId,
          path: generatePath(path, index, item),
        });

        Object.assign(componentProps, { [prop.name]: childComponent });
      }
    }

    const componentNode = component.default(componentProps);

    const componentNodeCopy: React.ReactElement = {
      ...componentNode,
      key: `${item.component}_${index}` || '',
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

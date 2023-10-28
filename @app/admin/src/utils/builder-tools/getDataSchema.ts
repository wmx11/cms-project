import { DATA_SCHEMA } from '@cms/template-engine/constants';
import { Schema } from '@cms/template-engine/types';

export const getDataSchemaElement = () => {
  if (typeof window === undefined || typeof document === undefined) {
    return null;
  }

  return document?.querySelector(`[${DATA_SCHEMA}]`);
};

export const getDataSchema = () => {
  const dataSchemaElement = getDataSchemaElement();

  if (!dataSchemaElement) {
    return null;
  }

  try {
    return JSON.parse(
      (dataSchemaElement.getAttribute(DATA_SCHEMA) as string) || '[]'
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setDataSchema = (schema: Schema[]) => {
  const dataSchemaElement = getDataSchemaElement();

  if (!dataSchemaElement) {
    console.error('Cannot find data-schema element');
    return null;
  }

  try {
    dataSchemaElement.setAttribute(DATA_SCHEMA, JSON.stringify(schema || '[]'));
  } catch (error) {
    console.error(error);
    return null;
  }
};

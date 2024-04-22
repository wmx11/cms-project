import serializeSchema from '@cms/packages/tiglee-engine/modules/serializeSchema';
import { Schema } from '@cms/packages/tiglee-engine/types';
import { Component } from '@prisma/client';
import { StateCreator } from 'zustand';
import { SchemaSlice } from './createSchemaSlice';

export type TemplateSlice = {
  componentAlias: string;
  components: Schema[];
  renderedTemplate: Schema[];
  renderTemplate: (schema?: Schema[]) => void;
  setComponentAlias: (componentAlias: string) => void;
};

const createTemplateSlice: StateCreator<TemplateSlice> = (set, get) => ({
  componentAlias: '',
  components: [],
  renderedTemplate: [],
  setComponentAlias: (componentAlias: string) =>
    set(() => ({ componentAlias })),
  renderTemplate: async (schema?: Schema[]) => {
    const _schema = (get() as unknown as SchemaSlice).schema;
    const componentAlias = (get() as unknown as TemplateSlice).componentAlias;

    if (schema) {
      (get() as unknown as SchemaSlice).setSchema(schema);
    }

    const serializedSchema = await serializeSchema({
      schema: schema ? schema : _schema,
      componentAlias,
      serializeForBuilder: true,
    });

    const newRenderedTemplate = [...serializedSchema];

    set(() => ({
      renderedTemplate: newRenderedTemplate,
    }));
  },
});

export default createTemplateSlice;

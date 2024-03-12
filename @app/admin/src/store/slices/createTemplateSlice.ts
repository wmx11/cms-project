import serializeSchema from '@cms/packages/tiglee-engine/modules/serializeSchema';
import { Schema } from '@cms/packages/tiglee-engine/types';
import { Component } from '@prisma/client';
import { StateCreator } from 'zustand';
import { SchemaSlice } from './createSchemaSlice';

export type TemplateSlice = {
  templateId: string;
  templateComponents: Component[];
  renderedTemplate: Schema[];
  renderTemplate: (schema?: Schema[]) => void;
  setTemplateId: (templateId: string) => void;
};

const createTemplateSlice: StateCreator<TemplateSlice> = (set, get) => ({
  templateId: '',
  templateComponents: [],
  renderedTemplate: [],
  setTemplateId: (templateId: string) => set(() => ({ templateId })),
  renderTemplate: async (schema?: Schema[]) => {
    const _schema = (get() as unknown as SchemaSlice).schema;
    const templateId = (get() as unknown as TemplateSlice).templateId;

    if (schema) {
      (get() as unknown as SchemaSlice).setSchema(schema);
    }

    const serializedSchema = await serializeSchema({
      schema: schema ? schema : _schema,
      templateId,
      serializeForBuilder: true,
    });

    const newRenderedTemplate = [...serializedSchema];
    set(() => ({
      renderedTemplate: newRenderedTemplate,
    }));
  },
});

export default createTemplateSlice;

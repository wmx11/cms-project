import { Schema } from '@cms/template-engine/types';
import { Component } from '@prisma/client';
import { StateCreator } from 'zustand';
import { SchemaSlice } from './createSchemaSlice';
import serializeSchema from '@cms/template-engine/modules/serializeSchema';
import { StylesSlice } from './createStylesSlice';

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
      classes: (get() as unknown as StylesSlice).styleSheet?.classes,
    });

    const newRenderedTemplate = [...serializedSchema];
    set(() => ({ renderedTemplate: newRenderedTemplate }));
  },
});

export default createTemplateSlice;

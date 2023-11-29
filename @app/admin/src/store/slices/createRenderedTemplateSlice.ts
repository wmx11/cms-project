import serializeSchema from '@cms/template-engine/modules/serializeSchema';
import { Schema } from '@cms/template-engine/types';
import { StateCreator } from 'zustand';
import { SchemaSlice } from './createSchemaSlice';
import { TemplateSlice } from './createTemplateSlice';
import { StylesSlice } from './createStylesSlice';

export type RenderedTemplateSlice = {
  renderedTemplate: Schema[];
  renderTemplate: (schema?: Schema[]) => void;
};

const createRenderedTemplateSlice: StateCreator<RenderedTemplateSlice> = (
  set,
  get
) => ({
  renderedTemplate: [],
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

export default createRenderedTemplateSlice;

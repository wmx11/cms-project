import serializeSchema from '@cms/template-engine/modules/serializeSchema';
import { Schema } from '@cms/template-engine/types';
import { StateCreator } from 'zustand';
import { SchemaSlice } from './createSchemaSlice';
import { TemplateSlice } from './createTemplateSlice';

export type RenderedTemplateSlice = {
  renderedTemplate: Schema[];
  renderTemplate: () => void;
};

const createRenderedTemplateSlice: StateCreator<RenderedTemplateSlice> = (
  set,
  get
) => ({
  renderedTemplate: [],
  renderTemplate: async () => {
    const schema = (get() as unknown as SchemaSlice).schema;
    const templateId = (get() as unknown as TemplateSlice).templateId;
    const serializedSchema = await serializeSchema({
      schema,
      templateId,
      serializeForBuilder: true,
    });
    const newRenderedTemplate = [...serializedSchema];
    set(() => ({ renderedTemplate: newRenderedTemplate }));
  },
});

export default createRenderedTemplateSlice;

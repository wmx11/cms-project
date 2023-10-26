import { Schema } from '@cms/template-engine/types';
import { StateCreator } from 'zustand';
import { TemplateSlice } from './createTemplateSlice';
import parseSchema from '@cms/template-engine/parseSchema';
import { SchemaSlice } from './createSchemaSlice';

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
    const parsedSchema = await parseSchema({
      schema,
      templateId,
      isBuilder: true,
      componentsArray: [],
    });
    const updatedRenderedTemplate = [...parsedSchema];
    set(() => ({ renderedTemplate: updatedRenderedTemplate }));
  },
});

export default createRenderedTemplateSlice;

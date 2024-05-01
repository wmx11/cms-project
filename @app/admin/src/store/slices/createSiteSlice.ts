import serializeSchema from '@cms/packages/tiglee-engine/modules/serializeSchema';
import { Schema } from '@cms/packages/tiglee-engine/types';
import { StateCreator } from 'zustand';
import { SchemaSlice } from './createSchemaSlice';
import { produce } from 'immer';

export type SiteSlice = {
  initialized: boolean;
  componentAlias: string;
  components: Schema[];
  renderedTemplate: Schema[];
  setInitialized: (initialized: boolean) => void;
  renderTemplate: (schema?: Schema[]) => void;
  setComponentAlias: (componentAlias: string) => void;
};

const createSiteSlice: StateCreator<SiteSlice> = (set, get) => ({
  initialized: false,
  componentAlias: '',
  components: [],
  renderedTemplate: [],
  setInitialized: (initialized: boolean) => set(() => ({ initialized })),
  setComponentAlias: (componentAlias: string) =>
    set(() => ({ componentAlias })),
  renderTemplate: async (schema?: Schema[]) => {
    const _schema = (get() as unknown as SchemaSlice).schema;
    const componentAlias = (get() as unknown as SiteSlice).componentAlias;

    if (schema) {
      (get() as unknown as SchemaSlice).setSchema(schema);
    }

    const serializedSchema = await serializeSchema({
      schema: schema ? schema : _schema,
      componentAlias,
      serializeForBuilder: true,
    });

    const newRenderedTemplate = produce(serializedSchema, (draft) => draft);

    set(() => ({
      renderedTemplate: newRenderedTemplate,
    }));
  },
});

export default createSiteSlice;

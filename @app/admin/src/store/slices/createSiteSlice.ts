import serializeSchema from '@cms/packages/tiglee-engine/modules/serializeSchema';
import { Schema } from '@cms/packages/tiglee-engine/types';
import { StateCreator } from 'zustand';
import { SchemaSlice } from './createSchemaSlice';
import { produce } from 'immer';
import { ReactNode } from 'react';
import { ComponentsList } from '@cms/controllers/component';

export type SiteSlice = {
  initialized: boolean;
  alias: string;
  componentAlias: string;
  components: Schema[];
  renderedTemplate: ReactNode;
  componentsList: ComponentsList;
  setInitialized: (initialized: boolean) => void;
  renderTemplate: (schema?: Schema[]) => void;
  setComponentAlias: (componentAlias: string) => void;
};

const createSiteSlice: StateCreator<SiteSlice> = (set, get) => ({
  initialized: false,
  alias: '',
  componentAlias: '',
  components: [],
  renderedTemplate: [],
  componentsList: [],
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

    const newRenderedTemplate = produce(
      serializedSchema,
      (draft) => draft
    ) as ReactNode;

    set(() => ({
      renderedTemplate: newRenderedTemplate,
    }));
  },
});

export default createSiteSlice;

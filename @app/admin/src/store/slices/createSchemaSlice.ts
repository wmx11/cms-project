import { Schema } from '@cms/template-engine/types';
import { StateCreator } from 'zustand';

export type SchemaSlice = {
  schema: Schema[];
  setSchema: (schema: Schema[]) => void;
};

const createSchemaSlice: StateCreator<SchemaSlice> = (set) => ({
  schema: [],
  setSchema: (schema: Schema[]) =>
    set(() => {
      const updatedSchema = [...schema];
      return {
        schema: updatedSchema,
      };
    }),
});

export default createSchemaSlice;

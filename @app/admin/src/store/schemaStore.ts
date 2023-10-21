import { Schema } from '@cms/template-engine/types';
import { create } from 'zustand';

type SchemaStore = {
  schema: Schema[];
  setSchema: (schema: Schema[]) => void;
};

const useSchemaStore = create<SchemaStore>((set) => {
  return {
    schema: [],
    setSchema: (schema: Schema[]) => set(() => ({ schema })),
  };
});

export default useSchemaStore;

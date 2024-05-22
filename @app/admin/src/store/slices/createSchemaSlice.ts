import traverseComponentsTree from '@cms/packages/tiglee-engine/modules/traverseComponentsTree';
import { Schema } from '@cms/packages/tiglee-engine/types';
import { StateCreator } from 'zustand';

export type SchemaSlice = {
  schema: Schema[];
  selectedElement: HTMLElement | null;
  selectedComponent: Schema | null;
  selectedComonentPath: string;
  setSchema: (schema: Schema[]) => void;
  setSelectedElement: (element: HTMLElement | null) => void;
  setSelectedComponent: (path: string) => void;
  setSelectedComponentPath: (path: string) => void;
  resetSelection: () => void;
};

const createSchemaSlice: StateCreator<SchemaSlice> = (set, get) => ({
  schema: [],
  selectedElement: null,
  selectedComponent: null,
  selectedComonentPath: '',
  setSchema: (schema: Schema[]) =>
    set(() => {
      const updatedSchema = structuredClone(schema);
      return {
        schema: updatedSchema,
      };
    }),
  setSelectedElement: (element: HTMLElement | null) =>
    set(() => ({ selectedElement: element })),
  setSelectedComponent: (path: string) =>
    set(() => {
      const component = traverseComponentsTree({ path, schema: get().schema });
      return {
        selectedComponent: component,
      };
    }),
  setSelectedComponentPath: (path: string) =>
    set(() => ({ selectedComonentPath: path || '' })),
  resetSelection: () =>
    set(() => ({
      selectedElement: null,
      selectedComponent: null,
      selectedComonentPath: '',
    })),
});

export default createSchemaSlice;

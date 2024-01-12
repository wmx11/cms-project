import traverseComponentsTree from '@cms/packages/template-engine/modules/traverseComponentsTree';
import { Schema } from '@cms/packages/template-engine/types';
import { StateCreator } from 'zustand';

export type SchemaSlice = {
  schema: Schema[];
  selectedElement: HTMLElement | null;
  selectedComponent: Schema | null;
  selectedComponentClassName: string | null;
  selectedComponentValue: string | null;
  selectedComonentPath: string;
  setSchema: (schema: Schema[]) => void;
  setSelectedElement: (element: HTMLElement | null) => void;
  setSelectedComponent: (path: string) => void;
  setSelectedComponentPath: (path: string) => void;
  setSelectedComponentClassName: (path: string) => void;
  setSelectedComponentValue: (path: string) => void;
};

const createSchemaSlice: StateCreator<SchemaSlice> = (set, get) => ({
  schema: [],
  selectedElement: null,
  selectedComponent: null,
  selectedComonentPath: '',
  selectedComponentClassName: null,
  selectedComponentValue: null,
  setSchema: (schema: Schema[]) =>
    set(() => {
      const updatedSchema = [...schema];
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
  setSelectedComponentClassName: (selectedComponentClassName: string) =>
    set(() => ({ selectedComponentClassName })),
  setSelectedComponentValue: (selectedComponentValue: string) =>
    set(() => ({ selectedComponentValue })),
});

export default createSchemaSlice;

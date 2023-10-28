import { create, createStore } from 'zustand';
import createSchemaSlice, { SchemaSlice } from './slices/createSchemaSlice';
import createRenderedTemplateSlice, {
  RenderedTemplateSlice,
} from './slices/createRenderedTemplateSlice';
import createTemplateSlice, {
  TemplateSlice,
} from './slices/createTemplateSlice';
import { Schema } from '@cms/template-engine/types';
import { Component } from '@prisma/client';
import { createContext } from 'react';

const useGlobalStore = create<
  SchemaSlice & RenderedTemplateSlice & TemplateSlice
>((...a) => ({
  ...createSchemaSlice(...a),
  ...createRenderedTemplateSlice(...a),
  ...createTemplateSlice(...a),
}));

export default useGlobalStore;

export type BuilderStore = ReturnType<typeof createBuilderStore>;

export type BuilderStoreProps = {
  schema: Schema[];
  templateId: string;
  templateComponents: Component[];
};

export type BuilderStoreState = SchemaSlice &
  RenderedTemplateSlice &
  TemplateSlice;

export const createBuilderStore = (initProps?: BuilderStoreProps) => {
  return createStore<BuilderStoreState>()((...a) => ({
    ...createSchemaSlice(...a),
    ...createRenderedTemplateSlice(...a),
    ...createTemplateSlice(...a),
    ...initProps,
  }));
};

export const BuilderContext = createContext<BuilderStore | null>(null);

import { Schema } from '@cms/template-engine/types';
import { Component } from '@prisma/client';
import { createContext } from 'react';
import { createStore } from 'zustand';
import createActionSlice, { ActionSlice } from './slices/createActionSlice';
import createRenderedTemplateSlice, {
  RenderedTemplateSlice,
} from './slices/createRenderedTemplateSlice';
import createSchemaSlice, { SchemaSlice } from './slices/createSchemaSlice';
import createTemplateSlice, {
  TemplateSlice,
} from './slices/createTemplateSlice';
import createStylesSlice, { StylesSlice } from './slices/createStylesSlice';

export type BuilderStore = ReturnType<typeof createBuilderStore>;

export type BuilderStoreProps = {
  schema: Schema[];
  templateId: string;
  templateComponents: Component[];
};

export type BuilderStoreState = SchemaSlice &
  RenderedTemplateSlice &
  TemplateSlice &
  ActionSlice &
  StylesSlice;

export const createBuilderStore = (initProps?: BuilderStoreProps) => {
  return createStore<BuilderStoreState>()((...a) => ({
    ...createSchemaSlice(...a),
    ...createRenderedTemplateSlice(...a),
    ...createTemplateSlice(...a),
    ...createActionSlice(...a),
    ...createStylesSlice(...a),
    ...initProps,
  }));
};

export const BuilderContext = createContext<BuilderStore | null>(null);

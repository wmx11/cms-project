import { Schema } from '@cms/packages/tiglee-engine/types';
import { StylesObjectWithBreakpoints } from '@cms/tiglee-engine/styles/jssStyles';
import { Component } from '@prisma/client';
import { createContext } from 'react';
import { createStore } from 'zustand';
import createActionSlice, { ActionSlice } from './slices/createActionSlice';
import createSchemaSlice, { SchemaSlice } from './slices/createSchemaSlice';
import createStylesSlice, { StylesSlice } from './slices/createStylesSlice';
import createTemplateSlice, {
  TemplateSlice,
} from './slices/createTemplateSlice';

export type BuilderStore = ReturnType<typeof createBuilderStore>;

export interface BuilderStoreProps {
  styles: StylesObjectWithBreakpoints;
  schema: Schema[];
  componentAlias: string;
  components: Schema[];
}

export type BuilderStoreState = SchemaSlice &
  TemplateSlice &
  ActionSlice &
  StylesSlice;

export const createBuilderStore = (initProps?: BuilderStoreProps) => {
  return createStore<BuilderStoreState>()((...a) => ({
    ...createSchemaSlice(...a),
    ...createTemplateSlice(...a),
    ...createActionSlice(...a),
    ...createStylesSlice(...a),
    ...initProps,
  }));
};

export const BuilderContext = createContext<BuilderStore | null>(null);

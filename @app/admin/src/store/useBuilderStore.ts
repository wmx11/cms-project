import { Schema } from '@cms/packages/tiglee-engine/types';
import { StylesObjectWithBreakpoints } from '@cms/tiglee-engine/styles/jssStyles';
import { createContext } from 'react';
import { createStore } from 'zustand';
import createActionSlice, { ActionSlice } from './slices/createActionSlice';
import createSchemaSlice, { SchemaSlice } from './slices/createSchemaSlice';
import createSiteSlice, { SiteSlice } from './slices/createSiteSlice';
import createStylesSlice, { StylesSlice } from './slices/createStylesSlice';
import createHeaderSlice from './slices/createHeaderSlice';
import createSidebarSlice from './slices/createSidebarSlice';

export interface BuilderStoreProps {
  styles: StylesObjectWithBreakpoints;
  schema: Schema[];
  componentAlias: string;
  components: Schema[];
}

export type BuilderStoreState = SchemaSlice &
  SiteSlice &
  ActionSlice &
  StylesSlice;

export const createBuilderStore = (initProps?: BuilderStoreProps) => {
  return createStore<BuilderStoreState>()((...a) => ({
    ...createSchemaSlice(...a),
    ...createSiteSlice(...a),
    ...createActionSlice(...a),
    ...createStylesSlice(...a),
    ...initProps,
  }));
};

export interface BuilderHeaderStoreProps {
  isPublished: boolean;
  template: {
    name: string;
    description: string | null;
    image: string | null;
  } | null;
}

export const createBuilderHeaderStore = (
  initProps: BuilderHeaderStoreProps
) => {
  return createStore<BuilderHeaderStoreProps>()((...a) => ({
    ...createHeaderSlice(...a),
    ...initProps,
  }));
};

export interface BuilderSidebarStoreProps {
  title: string | null;
  description: string | null;
  icon: string | null;
  image: string | null;
}

export const createBuilderSidebarStore = (
  initProps: BuilderSidebarStoreProps
) => {
  return createStore<BuilderSidebarStoreProps>()((...a) => ({
    ...createSidebarSlice(...a),
    ...initProps,
  }));
};

export type BuilderStore = ReturnType<typeof createBuilderStore>;
export const BuilderContext = createContext<BuilderStore | null>(null);

export type BuilderHeaderStore = ReturnType<typeof createBuilderHeaderStore>;
export const BuilderHeaderContext = createContext<BuilderHeaderStore | null>(
  null
);

export type BuilderSidebarStore = ReturnType<typeof createBuilderSidebarStore>;
export const BuilderSidebarContext = createContext<BuilderSidebarStore | null>(
  null
);

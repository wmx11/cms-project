import { create } from 'zustand';
import createSchemaSlice, { SchemaSlice } from './slices/createSchemaSlice';
import createRenderedTemplateSlice, {
  RenderedTemplateSlice,
} from './slices/createRenderedTemplateSlice';
import createTemplateSlice, {
  TemplateSlice,
} from './slices/createTemplateSlice';

const useGlobalStore = create<
  SchemaSlice & RenderedTemplateSlice & TemplateSlice
>((...a) => ({
  ...createSchemaSlice(...a),
  ...createRenderedTemplateSlice(...a),
  ...createTemplateSlice(...a),
}));

export default useGlobalStore;

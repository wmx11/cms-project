import { StateCreator } from 'zustand';
import { BuilderSidebarStoreProps } from '../useBuilderStore';

export type SidebarSlice = BuilderSidebarStoreProps;

const createSidebarSlice: StateCreator<SidebarSlice> = () => ({
  description: null,
  icon: null,
  image: null,
  title: null,
});

export default createSidebarSlice;

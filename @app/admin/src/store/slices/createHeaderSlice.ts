import { StateCreator } from 'zustand';
import { BuilderHeaderStoreProps } from '../useBuilderStore';

export type HeaderSlice = BuilderHeaderStoreProps;

const createHeaderSlice: StateCreator<HeaderSlice> = () => ({
  isPublished: false,
});

export default createHeaderSlice;

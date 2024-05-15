import { StateCreator } from 'zustand';
import { BuilderHeaderStoreProps } from '../useBuilderStore';

export type HeaderSlice = BuilderHeaderStoreProps;

const createHeaderSlice: StateCreator<HeaderSlice> = () => ({
  isPublished: false,
  template: {
    name: '',
    description: '',
    image: ''
  },
});

export default createHeaderSlice;

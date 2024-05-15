'use client';
import { useContext } from 'react';
import { useStore } from 'zustand';
import {
  BuilderSidebarContext,
  BuilderSidebarStoreProps,
} from '../store/useBuilderStore';

const useBuilderSidebarProviderState = <T>(
  selector: (state: BuilderSidebarStoreProps) => T
): T => {
  const store = useContext(BuilderSidebarContext);

  if (!store)
    throw new Error('Missing BuilderSidebarContext.Provider in the tree');

  const state = useStore(store, selector);

  return state;
};

export default useBuilderSidebarProviderState;

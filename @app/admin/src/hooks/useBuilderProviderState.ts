'use client';
import { useContext } from 'react';
import { useStore } from 'zustand';
import { BuilderContext, BuilderStoreState } from '../store/useBuilderStore';

const useBuilderProviderState = <T>(
  selector: (state: BuilderStoreState) => T
): T => {
  const store = useContext(BuilderContext);

  if (!store) throw new Error('Missing BuilderContext.Provider in the tree');

  const state = useStore(store, selector);

  return state;
};

export default useBuilderProviderState;

'use client';
import { useContext } from 'react';
import { useStore } from 'zustand';
import {
  BuilderHeaderContext,
  BuilderHeaderStoreProps,
} from '../store/useBuilderStore';

const useBuilderHeaderProviderState = <T>(
  selector: (state: BuilderHeaderStoreProps) => T
): T => {
  const store = useContext(BuilderHeaderContext);

  if (!store)
    throw new Error('Missing BuilderHeaderContext.Provider in the tree');

  const state = useStore(store, selector);

  return state;
};

export default useBuilderHeaderProviderState;

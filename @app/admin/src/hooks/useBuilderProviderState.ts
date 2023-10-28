import { useContext } from 'react';
import { useStore } from 'zustand';
import { BuilderContext } from '../store/useGlobalStore';

const useBuilderProviderState = () => {
  const store = useContext(BuilderContext);

  if (!store) throw new Error('Missing BuilderContext.Provider in the tree');

  const state = useStore(store, (s) => s);

  return state;
};

export default useBuilderProviderState;

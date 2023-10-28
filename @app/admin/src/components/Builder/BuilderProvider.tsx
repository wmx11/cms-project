'use client';
import { PropsWithChildren, useRef } from 'react';
import {
  BuilderContext,
  BuilderStore,
  BuilderStoreProps,
  createBuilderStore,
} from '../../store/useGlobalStore';

type BuilderProviderProps = BuilderStoreProps & PropsWithChildren;

const BuilderProvider = ({ children, ...props }: BuilderProviderProps) => {
  const store = useRef<BuilderStore>();

  if (!store.current) {
    store.current = createBuilderStore(props);
  }

  return (
    <BuilderContext.Provider value={store.current}>
      {children}
    </BuilderContext.Provider>
  );
};

export default BuilderProvider;

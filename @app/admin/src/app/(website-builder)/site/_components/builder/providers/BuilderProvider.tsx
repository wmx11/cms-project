'use client';
import {
  BuilderContext,
  BuilderStore,
  BuilderStoreProps,
  createBuilderStore,
} from '@admin/store/useBuilderStore';
import { PropsWithChildren, useRef } from 'react';

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

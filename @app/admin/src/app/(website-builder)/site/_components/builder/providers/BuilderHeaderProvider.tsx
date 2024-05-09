'use client';
import {
  BuilderHeaderContext,
  BuilderHeaderStore,
  BuilderHeaderStoreProps,
  createBuilderHeaderStore,
} from '@admin/store/useBuilderStore';
import { PropsWithChildren, useRef } from 'react';

interface Props extends BuilderHeaderStoreProps, PropsWithChildren {}

const BuilderHeaderProvider = ({ children, ...props }: Props) => {
  const store = useRef<BuilderHeaderStore>();

  if (!store.current) {
    store.current = createBuilderHeaderStore(props);
  }

  return (
    <BuilderHeaderContext.Provider value={store.current}>
      {children}
    </BuilderHeaderContext.Provider>
  );
};

export default BuilderHeaderProvider;

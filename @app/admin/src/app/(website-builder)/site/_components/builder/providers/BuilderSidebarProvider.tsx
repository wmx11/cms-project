'use client';
import {
  BuilderSidebarContext,
  BuilderSidebarStore,
  BuilderSidebarStoreProps,
  createBuilderSidebarStore,
} from '@admin/store/useBuilderStore';
import { PropsWithChildren, useRef } from 'react';

interface Props extends BuilderSidebarStoreProps, PropsWithChildren {}

const BuilderSidebarProvider = ({ children, ...props }: Props) => {
  const store = useRef<BuilderSidebarStore>();

  if (!store.current) {
    store.current = createBuilderSidebarStore(props);
  }

  return (
    <BuilderSidebarContext.Provider value={store.current}>
      {children}
    </BuilderSidebarContext.Provider>
  );
};

export default BuilderSidebarProvider;

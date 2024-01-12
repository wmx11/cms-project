'use client';
import { useServerInsertedHTML } from 'next/navigation';
import { FC, PropsWithChildren, useRef } from 'react';

export const StylesProvider: FC<PropsWithChildren> = ({ children }) => {
  const isInitialized = useRef(false);

  useServerInsertedHTML(() => {
    if (isInitialized.current) {
      return;
    }

    isInitialized.current = true;

    const injectedStyles = (
      <>
        <style data-meta="builder-styles"></style>
      </>
    );

    return injectedStyles;
  });

  return <>{children}</>;
};

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default Providers;

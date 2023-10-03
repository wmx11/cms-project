'use client';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import React, { FC, PropsWithChildren } from 'react';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextUIProvider>
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  );
};

export default Providers;

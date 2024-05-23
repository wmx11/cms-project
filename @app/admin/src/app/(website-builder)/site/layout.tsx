import '@cms/packages/config/global.css';
import Providers from '@admin/components/Providers';
import font from '@admin/utils/fonts';
import { defaultMetadata } from '@admin/utils/metadata';
import { Toaster } from '@cms/ui/components/Toaster';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = defaultMetadata;

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={`overflow-hidden ${font.className}`}>
        <main>
          <Providers>{children}</Providers>
          <Toaster richColors closeButton visibleToasts={3} expand={true} />
        </main>
      </body>
    </html>
  );
};

export default layout;

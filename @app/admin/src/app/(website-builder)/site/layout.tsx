import '@cms/packages/config/global.css';
import { Toaster } from '@cms/ui/components/Toaster';
import Providers from '@admin/components/Providers';
import React from 'react';
import { Roboto } from 'next/font/google';
import { Metadata } from 'next';
import { defaultMetadata } from '@admin/utils/metadata';

const font = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
});

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

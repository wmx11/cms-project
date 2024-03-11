import '@cms/packages/config/global.css';
import { Toaster } from '@cms/ui/components/Toaster';
import Providers from '@admin/components/Providers';
import React from 'react';

import { Roboto } from 'next/font/google';

const inter = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={`overflow-hidden ${inter.className}`}>
        <main>
          <Providers>{children}</Providers>
          <Toaster />
        </main>
      </body>
    </html>
  );
};

export default layout;

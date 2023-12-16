import React from 'react';
import Providers from '@admin/components/Providers';
import '@admin/app/globals.css';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
};

export default layout;

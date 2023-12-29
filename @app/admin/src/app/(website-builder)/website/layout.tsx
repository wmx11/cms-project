import Providers from '@admin/components/Providers';
import '@cms/packages/config/global.css';
import React from 'react';

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

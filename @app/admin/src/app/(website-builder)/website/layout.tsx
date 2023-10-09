import React from 'react';
import Providers from '../../../components/Providers';
import '../../globals.css';

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

import '@cms/packages/config/global.css';
import '@admin/app/global.css';
import Providers from '@admin/components/Providers';
import font from '@admin/utils/fonts';
import { defaultMetadata } from '@admin/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

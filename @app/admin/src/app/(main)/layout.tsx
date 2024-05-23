import '@cms/packages/config/global.css';
import font from '@admin/utils/fonts';
import { defaultMetadata } from '@admin/utils/metadata';
import type { Metadata } from 'next';
import AppShell from '../../components/layout/app-shell';
import Providers from '../../components/Providers';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main>
          <Providers>
            <AppShell>{children}</AppShell>
          </Providers>
        </main>
      </body>
    </html>
  );
}

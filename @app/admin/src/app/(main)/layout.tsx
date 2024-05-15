import '@cms/packages/config/global.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import AppShell from '../../components/layout/app-shell';
import Providers from '../../components/Providers';
import { defaultMetadata } from '@admin/utils/metadata';

const font = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
});

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

import '@cms/packages/config/global.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import AppShell from '../../components/Layout/AppShell';
import Providers from '../../components/Providers';

const inter = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'CMS Project Admin Dashboard',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Providers>
            <AppShell>{children}</AppShell>
          </Providers>
        </main>
      </body>
    </html>
  );
}

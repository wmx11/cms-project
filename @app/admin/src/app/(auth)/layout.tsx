import '@cms/packages/config/global.css';
import Providers from '@admin/components/Providers';
import { Roboto } from 'next/font/google';
import { Metadata } from 'next';
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

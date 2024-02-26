import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

const monaSans = localFont({
  src: [
    {
      path: '../../public/fonts/MonaSans-Medium.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/MonaSans-SemiBold.ttf',
      weight: '600'
    }
  ],
  variable: '--font-mona-sans'
});


export const metadata: Metadata = {
  title: 'NEAR TESTNET Faucet',
  description: 'Use this faucet to request testnet NEAR or provided Fungible Tokens',
  icons: {
    icon: '/svgs/near-faucet-logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} font-sans bg-gradient-to-r from-blue-800 to-pink-500 text-white`}>{children}</body>
    </html>
  );
}

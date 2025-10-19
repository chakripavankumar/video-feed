import './globals.css';
import { Providers } from './Providers'
import React from 'react';

export const metadata = { title: 'Food App' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { APP_NAME } from '@app/contracts';
import './globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Next.js 与 NestJS 的 monorepo 起点。',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

import type { ReactNode } from 'react';

export const metadata = {
  title: 'PAUDIVA',
  description: 'Grow Green. Live Better.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/layout.tsx
import '../styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: 'My Next.js App',
  description: 'Next.js with Clerk, Tailwind, and Express backend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}

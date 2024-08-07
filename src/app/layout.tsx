import SessionWrapper from '@/components/SessionWrapper';
import { ThemeProvider } from '@/components/ThemeProvider';
import SideBar from '@/components/ui.custom/Sidebar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ClothOn',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#22DD99"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 8px #22DD99,0 0 3px #22DD99"
        />
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
              <SideBar />
              <div>{children}</div>
            </div>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}

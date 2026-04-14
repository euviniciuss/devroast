import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/ui/navbar';
import ClarityInit from '@/lib/clarity';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevRoast',
  description: 'Get your code roasted by AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <ClarityInit />
        <Navbar.Root>
          <Navbar.Logo>
            <Navbar.LogoPrompt>&gt;</Navbar.LogoPrompt>
            <Navbar.LogoText>devroast</Navbar.LogoText>
          </Navbar.Logo>
          <Navbar.Spacer />
          <Navbar.Link href="/leaderboard">leaderboard</Navbar.Link>
        </Navbar.Root>
        {children}
      </body>
    </html>
  );
}

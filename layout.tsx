import type { Metadata } from 'next';
import { Fraunces, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import GrainOverlay from '@/components/GrainOverlay';
import CustomCursor from '@/components/CustomCursor';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://d-ramones.com'),
  title: 'D-RAMONES — Two Generations. One Island. One Sound.',
  description:
    'D-RAMONES: two generations of house music born in Ibiza. José and Ilhuan carry a family legacy across the world\u2019s biggest dancefloors.',
  keywords: ['D-RAMONES', 'Ibiza DJ', 'house music', 'José', 'Ilhuan', 'Carnales'],
  openGraph: {
    title: 'D-RAMONES — Two Generations. One Island. One Sound.',
    description: 'A family legacy of house music, born in Ibiza.',
    images: ['/images/duo-silhouette-beachclub.jpeg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'D-RAMONES',
    description: 'Two Generations. One Island. One Sound.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-ink text-paper font-body antialiased selection:bg-paper selection:text-ink">
        <GrainOverlay />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

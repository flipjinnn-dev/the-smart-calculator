import SortCoinsGame from "./sort-coins-client";


export const metadata = {
  title: 'Free Online Coin Sorting & Merge Game for Kids',
  description: 'Play a free online coin sorting and merging game for kids. Sort coins by value, merge stacks, complete levels, and enjoy a fun educational puzzle game.',
  keywords: 'coin sorting game, merge game, kids game, educational game, puzzle game',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/sort-coins',
  },
  openGraph: {
    title: 'Free Online Coin Sorting & Merge Game for Kids',
    description: 'Play a free online coin sorting and merging game for kids. Sort coins by value, merge stacks, complete levels, and enjoy a fun educational puzzle game.',
    url: 'https://www.thesmartcalculator.com/games/sort-coins',
    type: 'website',
    siteName: 'Smart Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Coin Sorting Game',
      },
    ],
  },
};

export default function SortCoinsPage() {
  return <SortCoinsGame />;
}

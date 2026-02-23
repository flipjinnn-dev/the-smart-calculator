import SortCoinsGame from "./sort-coins-client";


export const metadata = {
  title: 'Free Online Coin Sorting & Merge Game for Kids',
  description: 'Play a free online coin sorting and merging game for kids. Sort coins by value, merge stacks, complete levels, and enjoy a fun educational puzzle game.',
  keywords:'',
  alternates:{
    canonical: '/games/sort-coins',
  }
};

export default function SortCoinsPage() {
  return <SortCoinsGame />;
}

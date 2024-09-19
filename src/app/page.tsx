import { ListWardrobe } from '@/components/ui.custom/ListCard';
import TrendingCarousel from '@/components/ui.custom/Trending';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-8 p-6 md:p-10">
      <TrendingCarousel />

      <ListWardrobe />
    </main>
  );
}

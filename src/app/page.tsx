import ListItem from '@/components/ui.custom/ListCard';
import TrendingCarousel from '@/components/ui.custom/Trending';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-8 p-6 md:p-10">
      <TrendingCarousel />
      <ListItem
        button={{
          name: 'Outfit Suggestions',
          href: '#',
        }}
        name="Outfit Suggestions"
      />
      <ListItem
        button={{
          name: 'Wardrobe Management',
          href: '#',
        }}
        name="Wardrobe Management"
      />
    </main>
  );
}

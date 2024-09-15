'use client';
import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import PaginationCustom from '@/components/ui.custom/Pagination';
import { useSearchParams } from 'next/navigation';
import Wardrobe, { ClothForm, FilterWardrobe } from './components/Wardrobe';
const WardrobePage = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  // console.log(tag);
  return (
    <main className="ml-6">
      <BreadcrumbCustom name="Wardrobe" href="wardrobe" />
      <div className="flex flex-row justify-between mr-10">
        <FilterWardrobe />
        <ClothForm />
      </div>
      <Wardrobe tag={tag} />
      <PaginationCustom />
    </main>
  );
};

export default WardrobePage;

'use client';
import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import PaginationCustom from '@/components/ui.custom/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Wardrobe, { ClothForm, FilterWardrobe } from './components/Wardrobe';

const DynamicWardrobe = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  return <Wardrobe tag={tag} />;
};

const WardrobePage = () => {
  return (
    <main className="ml-6">
      <BreadcrumbCustom name="Wardrobe" href="wardrobe" />
      <div className="flex flex-row justify-between mr-10">
        <FilterWardrobe />
        <ClothForm />
      </div>
      <Suspense
        fallback={
          <div className="aspect-[4/3] ">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col h-full space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
              <div className="flex flex-col h-full space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <DynamicWardrobe />
      </Suspense>
      <PaginationCustom />
    </main>
  );
};

export default WardrobePage;

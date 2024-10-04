'use client';
import { useSearchParams } from 'next/navigation';
import ListPost, {PostSkeleton} from './components/ListPost';
import {BreadcrumbCustom} from "@/components/ui.custom/Breadcrumb";
import {Skeleton} from "@/components/ui/skeleton";
import {Suspense} from "react";

const DynamicCommunity = () => {
    const searchParams = useSearchParams();
    const tag = searchParams.get('tag');
    const page = Number(searchParams.get('page') ?? 1);
    return <ListPost page={page !== 0 ? page : 1} />;
}


const Community = () => {
    const link = useSearchParams();
    // const tag = link.get('tag') ?? null;
    // const page = parseInt*link.get('page') ?? 1;
    // const page = Number(link.get('page') !== 0 ? link.get('page') : 1) ?? 1;
    const page = Number(link.get('page') ?? 1);
  return (
    <main className="flex flex-col h-full ml-6">
        <BreadcrumbCustom name="Community" href="community" />
        <Suspense
            fallback={
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({length: 6}, (_, i) => (
                        <PostSkeleton key={i} index={i}/>
                    ))}
                </div>
            }
        >
            <DynamicCommunity/>
        </Suspense>
        {/*<h1 className="font-bold italic text-3xl">Coming soon!</h1>*/}
    </main>
  );
};
export default Community;

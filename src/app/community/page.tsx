'use client';
import { useSearchParams } from 'next/navigation';
import ListPost from './components/ListPost';
import {BreadcrumbCustom} from "@/components/ui.custom/Breadcrumb";

const Community = () => {
    const link = useSearchParams();
    const tag = link.get('tag') ?? null;
    // const page = parseInt*link.get('page') ?? 1;
    // const page = Number(link.get('page') !== 0 ? link.get('page') : 1) ?? 1;
    const page = Number(link.get('page') ?? 1);
  return (
    <main className="flex flex-col h-full ml-6">
        <BreadcrumbCustom name="Community" href="community" />
        <ListPost page={page !== 0 ? page : 1} />
      {/*<h1 className="font-bold italic text-3xl">Coming soon!</h1>*/}
    </main>
  );
};
export default Community;

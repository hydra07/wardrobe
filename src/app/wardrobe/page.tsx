import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import PaginationCustom from '@/components/ui.custom/Pagination';
import Wardrobe, { AddCloth, FilterWardrobe } from './components/Wardrobe';

export default () => {
  return (
    <main className="ml-6">
      <BreadcrumbCustom name="Wardrobe" href="wardrobe" />
      <div className="flex flex-row justify-between mr-10">
        <FilterWardrobe />
        <AddCloth />
      </div>
      <Wardrobe />
      <PaginationCustom />
    </main>
  );
};

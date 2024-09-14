import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import PaginationCustom from '@/components/ui.custom/Pagination';
import Wardrobe, { ClothForm, FilterWardrobe } from './components/Wardrobe';
const WardrobePage = () => {
  return (
    <main className="ml-6">
      <BreadcrumbCustom name="Wardrobe" href="wardrobe" />
      <div className="flex flex-row justify-between mr-10">
        <FilterWardrobe />
        <ClothForm />
      </div>
      <Wardrobe />
      <PaginationCustom />
    </main>
  );
};

export default WardrobePage;

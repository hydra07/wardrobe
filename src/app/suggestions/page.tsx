import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import InfiniteScrollSuggestion from './components/InfinityScroll';

export default () => {
  return (
    <main className="ml-6 grid grid-rows-[auto_1fr] h-screen">
      <BreadcrumbCustom name="Suggestion" href="suggestion" />
      <div className="overflow-y-auto">
        <InfiniteScrollSuggestion />
      </div>
    </main>
  );
};

import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import Feed from './components/Feed';

export default function SuggestionsPage() {
  return (
    <main className="ml-6 grid grid-rows-[auto_1fr] h-screen">
      <BreadcrumbCustom name="Suggestion" href="suggestion" />
      <div className="overflow-y-auto pb-5 rounded-sm">
        <Feed />
      </div>
    </main>
  );
}

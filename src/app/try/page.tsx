import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import Room from './components/Room';
const TryPage = () => {
  return (
    <main className="ml-6 grid grid-rows-[auto_1fr] h-screen">
      <BreadcrumbCustom name="Try On" href="try" />
      <div>
        <Room />
      </div>
    </main>
  );
};

export default TryPage;

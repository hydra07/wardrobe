import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import UserWrapper from '@/components/UserWrapper';
import Room from './components/Room';
const TryPage = () => {
  return (
    <main className="ml-6 grid grid-rows-[auto_1fr] h-screen">
      <BreadcrumbCustom name="Try On" href="try" />
      <UserWrapper>
        <Room />
      </UserWrapper>
    </main>
  );
};

export default TryPage;

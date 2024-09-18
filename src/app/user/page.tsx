import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import PremiumPlans from './components/PremiumPlans';
import UserProfile from './components/UserProfile';

export default function User() {
  return (
    <>
      <main className="ml-6">
        <BreadcrumbCustom name="User" href="user" />
        <div className="container mx-auto p-4 space-y-8">
          <UserProfile />
          <PremiumPlans />
        </div>
      </main>
    </>
  );
}

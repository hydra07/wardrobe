import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';
import UserWrapper from '@/components/UserWrapper';
import PremiumPlans from './components/PremiumPlans';
import UserProfile from './components/UserProfile';

export default function User() {
  return (
    <>
      <main className="ml-6">
        <BreadcrumbCustom name="User" href="user" />
        <UserWrapper>
          <div className="container mx-auto p-4 space-y-8">
            <UserProfile />
            {/* <UpdatePhoto /> */}
            <PremiumPlans />
          </div>
        </UserWrapper>
      </main>
    </>
  );
}

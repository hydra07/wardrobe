import { BreadcrumbCustom } from '@/components/ui.custom/Breadcrumb';

export default function User() {
  return (
    <>
      <main className="ml-6">
        <BreadcrumbCustom name="User" href="user" />
        <div></div>
      </main>
    </>
  );
}

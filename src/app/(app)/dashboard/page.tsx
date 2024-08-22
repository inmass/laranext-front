import DefaultLayout from '@/components/layouts/dashboard/DefaultLayout';
import DashboardBreadcrumb from '@/components/layouts/DashboardBreadcrumb';

export const metadata = {
  title: 'Laravel - Dashboard',
};

const breadcrumbItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Overview' },
];

const Dashboard = () => {
  return (
    <>
      <DashboardBreadcrumb items={breadcrumbItems} />
      <DefaultLayout
        title="Dashboard"
        description="Manage your products and view their sales performance."
      >
        You are logged in!
      </DefaultLayout>
    </>
  );
};

export default Dashboard;

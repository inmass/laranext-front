import CardLayout from '@/components/layouts/card-layout';
import DashboardBreadcrumb from '@/components/layouts/dashboard-breadcrumb';

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
      <CardLayout
        title="Dashboard"
        description="Manage your products and view their sales performance."
      >
        You are logged in!
      </CardLayout>
    </>
  );
};

export default Dashboard;

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardBreadcrumbProps {
  items: BreadcrumbItem[];
}

const DashboardBreadcrumb: React.FC<DashboardBreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index < items.length - 1 ? (
              <BreadcrumbLink asChild>
                <Link href={item.href || '#'}>{item.label}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
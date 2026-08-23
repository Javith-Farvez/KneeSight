export interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
  description?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

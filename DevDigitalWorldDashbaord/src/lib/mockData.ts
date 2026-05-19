// ─── Mock Data for DevDigitalWorld Dashboard ─────────────────────────────────

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';

export const PROCESS_STAGES = [
  'Requirements',
  'Design',
  'Development',
  'Review',
  'Testing',
  'Delivered',
  'On Hold',
] as const;

export type ProcessStage = typeof PROCESS_STAGES[number];

export interface Order {
  id: string;
  service: string;
  status: OrderStatus;
  stage: ProcessStage;
  date: string;
  amount: string;
  client: string;
  driveLink: string;
}

export interface StatCard {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  change: string;
  changePositive: boolean;
  icon: string;
  color: string;
}

// ─── Orders Table Data ────────────────────────────────────────────────────────
export const mockOrders: Order[] = [
  {
    id: '#DDW-0041',
    service: 'Web Development',
    status: 'Completed',
    stage: 'Delivered',
    date: 'May 01, 2026',
    amount: '$4,800',
    client: 'Apex Corp',
    driveLink: 'https://drive.google.com',
  },
  {
    id: '#DDW-0042',
    service: 'UI/UX Design',
    status: 'In Progress',
    stage: 'Design',
    date: 'May 02, 2026',
    amount: '$2,200',
    client: 'NovaTech',
    driveLink: 'https://drive.google.com',
  },
  {
    id: '#DDW-0043',
    service: 'SEO Optimization',
    status: 'Pending',
    stage: 'Requirements',
    date: 'May 03, 2026',
    amount: '$950',
    client: 'Bluewater Co.',
    driveLink: '',
  },
  {
    id: '#DDW-0044',
    service: 'Mobile App',
    status: 'In Progress',
    stage: 'Development',
    date: 'May 03, 2026',
    amount: '$7,500',
    client: 'PulseWave',
    driveLink: 'https://drive.google.com',
  },
  {
    id: '#DDW-0045',
    service: 'Brand Identity',
    status: 'Completed',
    stage: 'Delivered',
    date: 'Apr 28, 2026',
    amount: '$1,600',
    client: 'Orion Labs',
    driveLink: 'https://drive.google.com',
  },
  {
    id: '#DDW-0046',
    service: 'E-Commerce Setup',
    status: 'Pending',
    stage: 'Requirements',
    date: 'May 04, 2026',
    amount: '$3,300',
    client: 'ShopSphere',
    driveLink: '',
  },
  {
    id: '#DDW-0047',
    service: 'Social Media Mgmt',
    status: 'In Progress',
    stage: 'Review',
    date: 'May 05, 2026',
    amount: '$800',
    client: 'Zenith Group',
    driveLink: 'https://drive.google.com',
  },
  {
    id: '#DDW-0048',
    service: 'Web Development',
    status: 'Cancelled',
    stage: 'On Hold',
    date: 'Apr 30, 2026',
    amount: '$2,900',
    client: 'Matrix Retail',
    driveLink: '',
  },
  {
    id: '#DDW-0049',
    service: 'Content Strategy',
    status: 'Completed',
    stage: 'Delivered',
    date: 'May 05, 2026',
    amount: '$1,100',
    client: 'Verdant Media',
    driveLink: 'https://drive.google.com',
  },
  {
    id: '#DDW-0050',
    service: 'Analytics Setup',
    status: 'Pending',
    stage: 'Requirements',
    date: 'May 06, 2026',
    amount: '$600',
    client: 'DataStream Inc.',
    driveLink: '',
  },
];

// ─── Stat Cards Data ──────────────────────────────────────────────────────────
export const statCards: StatCard[] = [
  {
    id: 'total-orders',
    label: 'Total Orders',
    value: 142,
    change: '+12% this month',
    changePositive: true,
    icon: 'ShoppingBag',
    color: 'indigo',
  },
  {
    id: 'active-projects',
    label: 'Active Projects',
    value: 8,
    change: '+2 this week',
    changePositive: true,
    icon: 'Layers',
    color: 'violet',
  },
  {
    id: 'pending-requests',
    label: 'Pending Requests',
    value: 23,
    change: '-4 from last week',
    changePositive: false,
    icon: 'Clock',
    color: 'amber',
  },
  {
    id: 'completed',
    label: 'Completed',
    value: 111,
    change: '+18% all time',
    changePositive: true,
    icon: 'CheckCircle',
    color: 'green',
  },
];

// ─── Service Types ────────────────────────────────────────────────────────────
export const serviceTypes = [
  'Web Development',
  'UI/UX Design',
  'Mobile App Development',
  'Brand Identity & Logo',
  'SEO Optimization',
  'E-Commerce Setup',
  'Social Media Management',
  'Content Strategy',
  'Analytics & Reporting',
  'Custom Software',
];

// ─── Sidebar Nav Items ────────────────────────────────────────────────────────
export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
  { id: 'orders', label: 'Projects', icon: 'ShoppingBag', href: '/dashboard' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/dashboard' },
];

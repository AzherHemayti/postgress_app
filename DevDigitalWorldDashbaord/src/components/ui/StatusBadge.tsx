import { OrderStatus } from '@/lib/mockData';

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  Pending: { label: 'Pending', className: 'badge-pending' },
  'In Progress': { label: 'In Progress', className: 'badge-inprogress' },
  Completed: { label: 'Completed', className: 'badge-completed' },
  Cancelled: { label: 'Cancelled', className: 'badge-cancelled' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={config.className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.625rem',
        borderRadius: '99px',
        fontSize: '0.75rem',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: 'currentColor',
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {config.label}
    </span>
  );
}

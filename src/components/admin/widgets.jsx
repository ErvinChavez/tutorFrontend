
export function Chip({ tone = 'neutral', children }) {
  return <span className={`chip chip--${tone}`}>{children}</span>;
}


export function DataState({ loading, error, empty, emptyText, children }) {
  if (loading) return <p className="admin__hint">Loading…</p>;
  if (error)
    return (
      <div className="alert alert--error">
        We couldn't load this. {error.message}
      </div>
    );
  if (empty) return <div className="admin__empty">{emptyText}</div>;
  return children;
}

export const requestTone = (status) =>
  ({ PENDING: 'warning', ACCEPTED: 'positive', DECLINED: 'negative' }[status] ||
  'neutral');

export const paymentTone = (status) =>
  ({ PAID: 'positive', UNPAID: 'warning', OVERDUE: 'negative' }[status] ||
  'neutral');
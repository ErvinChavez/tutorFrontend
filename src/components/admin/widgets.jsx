// Small shared building blocks for the dashboard views.

export function Chip({ tone = 'neutral', children }) {
  return <span className={`chip chip--${tone}`}>{children}</span>;
}

// Wraps a list/grid with consistent loading, error, and empty states so each
// view doesn't reinvent them.
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

// Map domain statuses to chip tones (kept here so it's consistent everywhere).
export const requestTone = (status) =>
  ({ PENDING: 'warning', ACCEPTED: 'positive', DECLINED: 'negative' }[status] ||
  'neutral');

export const paymentTone = (status) =>
  ({ PAID: 'positive', UNPAID: 'warning', OVERDUE: 'negative' }[status] ||
  'neutral');
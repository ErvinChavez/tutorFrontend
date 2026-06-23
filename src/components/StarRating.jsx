// A single five-point star. `filled` toggles the brass fill vs. outline.
export function Star({ filled = true, size = 18 }) {
  return (
    <svg
      className={filled ? 'star' : 'star star--empty'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.8 6.1 21.2l1.3-6.6L2.5 9.9l6.6-.8z" />
    </svg>
  );
}

// A read-only row of five stars reflecting a rating (1–5).
export default function StarRating({ rating = 0, size = 18 }) {
  return (
    <span
      className="review-card__stars"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rating} size={size} />
      ))}
    </span>
  );
}
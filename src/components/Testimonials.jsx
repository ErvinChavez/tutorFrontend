import { useQuery } from '@apollo/client';

import { APPROVED_TESTIMONIALS } from '../graphql/operations.js';
import StarRating from './StarRating.jsx';

export default function Testimonials() {
  const { data, loading, error } = useQuery(APPROVED_TESTIMONIALS);
  const reviews = data?.approvedTestimonials ?? [];

  return (
    <section className="section" id="reviews">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">In their words</span>
          <h2>What families say</h2>
          <p>
            Reviews from parents whose children we've worked with. Every one is
            from a real family who chose to share it publicly.
          </p>
        </div>

        {loading && <p className="form-note">Loading reviews…</p>}

        {error && (
          <div className="alert alert--error">
            We couldn't load reviews just now. Please try again shortly.
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="reviews-empty">
            No reviews are published yet — be the first to share your
            experience using the form below.
          </div>
        )}

        {reviews.length > 0 && (
          <div className="reviews-grid">
            {reviews.map((r) => (
              <article className="review-card" key={r._id}>
                <StarRating rating={r.rating} />
                <p className="review-card__msg">“{r.message}”</p>
                <p className="review-card__author">— {r.parentAuthor}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
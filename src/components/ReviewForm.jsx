import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { SUBMIT_TESTIMONIAL } from '../graphql/operations.js';
import { Star } from './StarRating.jsx';

export default function ReviewForm() {
  const [parentAuthor, setParentAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [result, setResult] = useState(null);

  const [submit, { loading, error }] = useMutation(SUBMIT_TESTIMONIAL);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1) return;
    try {
      const { data } = await submit({
        variables: { input: { parentAuthor, message, rating } },
      });
      setResult(data.submitTestimonial);
    } catch {
      // surfaced via `error`
    }
  };

  // After submitting, show a response shaped by the rating the backend routed.
  if (result) {
    return (
      <section className="section" id="leave-review">
        <div className="shell">
          <div className="form-card" style={{ maxWidth: '40rem', margin: '0 auto' }}>
            <div className="result">
              <div className="result__seal" aria-hidden="true">
                <Star filled size={26} />
              </div>
              <h3>Thank you</h3>
              <p>{result.followUpMessage}</p>

              {result.invitePublicReview && result.publicReviewUrl && (
                <a
                  className="btn btn--brass"
                  href={result.publicReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share it on Google
                </a>
              )}

              <p className="form-note" style={{ marginTop: '1.4rem' }}>
                Your note has been sent to us and will appear on the site once
                it's reviewed.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="leave-review">
      <div className="shell">
        <div className="form-card" style={{ maxWidth: '40rem', margin: '0 auto' }}>
          <span className="eyebrow">Worked with us?</span>
          <h2 style={{ fontSize: '1.9rem', marginTop: '0.8rem' }}>
            Leave a review
          </h2>
          <p style={{ color: 'var(--ink-soft)', margin: '0.8rem 0 1.6rem' }}>
            We read every piece of feedback — the glowing and the critical
            alike.
          </p>

          <form onSubmit={onSubmit} noValidate>
            {error && (
              <div className="alert alert--error">
                We couldn't submit your review. Please try again.
              </div>
            )}

            <div className="field">
              <label className="label">Your rating</label>
              <div
                className="star-input"
                onMouseLeave={() => setHover(0)}
                role="radiogroup"
                aria-label="Rating out of five"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  >
                    <Star filled={n <= (hover || rating)} size={28} />
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="rv-name">
                Your name
              </label>
              <input
                id="rv-name"
                className="input"
                value={parentAuthor}
                onChange={(e) => setParentAuthor(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="rv-msg">
                Your review
              </label>
              <textarea
                id="rv-msg"
                className="textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What was your experience like?"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading || rating < 1}
              style={{ width: '100%' }}
            >
              {loading ? 'Submitting…' : 'Submit review'}
            </button>
            {rating < 1 && (
              <p className="form-note">Pick a star rating to continue.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
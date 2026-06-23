import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import {
  ALL_TESTIMONIALS,
  SET_TESTIMONIAL_APPROVAL,
} from '../../graphql/admin.js';
import { Chip, DataState } from '../../components/admin/widgets.jsx';
import StarRating from '../../components/StarRating.jsx';

const FILTERS = [
  ['pending', 'Pending'],
  ['approved', 'Published'],
  ['all', 'All'],
];

export default function TestimonialsView() {
  const [filter, setFilter] = useState('pending');
  const [actingId, setActingId] = useState(null);

  const { data, loading, error, refetch } = useQuery(ALL_TESTIMONIALS, {
    fetchPolicy: 'cache-and-network',
  });
  const [setApproval] = useMutation(SET_TESTIMONIAL_APPROVAL);

  const all = data?.allTestimonials ?? [];
  const list = all.filter((t) =>
    filter === 'all' ? true : filter === 'approved' ? t.isApproved : !t.isApproved
  );

  const toggle = async (id, value) => {
    setActingId(id);
    try {
      await setApproval({ variables: { id, isApproved: value } });
      await refetch();
    } finally {
      setActingId(null);
    }
  };

  return (
    <section>
      <div className="admin__head">
        <div>
          <h1 className="admin__title">Testimonials</h1>
          <p className="admin__sub">
            Approve a review to publish it. Nothing appears on the site until
            you do.
          </p>
        </div>
      </div>

      <div className="seg">
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            className={'seg__btn' + (filter === key ? ' is-active' : '')}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <DataState
        loading={loading && !data}
        error={error}
        empty={!loading && list.length === 0}
        emptyText="Nothing here right now."
      >
        <div className="cardlist">
          {list.map((t) => (
            <article className="admin-card" key={t._id}>
              <div className="admin-card__top">
                <StarRating rating={t.rating} />
                <Chip tone={t.isApproved ? 'positive' : 'warning'}>
                  {t.isApproved ? 'Published' : 'Pending'}
                </Chip>
              </div>

              <p className="admin-card__note">“{t.message}”</p>
              <p className="admin-card__byline">— {t.parentAuthor}</p>

              <div className="admin-card__actions">
                {t.isApproved ? (
                  <button
                    className="btn btn--ghost"
                    disabled={actingId === t._id}
                    onClick={() => toggle(t._id, false)}
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    className="btn btn--primary"
                    disabled={actingId === t._id}
                    onClick={() => toggle(t._id, true)}
                  >
                    Approve & publish
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </DataState>
    </section>
  );
}
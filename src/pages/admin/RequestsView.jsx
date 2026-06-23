import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import {
  GET_REQUESTS,
  UPDATE_REQUEST_STATUS,
  CONVERT_REQUEST_TO_STUDENT,
  GET_STUDENTS,
} from '../../graphql/admin.js';
import { Chip, DataState, requestTone } from '../../components/admin/widgets.jsx';

const FILTERS = [
  ['ALL', 'All'],
  ['PENDING', 'Pending'],
  ['ACCEPTED', 'Accepted'],
  ['DECLINED', 'Declined'],
];

export default function RequestsView() {
  const [filter, setFilter] = useState('ALL');
  const [actingId, setActingId] = useState(null);
  const [notice, setNotice] = useState(null);

  const { data, loading, error, refetch } = useQuery(GET_REQUESTS, {
    fetchPolicy: 'cache-and-network',
  });
  const [updateStatus] = useMutation(UPDATE_REQUEST_STATUS);
  // Refetch the students list too, so a freshly-created student shows up there.
  const [convert] = useMutation(CONVERT_REQUEST_TO_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const requests = (data?.requests ?? []).filter(
    (r) => filter === 'ALL' || r.status === filter
  );

  const decline = async (id) => {
    setActingId(id);
    setNotice(null);
    try {
      await updateStatus({ variables: { id, status: 'DECLINED' } });
      await refetch();
    } catch (e) {
      setNotice({ type: 'error', text: e.message });
    } finally {
      setActingId(null);
    }
  };

  const accept = async (id, studentName) => {
    setActingId(id);
    setNotice(null);
    try {
      await convert({ variables: { requestId: id } });
      await refetch();
      setNotice({
        type: 'success',
        text: `Accepted — a student profile for ${studentName} was created.`,
      });
    } catch (e) {
      setNotice({ type: 'error', text: e.message });
    } finally {
      setActingId(null);
    }
  };

  return (
    <section>
      <div className="admin__head">
        <div>
          <h1 className="admin__title">Requests</h1>
          <p className="admin__sub">
            Review incoming requests and turn the right ones into students.
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

      {notice && (
        <div className={`alert alert--${notice.type}`} style={{ marginTop: '1rem' }}>
          {notice.text}
        </div>
      )}

      <DataState
        loading={loading && !data}
        error={error}
        empty={!loading && requests.length === 0}
        emptyText="No requests in this view yet."
      >
        <div className="cardlist">
          {requests.map((r) => (
            <article className="admin-card" key={r._id}>
              <div className="admin-card__top">
                <div>
                  <h3 className="admin-card__title">{r.studentName}</h3>
                  <p className="admin-card__meta">
                    {r.subject}
                    {r.gradeLevel ? ` · ${r.gradeLevel}` : ''}
                  </p>
                </div>
                <Chip tone={requestTone(r.status)}>{r.status}</Chip>
              </div>

              <dl className="kv">
                <div>
                  <dt>Parent</dt>
                  <dd>{r.parentName}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${r.email}`}>{r.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{r.phone}</dd>
                </div>
              </dl>

              {r.message && <p className="admin-card__note">“{r.message}”</p>}

              {r.status === 'PENDING' && (
                <div className="admin-card__actions">
                  <button
                    className="btn btn--primary"
                    disabled={actingId === r._id}
                    onClick={() => accept(r._id, r.studentName)}
                  >
                    {actingId === r._id ? 'Working…' : 'Accept & create student'}
                  </button>
                  <button
                    className="btn btn--ghost"
                    disabled={actingId === r._id}
                    onClick={() => decline(r._id)}
                  >
                    Decline
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </DataState>
    </section>
  );
}
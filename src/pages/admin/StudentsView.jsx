import { useQuery } from '@apollo/client';

import { GET_STUDENTS } from '../../graphql/admin.js';
import { Chip, DataState } from '../../components/admin/widgets.jsx';

export default function StudentsView() {
  const { data, loading, error } = useQuery(GET_STUDENTS, {
    fetchPolicy: 'cache-and-network',
  });
  const students = data?.students ?? [];

  return (
    <section>
      <div className="admin__head">
        <div>
          <h1 className="admin__title">Students</h1>
          <p className="admin__sub">Active student profiles.</p>
        </div>
      </div>

      <DataState
        loading={loading && !data}
        error={error}
        empty={!loading && students.length === 0}
        emptyText="No active students yet. Accept a request to create one."
      >
        <div className="cardlist">
          {students.map((s) => (
            <article className="admin-card" key={s._id}>
              <div className="admin-card__top">
                <div>
                  <h3 className="admin-card__title">{s.name}</h3>
                  <p className="admin-card__meta">
                    {s.gradeLevel || 'Grade not set'}
                  </p>
                </div>
                <Chip tone={s.isActive ? 'positive' : 'neutral'}>
                  {s.isActive ? 'Active' : 'Inactive'}
                </Chip>
              </div>

              {s.subjects?.length > 0 && (
                <div className="taglist">
                  {s.subjects.map((sub, i) => (
                    <span className="tag" key={i}>
                      {sub}
                    </span>
                  ))}
                </div>
              )}

              <dl className="kv">
                <div>
                  <dt>Parent</dt>
                  <dd>{s.parentName}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${s.parentEmail}`}>{s.parentEmail}</a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{s.parentPhone}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </DataState>
    </section>
  );
}
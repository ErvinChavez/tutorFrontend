import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import {
  GET_SESSIONS,
  GET_UNPAID_SESSIONS,
  GET_STUDENTS,
  CREATE_SESSION,
  UPDATE_SESSION_PAYMENT,
} from '../../graphql/admin.js';
import { Chip, DataState, paymentTone } from '../../components/admin/widgets.jsx';

const PAYMENTS = ['PAID', 'UNPAID', 'OVERDUE'];
const EMPTY_FORM = {
  studentId: '',
  date: '',
  durationMinutes: '',
  subject: '',
  notes: '',
};

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function SessionsView() {
  const [tab, setTab] = useState('all'); // 'all' | 'unpaid'
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState(null);
  const [actingId, setActingId] = useState(null);

  const allQ = useQuery(GET_SESSIONS, { fetchPolicy: 'cache-and-network' });
  const unpaidQ = useQuery(GET_UNPAID_SESSIONS, {
    fetchPolicy: 'cache-and-network',
  });
  const studentsQ = useQuery(GET_STUDENTS);

  const [createSession, { loading: creating }] = useMutation(CREATE_SESSION);
  const [updatePayment] = useMutation(UPDATE_SESSION_PAYMENT);

  const active = tab === 'all' ? allQ : unpaidQ;
  const sessions =
    tab === 'all'
      ? allQ.data?.sessions ?? []
      : unpaidQ.data?.unpaidSessions ?? [];
  const students = studentsQ.data?.students ?? [];

  const refreshLists = () => Promise.all([allQ.refetch(), unpaidQ.refetch()]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!form.studentId) {
      setFormError('Choose a student first.');
      return;
    }
    const input = {
      studentId: form.studentId,
      ...(form.date ? { date: form.date } : {}),
      ...(form.durationMinutes
        ? { durationMinutes: Number(form.durationMinutes) }
        : {}),
      ...(form.subject ? { subject: form.subject } : {}),
      ...(form.notes ? { notes: form.notes } : {}),
    };
    try {
      await createSession({ variables: { input } });
      setForm(EMPTY_FORM);
      await refreshLists();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const changePayment = async (id, status) => {
    setActingId(id);
    try {
      await updatePayment({ variables: { id, paymentStatus: status } });
      await refreshLists();
    } finally {
      setActingId(null);
    }
  };

  return (
    <section>
      <div className="admin__head">
        <div>
          <h1 className="admin__title">Sessions</h1>
          <p className="admin__sub">Schedule lessons and track payments.</p>
        </div>
      </div>

      {/* Schedule a session */}
      <div className="admin-panel">
        <h2 className="admin-panel__title">Schedule a session</h2>
        {formError && <div className="alert alert--error">{formError}</div>}

        <form onSubmit={submit}>
          <div className="field">
            <label className="label" htmlFor="se-student">
              Student
            </label>
            <select
              id="se-student"
              name="studentId"
              className="select"
              value={form.studentId}
              onChange={update}
              required
            >
              <option value="">Select a student…</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                  {s.gradeLevel ? ` — ${s.gradeLevel}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="field--row">
            <div className="field">
              <label className="label" htmlFor="se-date">
                Date & time
              </label>
              <input
                id="se-date"
                name="date"
                type="datetime-local"
                className="input"
                value={form.date}
                onChange={update}
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="se-dur">
                Duration (minutes)
              </label>
              <input
                id="se-dur"
                name="durationMinutes"
                type="number"
                min="0"
                className="input"
                value={form.durationMinutes}
                onChange={update}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="se-subj">
              Subject
            </label>
            <input
              id="se-subj"
              name="subject"
              className="input"
              value={form.subject}
              onChange={update}
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="se-notes">
              Notes
            </label>
            <textarea
              id="se-notes"
              name="notes"
              className="textarea"
              value={form.notes}
              onChange={update}
            />
          </div>

          <button
            className="btn btn--primary"
            disabled={creating || students.length === 0}
          >
            {creating ? 'Scheduling…' : 'Schedule session'}
          </button>
          {students.length === 0 && (
            <p className="form-note">
              Add a student first (accept a request) before scheduling.
            </p>
          )}
        </form>
      </div>

      {/* All vs. unpaid */}
      <div className="seg" style={{ marginTop: '1.75rem' }}>
        <button
          className={'seg__btn' + (tab === 'all' ? ' is-active' : '')}
          onClick={() => setTab('all')}
        >
          All sessions
        </button>
        <button
          className={'seg__btn' + (tab === 'unpaid' ? ' is-active' : '')}
          onClick={() => setTab('unpaid')}
        >
          Unpaid / overdue
        </button>
      </div>

      <DataState
        loading={active.loading && !active.data}
        error={active.error}
        empty={!active.loading && sessions.length === 0}
        emptyText={
          tab === 'all'
            ? 'No sessions scheduled yet.'
            : 'Nothing outstanding — all caught up.'
        }
      >
        <div className="cardlist" style={{ marginTop: '1.25rem' }}>
          {sessions.map((se) => (
            <article className="admin-card" key={se._id}>
              <div className="admin-card__top">
                <div>
                  <h3 className="admin-card__title">
                    {se.student?.name || 'Unknown student'}
                  </h3>
                  <p className="admin-card__meta">
                    {formatDate(se.date)}
                    {se.durationMinutes ? ` · ${se.durationMinutes} min` : ''}
                    {se.subject ? ` · ${se.subject}` : ''}
                  </p>
                </div>
                <Chip tone={paymentTone(se.paymentStatus)}>
                  {se.paymentStatus}
                </Chip>
              </div>

              {se.notes && <p className="admin-card__note">{se.notes}</p>}

              <div className="admin-card__actions">
                <span className="admin-card__actionlabel">Mark as</span>
                {PAYMENTS.map((p) => (
                  <button
                    key={p}
                    className={
                      'pill' + (se.paymentStatus === p ? ' is-current' : '')
                    }
                    disabled={actingId === se._id || se.paymentStatus === p}
                    onClick={() => changePayment(se._id, p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </DataState>
    </section>
  );
}
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { SUBMIT_TUTORING_REQUEST } from '../graphql/operations.js';

const EMPTY = {
  parentName: '',
  email: '',
  phone: '',
  studentName: '',
  subject: '',
  gradeLevel: '',
  message: '',
};

export default function RequestForm() {
  const [form, setForm] = useState(EMPTY);
  const [done, setDone] = useState(false);
  const [submit, { loading, error }] = useMutation(SUBMIT_TUTORING_REQUEST);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await submit({ variables: { input: form } });
      setDone(true);
      setForm(EMPTY);
    } catch {
      // Error surfaced via the `error` object below; nothing else to do here.
    }
  };

  return (
    <section className="section section--mist" id="request">
      <div className="shell form-layout">
        <div className="form-aside">
          <span className="eyebrow">Start here</span>
          <h2>Tell us about your child</h2>
          <p>
            Share a few details and we'll come back with a plan tailored to
            them — the subjects to focus on, a suggested pace, and times that
            fit your week. No commitment to send it.
          </p>
          <p>
            Prefer to talk first? Leave a note in the message field and we'll
            call you instead.
          </p>
        </div>

        <div className="form-card">
          {done ? (
            <div className="result">
              <div className="result__seal" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12.5l4.2 4.2L19 7"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Request received</h3>
              <p>
                Thank you — check your inbox for a confirmation. We'll be in
                touch shortly to talk through next steps.
              </p>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setDone(false)}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              {error && (
                <div className="alert alert--error">
                  Something went wrong sending your request. Please check your
                  details and try again.
                </div>
              )}

              <div className="field field--row">
                <div>
                  <label className="label" htmlFor="parentName">
                    Your name
                  </label>
                  <input
                    id="parentName"
                    name="parentName"
                    className="input"
                    value={form.parentName}
                    onChange={update}
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="studentName">
                    Student's name
                  </label>
                  <input
                    id="studentName"
                    name="studentName"
                    className="input"
                    value={form.studentName}
                    onChange={update}
                    required
                  />
                </div>
              </div>

              <div className="field field--row">
                <div>
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input"
                    value={form.email}
                    onChange={update}
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    className="input"
                    value={form.phone}
                    onChange={update}
                    required
                  />
                </div>
              </div>

              <div className="field field--row">
                <div>
                  <label className="label" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    className="input"
                    placeholder="e.g. Algebra, Biology"
                    value={form.subject}
                    onChange={update}
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="gradeLevel">
                    Grade level
                  </label>
                  <input
                    id="gradeLevel"
                    name="gradeLevel"
                    className="input"
                    placeholder="e.g. Grade 9"
                    value={form.gradeLevel}
                    onChange={update}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="message">
                  Anything we should know?
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="textarea"
                  placeholder="Goals, areas they find tricky, scheduling preferences…"
                  value={form.message}
                  onChange={update}
                />
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Sending…' : 'Send request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
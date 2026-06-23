import Testimonials from '../components/Testimonials.jsx';
import RequestForm from '../components/RequestForm.jsx';
import ReviewForm from '../components/ReviewForm.jsx';

export default function Home() {
  return (
    <div id="top">
      {/* Hero — the signature pen-underline lives on "knows them" */}
      <section className="hero">
        <div className="shell hero__inner">
          <span className="eyebrow">Private one-to-one tutoring</span>
          <h1>
            A tutor who actually <span className="mark">knows them</span>.
          </h1>
          <p className="hero__lead">
            Personal lessons built around your child — their pace, their
            subjects, their goals. No packages, no scripts. Just steady
            progress with someone in their corner.
          </p>
          <div className="hero__actions">
            <a className="btn btn--brass" href="#request">
              Request tutoring
            </a>
            <a className="btn btn--ghost" href="#reviews">
              Read reviews
            </a>
          </div>
          <p className="hero__trust">
            <strong>★ 4.9</strong> from families we've worked with
          </p>
        </div>
      </section>

      {/* How it works — a real three-step sequence, hence the numbering */}
      <section className="section" id="how">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>From first message to first lesson</h2>
            <p>
              Getting started is short and personal. Here's exactly what
              happens after you reach out.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step__num">01</div>
              <h3>Tell us what you need</h3>
              <p>
                Send a quick request with your child's subject, grade, and
                where they're stuck. Takes about a minute.
              </p>
            </div>
            <div className="step">
              <div className="step__num">02</div>
              <h3>We build the plan</h3>
              <p>
                We review the details, suggest a focus and a pace, and confirm
                times that fit around school and your week.
              </p>
            </div>
            <div className="step">
              <div className="step__num">03</div>
              <h3>Lessons begin</h3>
              <p>
                Sessions start one-to-one, with notes after each one so you
                always know how things are going.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <ReviewForm />

      <RequestForm />
    </div>
  );
}
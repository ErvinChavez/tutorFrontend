import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <a className="brand" href="#top">
          Marlowe<span className="brand__mark">.</span>
        </a>

        <nav className="footer__links" aria-label="Footer">
          <a href="#how">How it works</a>
          <a href="#reviews">Reviews</a>
          <a href="#request">Request tutoring</a>
          <Link to="/admin/login">Teacher login</Link>
        </nav>

        <p className="footer__meta">© {year} Marlowe Tutoring</p>
      </div>
    </footer>
  );
}
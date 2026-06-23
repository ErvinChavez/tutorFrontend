export default function Navbar() {
  return (
    <header className="nav">
      <div className="shell nav__inner">
        <a className="brand" href="#top" aria-label="Marlowe Tutoring home">
          Marlowe<span className="brand__mark">.</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a className="nav__link" href="#how">
            How it works
          </a>
          <a className="nav__link" href="#reviews">
            Reviews
          </a>
          <a className="btn btn--primary nav__cta" href="#request">
            Request tutoring
          </a>
        </nav>
      </div>
    </header>
  );
}
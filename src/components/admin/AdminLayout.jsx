import { Outlet, NavLink, Link } from 'react-router-dom';

import { useAuth } from '../../auth/AutoContext.jsx';

const navClass = ({ isActive }) =>
  'admin__navlink' + (isActive ? ' is-active' : '');

export default function AdminLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="admin">
      <header className="admin__bar">
        <div className="admin__bar-left">
          <Link className="admin__brand" to="/admin">
            Marlowe<span>.</span>
          </Link>
          <span className="admin__tag">Dashboard</span>
        </div>
        <div className="admin__bar-right">
          <a className="admin__viewsite" href="/">
            View site ↗
          </a>
          <span className="admin__user">{admin?.name || admin?.email}</span>
          <button className="btn btn--ghost admin__logout" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <div className="admin__body">
        <nav className="admin__nav" aria-label="Dashboard sections">
          <NavLink end to="/admin" className={navClass}>
            Requests
          </NavLink>
          <NavLink to="/admin/students" className={navClass}>
            Students
          </NavLink>
          <NavLink to="/admin/sessions" className={navClass}>
            Sessions
          </NavLink>
          <NavLink to="/admin/testimonials" className={navClass}>
            Testimonials
          </NavLink>
        </nav>

        <main className="admin__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
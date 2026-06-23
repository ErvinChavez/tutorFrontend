import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';

import { ADMIN_LOGIN } from '../../graphql/admin.js';
import { useAuth } from '../../auth/AuthContext.jsx';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [doLogin, { loading, error }] = useMutation(ADMIN_LOGIN);

  // Already signed in? Skip the form.
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await doLogin({ variables: { email, password } });
      login(data.adminLogin.token, data.adminLogin.admin);
      const dest = location.state?.from?.pathname || '/admin';
      navigate(dest, { replace: true });
    } catch {
      // Error shown below via the `error` object.
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <Link className="login__brand" to="/">
          Marlowe<span>.</span>
        </Link>
        <h1 className="login__title">Teacher sign in</h1>
        <p className="login__sub">Access your dashboard.</p>

        <form onSubmit={onSubmit} noValidate>
          {error && (
            <div className="alert alert--error">
              That email and password don't match. Please try again.
            </div>
          )}

          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <Link className="login__back" to="/">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';

import { ADMIN_LOGIN } from '../../graphql/admin.js';
import { useAuth } from '../../auth/AutoContext.jsx';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [doLogin, { loading, error }] = useMutation(ADMIN_LOGIN);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await doLogin({ variables: { email, password } });
      login(data.adminLogin.token, data.adminLogin.admin);
      const dest = location.state?.from?.pathname || '/admin';
      navigate(dest, { replace: true });
    } catch {
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <Link className="login__brand" to="/">
          Hernandez Learning Academy<span>.</span>
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
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{ paddingRight: '4.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0.6rem',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--wine)',
                  padding: '0.2rem 0.3rem',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
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
import { Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './components/PublicLayout.jsx';
import Home from './pages/Home.jsx';

import ProtectedRoute from './auth/ProtectedRoute.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import Login from './pages/admin/Login.jsx';
import RequestsView from './pages/admin/RequestsView.jsx';
import StudentsView from './pages/admin/StudentsView.jsx';
import SessionsView from './pages/admin/SessionsView.jsx';
import TestimonialsView from './pages/admin/TestimonialsView.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public marketing site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Admin login (public, but redirects in if already authed) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<RequestsView />} />
          <Route path="requests" element={<RequestsView />} />
          <Route path="students" element={<StudentsView />} />
          <Route path="sessions" element={<SessionsView />} />
          <Route path="testimonials" element={<TestimonialsView />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
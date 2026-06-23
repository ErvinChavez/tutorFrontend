import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The backend's CORS default origin is http://localhost:3000, so we run the
// Vite dev server on 3000 to avoid a CORS mismatch out of the box. If you'd
// rather use Vite's default 5173, set FRONTEND_URL=http://localhost:5173 in
// the backend's .env instead.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
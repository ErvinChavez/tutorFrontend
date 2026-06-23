# Hernandez Learning Academy — Frontend

The web client for Hernandez Learning Academy: a public marketing site where parents can request tutoring and leave reviews, plus a private admin dashboard where the teacher manages requests, students, sessions, and testimonials.

Built with **React + Vite + Apollo Client + React Router**, talking to the GraphQL backend. The interface uses a hand-crafted burgundy/brass/parchment design system (no UI framework).

---

## Tech stack

| Concern        | Choice |
| -------------- | ------ |
| Build tool     | Vite |
| UI             | React 18 |
| Routing        | React Router |
| Data / GraphQL | Apollo Client |
| Auth           | JWT stored in `localStorage`, attached via an Apollo auth link |
| Styling        | Plain CSS design system (`global.css` + `admin.css`), no Tailwind |
| Fonts          | Fraunces (display) + Hanken Grotesk (body), via Google Fonts |


## Getting started

### Prerequisites

- Node.js (recent LTS or current)
- The backend running and reachable (locally on `http://localhost:4000` by default)

### Install

```bash
npm install
```

### Environment

Create a `.env` file in the project root:

```ini
VITE_API_URL=http://localhost:4000/graphql
```

This points the client at the GraphQL backend. If omitted, the code falls back to `http://localhost:4000/graphql`. (See deployment below for the production value.)

> `.env` is read at startup — restart the dev server after changing it.

### Run

```bash
npm run dev       # starts Vite on http://localhost:3000
npm run build     # production build into dist/
npm run preview   # preview the production build locally
```

The dev server runs on **port 3000 on purpose** — it matches the backend's default CORS origin, so the two connect without extra config. You need **both servers running** during development: the backend on :4000 and this app on :3000.

---

## How it's organized

### Public site (`/`)

No authentication. Talks only to the public parts of the API:

- **Hero / How it works** — static marketing sections.
- **Testimonials** — fetches `approvedTestimonials` (only reviews the teacher has approved).
- **Leave a review** — `submitTestimonial`; the response routes by rating (happy reviewers are invited to share publicly, critical feedback is acknowledged and emailed to the business).
- **Request tutoring** — `submitTutoringRequest`; triggers a confirmation email on the backend.

### Admin dashboard (`/admin/*`)

Behind a login. Every data call carries the JWT automatically.

| Route | View | Does |
| ----- | ---- | ---- |
| `/admin/login` | Login | `adminLogin`; stores the token |
| `/admin` or `/admin/requests` | Requests | List, filter, **accept & convert to student**, decline |
| `/admin/students` | Students | Active student profiles |
| `/admin/sessions` | Sessions | Schedule sessions, track payment status |
| `/admin/testimonials` | Testimonials | Moderate / approve / unpublish reviews |

### Auth flow

- On login, the JWT + admin info are saved to `localStorage` (`src/auth/token.js`).
- The Apollo **auth link** (`src/apollo/client.js`) attaches `Authorization: Bearer <token>` to every request.
- The Apollo **error link** watches for `UNAUTHENTICATED`; if the token is expired/invalid while one is held, it clears the session and redirects to login.
- `ProtectedRoute` guards all `/admin` routes and redirects to login when not authenticated.
- Logout clears the token and resets the Apollo cache.

---

## Deployment (Vercel)

The frontend is deployed on Vercel; the backend on Render.

1. Push to GitHub and import the repo in Vercel (auto-detected as Vite).
2. Set the environment variable:
   ```
   VITE_API_URL = https://<your-backend>.onrender.com/graphql
   ```
   (the backend's URL **with** `/graphql`).
3. `vercel.json` provides the SPA rewrite so deep links like `/admin/login` don't 404 on refresh:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
4. **CORS link-up:** the backend must allow this site's origin. On the backend host, set its `FRONTEND_URL` to the Vercel **production** URL (e.g. `https://<project>.vercel.app`) — `https://`, no trailing slash, no `/graphql`. Test on that production URL; per-deployment preview URLs are not on the CORS allowlist and will be blocked.

---

## Branding

The name and wordmark ("Hernandez Learning Academy") appear in: `index.html` (`<title>` + meta description), `Navbar.jsx`, `Footer.jsx`, and `Login.jsx`. The color system and fonts are defined as CSS variables at the top of `src/styles/global.css`.

---

## License

Private / proprietary.
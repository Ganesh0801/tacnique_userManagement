# User Management Dashboard

A full-stack CRUD dashboard for viewing, adding, editing, and deleting users — built with **React + MUI** on the frontend and **Express + MongoDB** on the backend.

---

## Important assumption / deviation from the brief

The original brief asks for JSONPlaceholder's `/users` endpoint. JSONPlaceholder was **not used** for the final implementation, for two concrete reasons:

1. It doesn't persist writes — every POST/PUT/DELETE returns a fake "success" response but never actually changes anything, which makes Add/Edit/Delete impossible to demo meaningfully.
2. Its user schema (`name`, `username`, `address`, `company`, ...) has no `firstName` / `lastName` / `department` fields, which the brief explicitly requires.

Instead, this project ships a **self-built Express + MongoDB API** with the exact schema the brief asks for (`firstName`, `lastName`, `email`, `department`), giving real persistence, real validation, and real error responses to build the UI against. All other requirements (search, sort, filter, pagination, validation, error handling, responsive UI) are implemented in full.

---

## Tech Stack

| Layer     | Stack |
|-----------|-------|
| Frontend  | React 18, Vite, MUI (Material UI) v5, Axios, notistack |
| Backend   | Node.js, Express 4, MongoDB, Mongoose |
| Testing   | Jest + Supertest + mongodb-memory-server (backend), Vitest + Testing Library (frontend) |

---

## Project Structure

```
user-management-dashboard/
├── backend/
│   ├── config/
│   │   └── db.js                # Mongoose connection
│   ├── models/
│   │   └── User.js              # Mongoose schema + validation
│   ├── controllers/
│   │   └── userController.js    # Business logic for CRUD + search/filter/sort/pagination
│   ├── routes/
│   │   └── userRoutes.js        # /api/users route definitions
│   ├── middleware/
│   │   ├── errorHandler.js      # Centralized error formatting + 404 handler
│   │   └── validateUser.js      # express-validator rules
│   ├── utils/
│   │   └── ApiError.js          # Custom error class with HTTP status codes
│   ├── tests/
│   │   └── user.test.js         # Supertest integration tests (in-memory Mongo)
│   ├── .env.example
│   └── server.js                # App entrypoint
│
└── frontend/
    └── src/
        ├── api/
        │   ├── axiosInstance.js # Configured axios client + error normalization
        │   └── userApi.js       # All /users HTTP calls in one place
        ├── components/
        │   ├── common/          # Loader, EmptyState, ConfirmDialog, SearchBar, FilterPopup
        │   ├── layout/           # Navbar, PageContainer
        │   └── user/             # UserTable, UserTableRow, UserFormDialog, PaginationBar
        ├── context/
        │   └── SnackbarContext.jsx  # Global success/error toast notifications
        ├── hooks/
        │   ├── useUsers.js       # Owns list/pagination/search/filter/sort state
        │   └── useDebounce.js
        ├── pages/
        │   ├── UserListPage.jsx  # Main dashboard page
        │   └── NotFoundPage.jsx
        ├── theme/
        │   └── theme.js          # Custom MUI theme (palette, typography, overrides)
        ├── utils/
        │   ├── constants.js
        │   └── validators.js     # Client-side form validation
        ├── App.jsx
        └── main.jsx
```

---

## Setup & Run Instructions

### Prerequisites
- Node.js 18+
- A MongoDB instance (local `mongod`, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI to your local or Atlas connection string
npm run dev        # starts the API on http://localhost:5000
```

Run backend tests:
```bash
npm test
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_BASE_URL defaults to http://localhost:5000/api — adjust if needed
npm run dev         # starts the app on http://localhost:5173
```

Run frontend tests:
```bash
npm test
```

---

## Packages Used & Why

**Backend**
- `express` — HTTP server / routing
- `mongoose` — MongoDB ODM, schema validation
- `express-validator` — request-level input validation
- `express-async-handler` — removes try/catch boilerplate around async route handlers
- `cors`, `helmet`, `morgan` — CORS handling, security headers, request logging
- `dotenv` — environment variable loading
- `jest`, `supertest`, `mongodb-memory-server` — API integration testing without touching a real database

**Frontend**
- `@mui/material`, `@mui/icons-material`, `@emotion/*` — component library + styling engine
- `axios` — HTTP client with interceptor support
- `notistack` — toast notifications for success/error feedback
- `vite` — dev server & build tool
- `vitest`, `@testing-library/react`, `jest-dom` — component/unit testing

---

## API Reference

Base URL: `/api/users`

| Method | Endpoint      | Description |
|--------|---------------|-------------|
| GET    | `/`           | List users. Query params: `page`, `limit`, `search`, `firstName`, `lastName`, `email`, `department`, `sortBy`, `sortOrder` |
| GET    | `/:id`        | Get a single user |
| POST   | `/`           | Create a user |
| PUT    | `/:id`        | Update a user |
| DELETE | `/:id`        | Delete a user |

All responses follow `{ success, data, ...extras }`. Errors follow `{ success: false, message }`.

---

## Deployment

### Backend (Render / Railway — free tier friendly)
1. Push this repo to GitHub.
2. On [Render](https://render.com): New → Web Service → connect the repo, set **Root Directory** to `backend`.
3. Build command: `npm install`. Start command: `npm start`.
4. Add environment variables: `MONGO_URI` (Atlas connection string), `CLIENT_ORIGIN` (your deployed frontend URL), `NODE_ENV=production`.
5. Deploy — you'll get a URL like `https://your-app.onrender.com`.

*(Railway works identically — set the same root directory, build/start commands, and env vars.)*

### Database
Use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster. Whitelist `0.0.0.0/0` (or your host's IPs) under Network Access, and copy the connection string into `MONGO_URI`.

### Frontend (Vercel / Netlify)
1. On [Vercel](https://vercel.com): New Project → import the repo → set **Root Directory** to `frontend`.
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Add environment variable `VITE_API_BASE_URL` = your deployed backend URL + `/api` (e.g. `https://your-app.onrender.com/api`).
4. Deploy — you'll get a URL like `https://your-app.vercel.app`.

*(Netlify: same idea — build command `npm run build`, publish directory `dist`.)*

After both are deployed, update the backend's `CLIENT_ORIGIN` env var to the final frontend URL and redeploy the backend so CORS allows it.

---

## Features Implemented

- ✅ View users (ID, First Name, Last Name, Email, Department)
- ✅ Add / Edit / Delete via modal form, backed by real API persistence
- ✅ Pagination with 10 / 25 / 50 / 100 page-size options
- ✅ Filter popup (first name, last name, email, department)
- ✅ Debounced search across all fields
- ✅ Column sorting (name, email, department, date added)
- ✅ Fully responsive layout (mobile → desktop)
- ✅ Client-side validation (required fields, min length, email format) mirrored by server-side validation
- ✅ Centralized error handling on both frontend (toast notifications, inline alerts) and backend (consistent JSON error shape, Mongo-specific error translation)
- ✅ Unit/integration tests on both frontend and backend

---

## Challenges Faced & What I'd Improve With More Time

- **Schema mismatch with JSONPlaceholder** was the biggest early decision point — resolved by building a proper backend instead, which also unlocked real persistence for the CRUD demo.
- **Debounced search vs. applied filters** needed careful state separation (draft filter state vs. applied filter state) so the filter popup doesn't trigger a network request per keystroke.
- With more time, I would add:
  - JWT-based authentication/authorization
  - Optimistic UI updates for add/edit/delete instead of a full refetch
  - Bulk actions (multi-select delete/export)
  - Server-side rate limiting and request throttling
  - E2E tests with Playwright/Cypress covering the full add → edit → delete flow
  - Dark mode toggle using the existing MUI theme structure

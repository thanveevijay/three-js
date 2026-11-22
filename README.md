# Team Management Web Application

A full-stack team-member management application with a React frontend and an Express/MongoDB API. Members can be created with profile details and an optional image, then listed or retrieved individually.

## Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express, Mongoose, Multer
- Database: MongoDB

## Run locally

### Backend

```bash
cd backend
npm install
```

Create `backend/.env` from `backend/.env.example` and set the MongoDB connection string and frontend origin.

```bash
npm start
```

The API defaults to `http://localhost:5000`.

### Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm start
```

The React development server normally runs at `http://localhost:3000`.

## Backend configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `5000` | API listening port |
| `MONGODB_URI` | local MongoDB URL | MongoDB connection string |
| `CLIENT_ORIGIN` | `http://localhost:3000` | Allowed browser origin for CORS |

Do not commit real credentials or production connection strings.

## API routes

- `GET /` — API health message
- `GET /api/members` — list members
- `GET /api/members/:id` — retrieve one member
- `POST /api/members` — create a member; accepts multipart form data and an optional image

Member image uploads are limited to 5 MB and common raster image MIME types.

## Notes

The backend currently uses a MongoDB collection for member records. Run MongoDB locally or provide a hosted connection through `MONGODB_URI` before starting the API.

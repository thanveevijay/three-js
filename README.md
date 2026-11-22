# Team Management Web Application

A full-stack team-member management application with a React frontend and an Express/MongoDB API. Members can be created with profile details and an optional image, then listed or retrieved individually.

## Stack

- Frontend: React
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

| Method | Route | Description |
| --- | --- | --- |
| GET | `/` | API status message |
| GET | `/api/members` | List members, newest first |
| GET | `/api/members/:id` | Retrieve one member |
| POST | `/api/members` | Create a member using multipart form data |

### Create a member

Send a `multipart/form-data` request to `POST /api/members`. Required text fields are `name`, `roll`, `year`, and `degree`. Optional fields are `project`, `hobbies`, `certificate`, `internship`, and `aim`. An optional image must use the field name `image`.

Example using curl:

```bash
curl -X POST http://localhost:5000/api/members \
  -F "name=Sample Member" \
  -F "roll=CS001" \
  -F "year=Final Year" \
  -F "degree=B.Tech CSE" \
  -F "project=Team Management App"
```

The upload middleware accepts JPEG, PNG, WEBP, and GIF MIME types and limits each image to 5 MB. The server generates the stored filename; clients should not assume that the original filename is preserved.

### Response behavior

- `201` — member created successfully.
- `400` — required fields are missing.
- `404` — requested member ID does not exist.
- `500` — an unexpected server or database error occurred.

## Notes

The backend uses MongoDB for member records and local disk storage for uploaded images. For a production deployment, use persistent object storage for images, validate file contents rather than trusting MIME headers alone, and add authentication and authorization before exposing member data publicly.

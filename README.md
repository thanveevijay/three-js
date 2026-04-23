# THREE.JS — Student Team Members Management Application

A full-stack web application developed to manage student team members efficiently.
Users can add members, view all members, and see detailed profiles including uploaded images.

---

## 🚀 Tech Stack

- **Frontend:** React.js, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **File Upload:** Multer

---

## 📁 Project Structure

```
three-js/
├── backend/
├── frontend/
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/thanveevijay/three-js.git
cd three-js
```

---

### 2. Setup Backend

```bash
cd backend
npm install
node server.js
```

✔ Ensure MongoDB is running locally on:

```
mongodb://127.0.0.1:27017
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint         | Description                          |
| ------ | ---------------- | ------------------------------------ |
| POST   | /api/members     | Add a new member (with image upload) |
| GET    | /api/members     | Retrieve all members                 |
| GET    | /api/members/:id | Retrieve a single member by ID       |

---

## ▶️ How to Run the Application

1. Start MongoDB locally
2. Run backend:

   ```bash
   cd backend
   node server.js
   ```

3. Run frontend:

   ```bash
   cd frontend
   npm start
   ```

4. Open in browser:

   ```
   http://localhost:3000
   ```

---

## ✨ Features

- Add new team members with image upload
- View all members in a clean card layout
- View individual member details
- Simple and responsive UI

---

## 📌 Notes

- Uploaded images are stored in the `/uploads` folder
- Backend runs on **port 5000**
- Frontend runs on **port 3000**

---

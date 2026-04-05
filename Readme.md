# 🎥 Video Streaming Platform

A full-stack video streaming platform where users can upload videos, process them, and stream them with real-time updates.

---

## 🚀 Live Demo

- 🌐 Frontend: https://video-stream-dtny.vercel.app  
- ⚙️ Backend: https://videostream-mk3g.onrender.com  

---

## ✨ Features

### 🔐 Authentication
- Signup & Login functionality
- JWT-based authentication (HTTP-only cookies)
- Logout support
- Protected routes

### 📤 Video Upload
- Upload videos using Multer
- Only video file types allowed
- Stored locally on server (`/uploads`)

### 🎬 Video Streaming
- Stream videos directly in browser
- Efficient backend streaming endpoint

### ⚙️ Video Processing
- Simulated processing system
- Status updates:
  - `processing`
  - `completed`
- Sensitivity tagging:
  - `safe`
  - `flagged`

### 🔴 Real-Time Updates
- Socket.IO integration
- Live updates when processing completes

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- Multer

---

## 📁 Project Structure

# 🎥 Video Streaming Platform

A full-stack video streaming platform where users can upload videos, process them, and stream them with real-time updates.

---

## 🚀 Live Demo

- 🌐 Frontend: https://video-stream-dtny.vercel.app  
- ⚙️ Backend: https://videostream-mk3g.onrender.com  

---

## ✨ Features

### 🔐 Authentication
- Signup & Login functionality
- JWT-based authentication (HTTP-only cookies)
- Logout support
- Protected routes

### 📤 Video Upload
- Upload videos using Multer
- Only video file types allowed
- Stored locally on server (`/uploads`)

### 🎬 Video Streaming
- Stream videos directly in browser
- Efficient backend streaming endpoint

### ⚙️ Video Processing
- Simulated processing system
- Status updates:
  - `processing`
  - `completed`
- Sensitivity tagging:
  - `safe`
  - `flagged`

### 🔴 Real-Time Updates
- Socket.IO integration
- Live updates when processing completes

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- Multer

---



```

videoStreaming/
│
├── frontend/
│ ├── src/
│ │ ├── assets/
│ │ ├── auth/
│ │ │ ├── Login.jsx
│ │ │ └── Signup.jsx
│ │ ├── components/
│ │ │ └── ProtectedRoute.jsx
│ │ ├── pages/
│ │ │ ├── Dashboard.jsx
│ │ │ └── Upload.jsx
│ │ ├── socket/
│ │ │ └── socket.js
│ │ ├── App.jsx
│ │ └── main.jsx
│ │
│ ├── .env
│ ├── index.html
│ └── package.json
│
├── server/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ └── video.controller.js
│ ├── middlewares/
│ │ ├── auth.js
│ │ └── upload.js
│ ├── models/
│ │ ├── auth.schema.js
│ │ └── video.schema.js
│ ├── routes/
│ │ ├── auth.route.js
│ │ └── video.route.js
│ ├── services/
│ │ └── videoProcessor.js
│ ├── sockets/
│ │ └── socket.js
│ ├── uploads/
│ ├── utils/
│ ├── .env
│ ├── index.js
│ └── package.json
│
└── README.md

```


---

## ⚙️ Environment Variables

### 🔹 Backend (.env)

```bash

PORT=980
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
FRONTEND_URL=https://video-stream-dtny.vercel.app

```

---

### 🔹 Frontend (.env)

```bash


VITE_BACKEND_URL=https://videostream-mk3g.onrender.com

---

```

## 🧪 Run Locally

### 1️⃣ Clone repo

```bash

git clone https://github.com/shivcodecf/videoStream.git

cd video-streaming

```
---

### 2️⃣ Backend setup

```bash

cd server
npm install
npm run dev

```



---

## 🧪 Run Locally

### 1️⃣ Clone repo

```


git clone https://github.com/shivcodecf/videoStream.git

cd video-streaming

```


---





---

## 🔐 Security

- HTTP-only cookies (prevents XSS)
- CORS properly configured
- Environment variables for secrets
- MongoDB Atlas IP whitelisting

---

## ⚡ Key Highlights

- Real-time updates using Socket.IO
- Full authentication system with cookies
- Cross-origin deployment (Vercel + Render)
- Clean scalable architecture

---

## 🚀 Future Improvements

- Video compression (FFmpeg)
- Cloud storage (AWS S3 / Cloudinary)
- Pagination & search
- Better UI/UX
- Role-based access control

---

## 👨‍💻 Author

**Shivam Yadav**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!


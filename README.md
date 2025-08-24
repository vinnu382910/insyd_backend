# 📡 Notification System Backend

This is the **backend** for the Notification System assignment.  
It supports **1M+ users** with scalable design using **Node.js, Express, MongoDB, and WebSockets**.

---

## 🌐 Live Demo

- 🔗 **Frontend**: [https://insyd-frontend-git-main-kalva-vinays-projects.vercel.app/](https://insyd-frontend-git-main-kalva-vinays-projects.vercel.app/)
- 🔗 **Backend**: [https://insyd-backend-b1hs.onrender.com](https://insyd-backend-b1hs.onrender.com)

---

## 🚀 Features

- REST APIs for:
  - User creation & listing
  - Follow, Post, and Like actions
  - Notifications (list, mark as read)
- WebSocket server for **real-time delivery** of notifications
- Offline support → stores notifications in MongoDB and delivers when user comes online
- Scalable architecture (stateless API + DB + WS connections)

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **WebSocket** (`ws` library)
- **Nodemon** for dev auto-reload

---

## 📂 Project Structure

```

backend/
│
├── server.js           # Entry point
├── config/             # DB connection
│   └── db.js
├── controllers/        # Business logic
│   ├── userController.js
│   ├── followController.js
│   ├── eventController.js
│   └── notificationController.js
├── models/             # Mongoose schemas
│   ├── User.js
│   ├── Follow\.js
│   └── Notification.js
├── routes/             # API routes
│   ├── userRoutes.js
│   ├── followRoutes.js
│   ├── eventRoutes.js
│   └── notificationRoutes.js
└── websocket/          # WebSocket server
└── wsServer.js

````

---

## ⚙️ Installation

```bash
# Clone repo
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Start dev server with nodemon
npm run dev

# OR start normally
npm start
````

---

## 🌐 API Endpoints

### Users

* `POST /api/users` → create user
* `GET /api/users` → list users

### Follow

* `POST /api/follows` → follow a user (sends notification)

### Events

* `POST /api/events/post` → create post (notify followers)
* `POST /api/events/like` → like post (notify owner)

### Notifications

* `GET /api/notifications/:userId?limit=20` → fetch notifications
* `PATCH /api/notifications/:id/read` → mark as read

### WebSocket

* Connect: `ws://<your-domain>/ws?userId=<id>`
* Live notifications delivered in real-time

---

## 🧪 Testing

Use **Postman** collection or the React frontend to test:

* Create users, follow, post, like
* Switch between users and see real-time notifications

---

# 📂 Frontend: `README.md`

```markdown
# 💻 Notification System Frontend

This is the **frontend** for the Notification System assignment, built with **React.js (CRA)**.  
It connects to the backend APIs + WebSocket to show **real-time notifications**.

---

## 🌐 Live Demo

- 🔗 **Frontend**: [https://insyd-frontend-git-main-kalva-vinays-projects.vercel.app/](https://insyd-frontend-git-main-kalva-vinays-projects.vercel.app/)
- 🔗 **Backend**: [https://insyd-backend-b1hs.onrender.com](https://insyd-backend-b1hs.onrender.com)

---

## 🚀 Features

- Create and switch between users (simulate login)
- Follow users (target gets notification)
- Post (followers notified)
- Like (owner notified)
- Notifications panel:
  - Shows real-time (via WebSocket)
  - Loads missed notifications (via API)
  - Mark as read

---

## 🛠️ Tech Stack

- **React.js (Create React App)**
- **Fetch API** for REST
- **WebSocket API** for real-time
- **CSS only** (dark theme, clean design)

---

## 📂 Project Structure

```

frontend/
│
├── src/
│   ├── index.js
│   ├── App.js
│   ├── api.js
│   ├── styles.css
│   └── components/
│       ├── Users.js
│       ├── Follow\.js
│       ├── Post.js
│       ├── Like.js
│       └── Notifications.js

````

---

## ⚙️ Installation

```bash
# Clone repo
git clone <your-repo-url>
cd frontend

# Install dependencies
npm install

# Start development server
npm start
````

Frontend will run on:
👉 `http://localhost:3000`
Backend should run on:
👉 `http://localhost:5000`

---

## 🖥️ Usage

1. Start backend first (`npm run dev` in backend)
2. Start frontend (`npm start`)
3. In browser:

   * Create users (Alice, Bob)
   * Pick a current user (e.g., Alice)
   * Open another tab → pick Bob
   * Try follow/post/like → notifications appear in real-time

---

## 📸 UI Overview

* **Users card** → create + switch users
* **Follow card** → follow another user
* **Post card** → notify followers
* **Like card** → notify owner
* **Notifications panel** → see new + stored notifications

---

## ✅ Assignment Fit

* React.js **only** (no Vite/Next.js)
* Focus on **notification system**, no auth/extra features
* Real-time + offline handling
* Simple, modular, assignment-ready design

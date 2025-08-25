# 📡 Notification System Backend (Scalable for 1M+ Users)

This is the backend for the In-App Notification System assignment.

It is designed to handle:

* High concurrency (1 million+ users)
* Real-time notifications using WebSocket
* Offline notification delivery
* Efficient storage and retrieval
* Notification overflow control

---

## 🚀 Features

* Create and manage users
* Follow other users
* Generate notifications for:

  * Follow events
  * Post events
  * Like events
* Real-time delivery using WebSockets
* Stores unread notifications in MongoDB
* Clients fetch missed notifications when online
* Mark notifications as read
* Prevent overflow: notification cap + indexing

---

## 🛠️ Tech Stack

* Node.js + Express
* MongoDB + Mongoose
* WebSocket (ws package)
* Nodemon (for dev hot-reload)

---

## 📂 Project Structure

```
backend/
│
├── server.js                   # App entry point
├── config/
│   └── db.js                   # MongoDB connection
├── controllers/
│   ├── userController.js
│   ├── followController.js
│   ├── eventController.js
│   └── notificationController.js
├── models/
│   ├── User.js
│   ├── Follow.js
│   └── Notification.js
├── routes/
│   ├── userRoutes.js
│   ├── followRoutes.js
│   ├── eventRoutes.js
│   └── notificationRoutes.js
└── websocket/
    └── wsServer.js             # WebSocket handling
```

---

## ⚙️ Setup Instructions

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a .env file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notification_db
```

3. Start development server:

```bash
npm run dev
```

---

## 🌐 API Endpoints

### Users

* POST /api/users → create a user
* GET /api/users → list all users

### Follow

* POST /api/follows → follow a user & notify them

### Events

* POST /api/events/post → notify followers
* POST /api/events/like → notify post owner

### Notifications

* GET /api/notifications/\:userId?limit=n → get latest notifications
* PATCH /api/notifications/\:id/read → mark as read

---

## 🔔 Notification Delivery Flow

1. Events (Follow, Post, Like) trigger creation of a Notification in MongoDB.
2. If recipient is online (active WebSocket), notification is sent in real-time.
3. If offline, notification remains in DB to be fetched later.
4. Clients fetch missed notifications via REST API after reconnecting.

---

## 📦 Notification Overflow Handling

To prevent overload for high-volume users:

* A user can only have a limited number of stored notifications (e.g. last 100 or 200).
* Notifications are indexed by createdAt and userId for fast retrieval and purging.
* On insertion, the backend:

  * Inserts the new notification
  * Trims older ones using a cap (e.g. using MongoDB’s \$push + \$slice or manual deletion)

This ensures:

* The app never stores unlimited notifications per user
* Database size is controlled and predictable
* Query performance remains fast even with millions of notifications

Example logic (pseudo):

On new notification:

* Store it in MongoDB
* Run cleanup:
  Delete oldest notifications where userId = receiver and count > 100

This approach was explicitly requested in the assignment (refer to “Design a notification system that supports real-time delivery + scale + overflow management”).

---

## 🧪 Testing

Use Postman or the frontend (React) to:

* Create users
* Follow someone → they receive notification
* Post content → followers notified
* Like a post → owner notified
* Open WS connection → see real-time updates
* Reload → see stored notifications

---

## 🔄 WebSocket Connection

To receive notifications in real-time:

* Connect to:
  ws\://localhost:5000/ws?userId=\<user\_id>

Server will:

* Track connection
* Send notifications in real-time when available

If the user is not connected, notifications are safely stored in MongoDB for later fetch.

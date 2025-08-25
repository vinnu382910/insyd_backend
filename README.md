# 🛠️ INSYD Backend

This is the backend service for the **INSYD Assignment Application**. It provides authentication, category management, and real-time notifications. The backend is built using **Node.js, Express.js, MongoDB**, and **WebSockets**.

---

## 🚀 Features

* **Authentication**

  * Admin login/signup
  * User login/signup
  * JWT-based authentication and role-based authorization

* **Category Management (CRUD)**

  * Create, read, update, and delete categories
  * Admin-only access for protected routes

* **Notifications**

  * Real-time notifications using WebSockets (`wss://`)
  * Notification overflow handled with queuing (see below)

* **API Responses**

  * Consistent JSON structure for all responses
  * Error handling with proper HTTP status codes

---

## 📡 API Base URL

```
https://insyd-backend-b1hs.onrender.com
```

---

## 📌 API Endpoints

### Auth

* `POST /auth/admin/login` → Admin login
* `POST /auth/admin/signup` → Admin signup
* `POST /auth/user/login` → User login
* `POST /auth/user/signup` → User signup

### Categories

* `GET /categories` → Fetch all categories
* `GET /categories/:id` → Fetch a single category
* `POST /categories` → Create new category *(Admin only)*
* `PUT /categories/:id` → Update category *(Admin only)*
* `DELETE /categories/:id` → Delete category *(Admin only)*

### Utility

* `GET /` → Health check route

---

## 🔔 Notifications & Overflow Handling

The backend uses **WebSockets (`wss://`)** to push real-time notifications (e.g., category updates, admin actions).

To avoid **notification overflow** (when too many notifications are sent to clients at once), we implemented the following strategy:

1. **Notification Queue**

   * Each connected client has a queue (FIFO structure).
   * New notifications are pushed into the queue instead of being sent blindly.

2. **Rate Limiting**

   * The server sends notifications at a controlled rate (e.g., one per tick).
   * This ensures clients don’t get overwhelmed or disconnected due to floods.

3. **Queue Size Limit (Overflow Protection)**

   * Each client’s notification queue has a **max size** (e.g., 50).
   * If the queue is full, the **oldest notifications are dropped** (FIFO).
   * This prevents memory leaks and ensures users only see the most recent & relevant updates.

4. **Client Acknowledgements**

   * Clients can acknowledge receipt of notifications.
   * Once acknowledged, the item is removed from the queue.

✅ This ensures **scalability**, prevents server crashes from spamming, and keeps the user experience smooth.

---

## 🛠️ Tech Stack

* **Backend Framework:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ORM)
* **Authentication:** JWT
* **Real-Time:** WebSocket (`wss://`)
* **Deployment:** Render

---

## 📂 Project Structure

```
backend/
│── config/         # DB & WebSocket config
│── controllers/    # Route handlers
│── middlewares/    # Auth & error handling
│── models/         # Mongoose schemas
│── routes/         # API routes
│── utils/          # Helpers (e.g., notification queue)
│── server.js       # Entry point
│── README.md       # Documentation
```

---

## ⚡ Running Locally

```bash
# Clone repository
git clone <repo-url>
cd backend

# Install dependencies
npm install

# Add .env file
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-secret>

# Run server
npm start

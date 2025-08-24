import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';

import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import followRoutes from './routes/followRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { WebSocketBroker } from './ws/broker.js';

const app = express();
app.use(cors());
app.use(express.json());

// Attach notify helper to req
const broker = new WebSocketBroker();
app.use((req, _res, next) => {
  req.notify = ({ kind, data }) => {
    if (kind === 'notification') {
      broker.sendToUser(String(data.userId), { kind, data });
    }
  };
  next();
});

// Routes
app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/users', userRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// WebSocket endpoint ws://localhost:5000/ws?userId=123
const wss = new WebSocketServer({ server, path: '/ws' });
wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const userId = url.searchParams.get('userId');
  if (!userId) {
    ws.close(1008, 'userId required');
    return;
  }
  broker.addClient(String(userId), ws);
  ws.send(JSON.stringify({ kind: 'hello', data: { userId } }));
});

server.listen(PORT, async () => {
  await connectDB(process.env.MONGODB_URI);
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

export class WebSocketBroker {
  constructor() {
    this.userSockets = new Map(); // userId -> Set of sockets
  }

  addClient(userId, ws) {
    if (!this.userSockets.has(userId)) this.userSockets.set(userId, new Set());
    this.userSockets.get(userId).add(ws);

    ws.on('close', () => {
      const set = this.userSockets.get(userId);
      if (set) {
        set.delete(ws);
        if (set.size === 0) this.userSockets.delete(userId);
      }
    });
  }

  sendToUser(userId, payload) {
    const set = this.userSockets.get(String(userId));
    if (!set) return 0;
    const data = JSON.stringify(payload);
    let delivered = 0;
    for (const ws of set) {
      if (ws.readyState === 1) {
        ws.send(data);
        delivered++;
      }
    }
    return delivered;
  }
}

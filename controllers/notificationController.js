import Notification from '../models/Notification.js';

export async function listNotifications(req, res) {
  try {
    const { userId } = req.params;
    const { limit = 50 } = req.query;
    const items = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .lean();
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function markRead(req, res) {
  try {
    const { id } = req.params;
    const updated = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

import Follow from '../models/Follow.js';
import Notification from '../models/Notification.js';

export async function followUser(req, res) {
  try {
    const { followerId, followeeId } = req.body;
    if (!followerId || !followeeId) {
      return res.status(400).json({ error: 'followerId & followeeId required' });
    }

    const follow = await Follow.findOneAndUpdate(
      { followerId, followeeId },
      {},
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const notif = await Notification.create({
      userId: followeeId,
      type: 'FOLLOW',
      actorId: followerId,
      metadata: {},
    });

    req.notify({ kind: 'notification', data: notif });

    res.status(201).json({ follow, notification: notif });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

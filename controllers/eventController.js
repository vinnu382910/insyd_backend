import Follow from '../models/Follow.js';
import Notification from '../models/Notification.js';

// New post event → notify followers
export async function newPost(req, res) {
  try {
    const { authorId, postId, title } = req.body;
    if (!authorId) return res.status(400).json({ error: 'authorId required' });

    const followers = await Follow.find({ followeeId: authorId }).lean();
    const notifications = await Notification.insertMany(
      followers.map(f => ({
        userId: f.followerId,
        type: 'POST',
        actorId: authorId,
        metadata: { postId, title },
      }))
    );

    notifications.forEach(n => req.notify({ kind: 'notification', data: n }));
    res.status(201).json({ count: notifications.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Like event → notify owner
export async function likePost(req, res) {
  try {
    const { actorId, ownerId, postId } = req.body;
    if (!actorId || !ownerId) return res.status(400).json({ error: 'actorId & ownerId required' });

    const notif = await Notification.create({
      userId: ownerId,
      type: 'LIKE',
      actorId,
      metadata: { postId },
    });

    req.notify({ kind: 'notification', data: notif });

    res.status(201).json(notif);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

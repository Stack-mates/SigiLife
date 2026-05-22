import { Router } from 'express';
import prisma from '../prisma/prisma.client.js';

const narrativeIds = [
  process.env.MORGANA_USER_ID,
  process.env.HARPER_USER_ID,
  process.env.BENNET_USER_ID,
  process.env.ALISTAIR_USER_ID
].filter(Boolean).map(Number);

const router = Router();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Searches for User from DB

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'username is required to search!' })
    }
    const users = await prisma.user.findMany({
      where: {
        username: { contains: q as string }
      },
      select: { id: true, username: true, avatar: true, picture: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Friends Follow/unfollow
router.post('/follow', async (req, res) => {
  try {
    const followerId = parseInt(req.body.followerId);
    const followingId = parseInt(req.body.followingId);

    const follow = await prisma.follow.create({
      data: { followerId, followingId }
    });

    const [follower, followingUser] = await Promise.all([
      prisma.user.findUnique({ where: { id: followerId }, select: { username: true } }),
      prisma.user.findUnique({ where: { id: followingId }, select: { username: true } }),
    ]);

    await prisma.activity.create({
      data: {
        userId: followingId,
        fromUserId: followerId,
        type: 'new_follower',
        message: `${follower?.username} is now following you.`,
      }
    });

    const mutualFollow = await prisma.follow.findFirst({
      where: { followerId: followingId, followingId: followerId }
    });

    if (mutualFollow) {
      await prisma.activity.createMany({
        data: [
          {
            userId: followerId,
            fromUserId: followingId,
            type: 'sigilites',
            message: `You and ${followingUser?.username} are now SigiLites! ✦`,
          },
          {
            userId: followingId,
            fromUserId: followerId,
            type: 'sigilites',
            message: `You and ${follower?.username} are now SigiLites! ✦`,
          },
        ]
      });
    }

    res.json(follow);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Friends Followers/following
router.get('/:id/followers', async (req, res) => {
  try {
    const follows = await prisma.follow.findMany({
      where: { followingId: parseInt(req.params.id) },
      include: { follower: { select: { id: true, username: true, avatar: true } } }
    });
    res.json(follows.map((f: any) => f.follower));
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/:id/following', async (req, res) => {
  try {
    const follows = await prisma.follow.findMany({
      where: { followerId: parseInt(req.params.id) },
      include: { following: { select: { id: true, username: true, avatar: true } } }
    });
    res.json(follows.map((f: any) => f.following));
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Get Friends
router.get('/:id/friends', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const following = await prisma.follow.findMany({
      where: { followerId: id },
      select: { followingId: true }
    });
    const followingIds = following.map((f: any) => f.followingId);
    const friends = await prisma.follow.findMany({
      where: {
        followerId: { in: followingIds },
        followingId: id
      },
      include: { follower: { select: { id: true, username: true, avatar: true } } }
    });
    res.json(friends.map((f: any) => f.follower));
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Gets User info from DB
router.get('/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { sigils: true }
  });

  if (!user) {
    return res.status(404).json({ message: 'user could not be found' })
  };
  res.json(user);
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Updates User info from DB
router.patch('/:id', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    if (req.session.userId !== parseInt(req.params.id)) {
      return res.status(403).json({ error: 'Cannot edit another user' });
    }
    const { username, avatar, theme, homeLocation, hasCompletedTutorial, color_theme, sigilCount, destroyCount } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(username !== undefined && { username }),
        ...(avatar !== undefined && { avatar: parseInt(avatar) }),
        ...(theme !== undefined && { theme: parseInt(theme) }),
        ...(homeLocation !== undefined && { homeLocation }),
        ...(hasCompletedTutorial !== undefined && { hasCompletedTutorial: Boolean(hasCompletedTutorial) }),
        ...(color_theme !== undefined && { color_theme }),
        ...(sigilCount !== undefined && { sigilCount: parseInt(sigilCount) }),
        ...(destroyCount !== undefined && { destroyCount: parseInt(destroyCount) })
      },
    });
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Deletes User info from DB
router.delete('/:id', async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'user profile has been deleted' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/:userId/activities', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const friends = await prisma.follow.findMany({
      where: {
        followingId: userId,
        followerId: {
          in: await prisma.follow.findMany({
            where: { followerId: userId },
            select: { followingId: true }
          }).then(f => f.map((f: any) => f.followingId))
        }
      },
      select: { followerId: true }
    });

    const friendIds = friends.map(f => f.followerId);
    const visibleUserIds = [...new Set([...friendIds, ...narrativeIds, userId])];

    const gameUpdates = await prisma.activity.findMany({
      where: {
        userId,
        type: { in: ['group_added', 'narrative', 'sigilites'] },
        dismissed: false,
      },
      orderBy: { createdAt: 'desc' },
    });

    const feedEvents = await prisma.activity.findMany({
      where: {
        userId,
        type: { in: ['friend_map_sigil', 'sigil_voted', 'new_follower'] },
        dismissed: false,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    res.json({ gameUpdates, feedEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

router.patch('/:id/activity-dismiss', async (req, res) => {
  try {
    const activity = await prisma.activity.update({
      where: { id: parseInt(req.params.id) },
      data: { dismissed: true }
    });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});




export default router;
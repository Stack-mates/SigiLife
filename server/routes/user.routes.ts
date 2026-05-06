import { Router } from 'express';
import prisma from '../prisma/prisma.client.js';

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
    const { followerId, followingId } = req.body;
    const follow = await prisma.follow.create({
      data: {
        followerId: parseInt(followerId),
        followingId: parseInt(followingId)
      }
    })
    res.json(follow);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});


router.patch('/unfollow', async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: parseInt(followerId),
          followingId: parseInt(followingId)
        }
      }
    });
    res.json({ message: 'user has been unfollowed!' });
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
    const { username, avatar, theme, homeLocation, hasCompletedTutorial } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(username !== undefined && { username }),
        ...(avatar !== undefined && { avatar: parseInt(avatar) }),
        ...(theme !== undefined && { theme: parseInt(theme) }),
        ...(homeLocation !== undefined && { homeLocation }),
        ...(hasCompletedTutorial !== undefined && { hasCompletedTutorial: Boolean(hasCompletedTutorial) }),
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





export default router;
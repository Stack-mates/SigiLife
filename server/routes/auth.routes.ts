import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import prisma from '../prisma/prisma.client.js';
import 'express-session';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// const narrativeIds = [
//   process.env.MORGANA_USER_ID,
//   process.env.HARPER_USER_ID,
//   process.env.BENNET_USER_ID,
// ].filter(Boolean).map(Number);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Checks if User

router.get('/me', async (req, res) => {
  //   console.log('[/me] session:', req.session)
  // console.log('[/me] userId:', req.session.userId)
  if (!req.session.userId) {
    res.json({ user: null });
    return;
  }
  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
  });
  if (!user) {
    res.json({ user: null });
    return;
  }
  const needsProfile = !user.username || user.avatar === null || user.theme === null || !user.homeLocation


  res.json({ user, needsProfile });
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Sends to Google/ Returns token
router.post('/google', async (req, res) => {
  try {
    const { credential, username, avatar, theme, color_theme, homeLocation, sigilCount, destroyCount } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      res.status(401).json({ error: 'invalid token' });
      return;
    }

    const { email, name, picture, sub: googleId } = payload;

    if (!email || !googleId) {
      res.status(401).json({ error: 'Missing requirements email or gid' });
      return;
    }
    let user = await prisma.user.findUnique({ where: { googleId } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email, name, picture, googleId,
          username,
          ...(avatar != null && { avatar: parseInt(avatar) }),
          ...(theme != null && { theme: parseInt(theme) }),
          ...(color_theme != null && { color_theme }),
          homeLocation: homeLocation || null,

        },

      });


      // const alwaysFollow = [
      //   process.env.HARPER_USER_ID,
      //   process.env.BENNET_USER_ID,
      // ].filter(Boolean).map(Number);

      // const teamFollow = avatar === 0
      //   ? [process.env.ALISTAR_USER_ID].filter(Boolean).map(Number)
      //   : [process.env.MORGANA_USER_ID].filter(Boolean).map(Number);

      // const narrativeIds = [...new Set([...alwaysFollow, ...teamFollow])];

      // if (narrativeIds.length > 0) {
      //   await prisma.follow.createMany({
      //     data: narrativeIds.flatMap(id => ([
      //       { followerId: user.id, followingId: id },
      //       { followerId: id, followingId: user.id }
      //     ]))
      //   });
      // }
      // await prisma.sigil.createMany({
      //   data: Array.from({ length: 12 }, (_, i) => ({
      //     name: `sigil-${user!.id}-${i + 1}`,
      //     userId: user!.id,
      //   })),
      // });
    } else if (username || homeLocation) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          username: username || user.username,
          ...(avatar != null && { avatar: parseInt(avatar) }),
          ...(theme != null && { theme: parseInt(theme) }),
          ...(color_theme != null && { color_theme }),
          homeLocation: homeLocation || user.homeLocation,
          sigilCount: sigilCount || user.sigilCount,
          destroyCount: destroyCount || user.destroyCount,
        }
      });
    }


    req.session.userId = user.id;

    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => {
        if (err) { reject(err); }
        else { resolve(); }
      });
    });

    const needsProfile = !user.username || user.avatar === null || user.theme === null || !user.homeLocation

    res.json({ success: true, needsProfile, user });

  } catch (error) {
    console.error('Google Auth error: ', error);
    res.status(500).json({ error: (error as Error).message });
  }
});



router.post('/email-signup', (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'No email' })
  const line = `${new Date().toISOString()},${email}\n`
  fs.appendFileSync(path.join(__dirname, 'signups.csv'), line)
  res.json({ success: true })
})


router.get('/email-signup/download', (req, res) => {
  const filePath = path.join(__dirname, 'signups.csv')
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'No signups yet' })
  res.download(filePath, 'signups.csv')
})

export default router;

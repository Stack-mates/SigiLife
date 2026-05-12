import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma.client.js';

const router = Router();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get Sigil Count
router.get('/user/:userId/count', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const sigilCount = await prisma.sigil.count({
      where: { userId }
    });

    res.json({
      userId,
      count: sigilCount,
      maxSigils: 12,
      canCreateMore: sigilCount < 12,
      remainingSlots: 12 - sigilCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get All Sigils
router.get('/allsigils', async (req, res) => {
  try {
    const sigils = await prisma.sigil.findMany({
      orderBy: { createdAt: 'desc' },
      include: { sigilGroups: true, user: { select: { username: true } } },
    });
    const userId = (req.session as any).userId;
    if (userId) {
      const votes = await prisma.sigilVote.findMany({
        where: { userId, sigilId: { in: sigils.map(s => s.id) } },
      });
      const voteMap = Object.fromEntries(votes.map(v => [v.sigilId, v.voteType]));
      return res.json(sigils.map(s => ({
        ...s,
        userVote: voteMap[s.id] ?? null,
        creatorUsername: s.user?.username ?? null,
      })));
    }
    res.json(sigils.map(s => ({
      ...s,
      userVote: null,
      creatorUsername: s.user?.username ?? null,
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get User Sigils
router.get('/user/:userId/sigils', async (req, res) => {
  try {
    const sigils = await prisma.sigil.findMany({
      where: { userId: parseInt(req.params.userId) },
      orderBy: { createdAt: 'desc' },
      include: { sigilGroups: true },
    });
    const userId = (req.session as any).userId;
    if (userId) {
      const votes = await prisma.sigilVote.findMany({
        where: { userId, sigilId: { in: sigils.map(s => s.id) } }
      });
      const voteMap = Object.fromEntries(votes.map(v => [v.sigilId, v.voteType]));
      return res.json(sigils.map(s => ({ ...s, userVote: voteMap[s.id] ?? null })));
    }
    res.json(sigils.map(s => ({ ...s, userVote: null })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Content Filter
router.post('/filter-content', async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) return res.json({ censored: text });

  try {
    const response = await fetch('https://api.apilayer.com/bad_words', {
      method: 'POST',
      headers: {
        'apikey': process.env.BAD_WORDS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json() as any;
    const censored = data?.censored_content
      ? data.censored_content.slice(9, -2)
      : text;
    res.json({ censored });
  } catch (error) {
    res.json({ censored: text });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Vote on Sigil
router.post('/:sigilId/vote', async (req: Request, res: Response) => {
  try {
    const userId = (req.session as any).userId;
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const sigilId = parseInt(req.params.sigilId as string);
    const { voteType } = req.body; // "charge" | "destroy"

    if (!voteType || !['charge', 'destroy'].includes(voteType)) {
      return res.status(400).json({ error: 'voteType must be "charge" or "destroy"' });
    }

    const existingVote = await prisma.sigilVote.findUnique({
      where: { sigilId_userId: { sigilId, userId } },
    });

    let updatedSigil;

    if (!existingVote) {
      // New vote — create and increment
      await prisma.sigilVote.create({
        data: { sigilId, userId, voteType },
      });
      updatedSigil = await prisma.sigil.update({
        where: { id: sigilId },
        data: {
          chargeScore: voteType === 'charge' ? { increment: 1 } : undefined,
          destroyScore: voteType === 'destroy' ? { increment: 1 } : undefined,
        },
      });
    } else if (existingVote.voteType === voteType) {
      // Same vote — toggle off
      await prisma.sigilVote.delete({
        where: { sigilId_userId: { sigilId, userId } },
      });
      updatedSigil = await prisma.sigil.update({
        where: { id: sigilId },
        data: {
          chargeScore: voteType === 'charge' ? { decrement: 1 } : undefined,
          destroyScore: voteType === 'destroy' ? { decrement: 1 } : undefined,
        },
      });
    } else {
      // Different vote — switch
      await prisma.sigilVote.update({
        where: { sigilId_userId: { sigilId, userId } },
        data: { voteType },
      });
      updatedSigil = await prisma.sigil.update({
        where: { id: sigilId },
        data:
          voteType === 'charge'
            ? { chargeScore: { increment: 1 }, destroyScore: { decrement: 1 } }
            : { destroyScore: { increment: 1 }, chargeScore: { decrement: 1 } },
      });
    }

    const newVote = await prisma.sigilVote.findUnique({
      where: { sigilId_userId: { sigilId, userId } },
    });

    res.json({
      chargeScore: updatedSigil.chargeScore,
      destroyScore: updatedSigil.destroyScore,
      userVote: newVote?.voteType ?? null,
    });
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Patch One Sigil
router.patch('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const sigil = await prisma.sigil.update({
      where: { id: parseInt(req.params.id) },
      data: { ...(name && { name }) },
    });
    res.json(sigil);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get Vote Status
router.get('/:id/vote-status', async (req, res) => {
  try {
    const userId = (req.session as any).userId;
    if (!userId) return res.json({ userVote: null });

    const vote = await prisma.sigilVote.findUnique({
      where: { sigilId_userId: { sigilId: parseInt(req.params.id), userId } },
    });

    res.json({ userVote: vote?.voteType ?? null });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get One Sigil
// NOTE: this wildcard must stay AFTER all specific routes above
router.get(`/:id`, async (req, res) => {
  try {
    const sigil = await prisma.sigil.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { sigilGroups: true },
    });
    if (!sigil) {
      return res.status(404).json({ message: 'sigil not found' })
    }
    res.json(sigil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message })
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Save Sigil

router.post('/', async (req, res) => {
  try {
    const { name, userId, intention, canvasData, imageData, locationName, latitude, longitude, groupMembers } = req.body;

    const userId_ = req.session.userId;
    if (!userId_) {
      return res.status(401).json({ error: 'Please log in to save sigils.' });
    }
    const sigilCount = await prisma.sigil.count({ where: { userId: userId_ } });
    if (sigilCount >= 12) {
      return res.status(403).json({ error: 'Sigil limit reached. Destroy an existing sigil before creating a new one.' });
    }

    const sigil = await prisma.sigil.create({
      data: {
        name,
        userId,
        intention,
        canvasData,
        imageData,
        locationName,
        latitude,
        longitude,
        ...(groupMembers?.length > 0 && {
          sigilGroups: {
            create: groupMembers.map((username: string) => ({ groupMember: username })),
          },
        }),
      },
    });

    res.json({ id: sigil.id, message: 'Sigil saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Share Sigil
router.post('/share', async (req, res) => {
  try {
    const { sigilId, targetUserIds } = req.body;

    const sourceSigil = await prisma.sigil.findUnique({
      where: { id: parseInt(sigilId) }
    });

    if (!sourceSigil) {
      return res.status(404).json({ error: 'Source sigil not found' });
    }

    const results = [];

    for (const targetId of targetUserIds) {
      const parsedTargetId = parseInt(targetId);

      const count = await prisma.sigil.count({
        where: { userId: parsedTargetId }
      });

      if (count >= 12) {
        results.push({ targetId: parsedTargetId, status: 'failed', reason: 'Library full' });
        continue;
      }

      await prisma.sigil.create({
        data: {
          name: sourceSigil.name,
          userId: parsedTargetId,
          intention: sourceSigil.intention,
          canvasData: sourceSigil.canvasData,
          imageData: sourceSigil.imageData,
          isCharged: false,
        }
      });
      results.push({ targetId: parsedTargetId, status: 'success' });
    }

    res.json({ message: 'Sharing complete', results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Charge Sigil
router.patch('/:id/charge', async (req, res) => {
  try {
    const sigil = await prisma.sigil.update({
      where: { id: parseInt(req.params.id) },
      data: { isCharged: true }
    });
    res.json(sigil);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Update Sigil Location
router.patch('/:id/location', async (req, res) => {
  try {
    const { locationName, latitude, longitude } = req.body;

    const sigil = await prisma.sigil.update({
      where: { id: parseInt(req.params.id) },
      data: { locationName, latitude, longitude }
    });
    res.json(sigil);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Delete Sigil
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('deleting sigil id:', id);
    await prisma.sigil.deleteMany({ where: { id } });
    res.json({ message: 'destroyed sigil' });
  } catch (error) {
    console.error('prisma delete error:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
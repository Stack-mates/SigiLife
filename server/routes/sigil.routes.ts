import { Router } from 'express';
import  prisma  from '../../prisma/prisma.client'

const router = Router();


router.get('/', async (req, res) => {
  try {

    const sigils = await prisma.sigil.findMany({
      orderBy: { createdAt: 'desc' },
      include: { sigilGroups: true },
    });

    res.json(sigils);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, userId, intention, canvasData, imageData } = req.body;

    const sigil = await prisma.sigil.create({
      data: {
        name,
        userId: userId || 1,
        intention,
        canvasData,
        imageData,
      },
    });

    res.json({ id: sigil.id, message: 'Sigil saved successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

router.patch('/:id/charge', async (req, res) => {
  try {

    const sigil = await prisma.sigil.update({
      where: { id: parseInt(req.params.id) },
      data: { isCharged: true }
    });
    res.json(sigil)

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.delete('/:id', async (req, res) => {
  try {

    await prisma.sigil.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'destroyed sigil' })

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
})

export default router;
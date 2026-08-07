const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// GET all villas
router.get('/', async (req, res) => {
  try {
    const villas = await prisma.villa.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(villas);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET a single villa
router.get('/:id', async (req, res) => {
  try {
    const villa = await prisma.villa.findUnique({
      where: { id: req.params.id }
    });
    if (!villa) return res.status(404).json({ error: 'Villa not found' });
    res.json(villa);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST a new villa
router.post('/', async (req, res) => {
  try {
    const { name, location, description, basePrice, imageUrl } = req.body;
    const villa = await prisma.villa.create({
      data: { name, location, description, basePrice: parseFloat(basePrice), imageUrl }
    });
    res.status(201).json(villa);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create villa', details: error.message });
  }
});

// PUT update a villa
router.put('/:id', async (req, res) => {
  try {
    const { name, location, description, basePrice, imageUrl } = req.body;
    const villa = await prisma.villa.update({
      where: { id: req.params.id },
      data: { 
        name, 
        location, 
        description, 
        basePrice: basePrice ? parseFloat(basePrice) : undefined, 
        imageUrl 
      }
    });
    res.json(villa);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update villa', details: error.message });
  }
});

// DELETE a villa
router.delete('/:id', async (req, res) => {
  try {
    await prisma.villa.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete villa' });
  }
});

module.exports = router;

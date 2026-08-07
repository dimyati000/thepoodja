const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// GET all sliders
router.get('/', async (req, res) => {
  try {
    const sliders = await prisma.slider.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST a new slider
router.post('/', async (req, res) => {
  try {
    const { title, tag, price, imageUrl, order } = req.body;
    const slider = await prisma.slider.create({
      data: { title, tag, price, imageUrl, order: parseInt(order) || 0 }
    });
    res.status(201).json(slider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create slider', details: error.message });
  }
});

// PUT update a slider
router.put('/:id', async (req, res) => {
  try {
    const { title, tag, price, imageUrl, order } = req.body;
    const slider = await prisma.slider.update({
      where: { id: req.params.id },
      data: { 
        title, 
        tag, 
        price, 
        imageUrl, 
        order: order !== undefined ? parseInt(order) : undefined 
      }
    });
    res.json(slider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update slider', details: error.message });
  }
});

// DELETE a slider
router.delete('/:id', async (req, res) => {
  try {
    await prisma.slider.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete slider' });
  }
});

module.exports = router;

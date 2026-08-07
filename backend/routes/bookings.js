const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// Get all bookings (for Admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: true, villa: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    console.error("Failed to fetch all bookings:", error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get bookings for a user
router.get('/user/:email', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: req.params.email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { villa: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Create a booking
router.post('/', async (req, res) => {
  try {
    const { email, villaId, checkIn, checkOut, guests, totalPrice } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        villaId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests: parseInt(guests),
        totalPrice: parseFloat(totalPrice)
      }
    });
    
    // Add points (e.g. 1 point per 1,000,000 Rp)
    const earnedPoints = Math.floor(booking.totalPrice / 1000000);
    await prisma.user.update({
      where: { id: user.id },
      data: { points: { increment: earnedPoints } }
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Failed to create booking:", error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Update booking status (for Admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(booking);
  } catch (error) {
    console.error("Failed to update booking status:", error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

module.exports = router;

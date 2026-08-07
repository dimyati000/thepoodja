const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// Sync User from Google Auth
router.post('/sync', async (req, res) => {
  try {
    const { email, firstName, lastName, avatarUrl } = req.body;
    
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        avatarUrl,
      },
      create: {
        email,
        firstName,
        lastName,
        avatarUrl,
      }
    });
    
    res.json(user);
  } catch (error) {
    console.error("Failed to sync user:", error);
    res.status(500).json({ error: 'Failed to sync user' });
  }
});

// Get all users (for Admin)
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    console.error("Failed to fetch all users:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get User Profile
router.get('/:email', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { email: req.params.email },
      include: { bookings: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update User Profile
router.put('/:email', async (req, res) => {
  try {
    const { firstName, lastName, dob, gender, nationality, phone } = req.body;
    const user = await prisma.user.update({
      where: { email: req.params.email },
      data: {
        firstName,
        lastName,
        dob: dob ? new Date(dob) : null,
        gender,
        nationality,
        phone
      }
    });
    res.json(user);
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;

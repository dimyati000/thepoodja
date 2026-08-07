const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

// GET all admins
router.get('/', async (req, res) => {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.json(admins);
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// POST new admin
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if exists
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword
      },
      select: { id: true, email: true, createdAt: true }
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error("Failed to create admin:", error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// PUT (update) admin
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    
    const updateData = {};
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, createdAt: true }
    });

    res.json(updatedAdmin);
  } catch (error) {
    console.error("Failed to update admin:", error);
    res.status(500).json({ error: 'Failed to update admin' });
  }
});

// DELETE admin
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.admin.delete({ where: { id } });
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error("Failed to delete admin:", error);
    res.status(500).json({ error: 'Failed to delete admin' });
  }
});

module.exports = router;

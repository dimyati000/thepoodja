const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Email/Password Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if admin exists in DB
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: 'Email not registered as admin.' });
    }

    // Since users need to be added manually first, we should allow them to set a password 
    // if they log in and it's null (for the first time), or just compare if it exists.
    // For simplicity, we just check if it matches.
    if (!admin.password) {
      return res.status(401).json({ error: 'Password not set for this admin.' });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Generate JWT (Though frontend relies mostly on Supabase session for layout,
    // we can return a JWT for future use or just a success flag)
    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    
    res.json({ success: true, token, email: admin.email });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: 'Authentication failed.' });
  }
});

// Google Verification (Pencegat Keamanan)
router.post('/verify-google', async (req, res) => {
  try {
    const { email } = req.body;
    
    const admin = await prisma.admin.findUnique({ where: { email } });
    
    if (!admin) {
      return res.status(403).json({ error: 'Email not registered as admin.' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Verify google error:", error);
    res.status(500).json({ error: 'Verification failed.' });
  }
});

module.exports = router;

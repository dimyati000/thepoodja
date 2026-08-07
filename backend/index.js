const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Poodja API' });
});

// Routes
app.use('/api/villas', require('./routes/villas'));
app.use('/api/sliders', require('./routes/sliders'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admins', require('./routes/admins'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Restarted for admins route

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Waitlist = require('./models/Waitlist');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://www.panacea-tech.com',
    'https://panacea-tech.com'
  ]
}));
app.use(express.json());

// Basic route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Add this new endpoint
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    const existingEmail = await Waitlist.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ 
        message: 'This email is already on our waitlist!' 
      });
    }

    // Create new waitlist entry
    const waitlistEntry = new Waitlist({ email });
    await waitlistEntry.save();

    res.status(201).json({ 
      message: 'Successfully added to waitlist!' 
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    res.status(500).json({ 
      message: 'Error adding to waitlist' 
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); 
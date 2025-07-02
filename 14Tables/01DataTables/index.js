const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require('./models/users.model');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));



mongoose.connect('mongodb://127.0.0.1:27017/users-demo')
  .then(() => console.log('Database Connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

  

app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});




app.listen(4000, () => {
  console.log(`Server is running on http://localhost:4000`);
});

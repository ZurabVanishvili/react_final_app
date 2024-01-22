const express = require('express');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const router = jsonServer.router('db.json');
const app = express();
const port = 3000;

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    req.user = jwt.verify(token, 'your_secret_key');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Login route
app.post('/login', async (req, res) => {
  const { login, password } = req.body;

  const user = router.db.users.find(user => user.login === login);

  if (!user) {
    res.status(401).json({ message: 'Invalid login' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid password' });
    return;
  }

  const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

  res.json({ token });
});

// Protected route (example)
app.get('/protected-data', authenticate, (req, res) => {
  res.json({ message: 'You are authorized to view this data' });
});

// Add CORS middleware
app.use(cors());

// Mount json-server router
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

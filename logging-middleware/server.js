import express from 'express';
import { loggingMiddleware } from './middleware.js';

const app = express();
const PORT = 3000;

// Enable JSON body parsing
app.use(express.json());

// Use logging middleware
app.use(loggingmiddleware);

// Sample route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Logging middleware works!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

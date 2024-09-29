import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Willkommen' });
});

// Start server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

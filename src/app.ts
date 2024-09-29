import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { setupDatabase } from './config/database';
import homeRouter from './routes/home'; // Importieren Sie den Home-Router
import authRouter from './routes/auth'; // Importieren Sie den Auth-Router

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', homeRouter); // Verwenden Sie den Home-Router
app.use('/auth', authRouter); // Verwenden Sie den Auth-Router

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  console.log('Attempting to render error page at:', path.join(__dirname, '../views/pages/error.ejs'));
  res.status(500).render('pages/error', { title: 'Error', message: 'Something went wrong!' });
});

// Initialisiere die Datenbank
setupDatabase().then(() => {
  console.log('Database initialized');
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;

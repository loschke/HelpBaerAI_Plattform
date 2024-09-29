import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { setupDatabase, openDb } from './config/database';
import { getUserById } from './models/User';
import homeRouter from './routes/home';
import authRouter from './routes/auth';
import profileRouter from './routes/profile';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Middleware to make user data available to all views
app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session && req.session.userId) {
    try {
      const db = await openDb();
      const user = await getUserById(db, req.session.userId);
      if (user) {
        res.locals.user = user;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  next();
});

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  console.log('Attempting to render error page at:', path.join(__dirname, '../views/pages/error.ejs'));
  res.status(500).render('pages/error', { title: 'Error', message: 'Something went wrong!' });
});

// Initialize the database
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

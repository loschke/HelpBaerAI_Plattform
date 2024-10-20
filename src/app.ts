import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { openDb } from './config/database';
import { getUserById } from './models/User';
import homeRouter from './routes/home';
import authRouter from './routes/auth';
import profileRouter from './routes/profile';
import assistantsRouter from './routes/assistants';
import sampleTextRouter from './routes/sample-text';
import dotenv from 'dotenv';
dotenv.config();
import webhookRoutes from './routes/webhook';
import cors from 'cors';
import newsletterRoutes from './routes/newsletter';
import adminRoutes from './routes/admin';
import logger from './utils/logger'; // Importieren Sie den Logger

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
        connectSrc: ["'self'", "https://hook.eu2.make.com"]
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
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Middleware to make user data available to all views
app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.debug('Session ID: %s', req.sessionID);
  logger.debug('Session data: %O', req.session);
  
  if (req.session && req.session.userId) {
    logger.debug('User ID from session: %s', req.session.userId);
    try {
      const db = await openDb();
      const user = await getUserById(db, req.session.userId);
      if (user) {
        logger.debug('User found: %s', user.email);
        res.locals.user = user;
      } else {
        logger.debug('User not found for ID: %s', req.session.userId);
      }
    } catch (error) {
      logger.error('Error fetching user data: %O', error);
    }
  } else {
    logger.debug('No user ID in session');
  }
  next();
});

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Redirect middleware for assistants
app.use((req, res, next) => {
  const assistantRoutes = [
    '/concept-generation',
    '/analysis-evaluation',
    '/text-optimization',
    '/storytelling',
    '/website-analysis',
    '/data-analysis'
  ];
  
  if (assistantRoutes.includes(req.path)) {
    return res.redirect(`/assistants${req.path}`);
  }
  next();
});

// Routes
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/assistants', assistantsRouter);
app.use('/api/sample-text', sampleTextRouter);
app.use(newsletterRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error: %O', err);
  res.status(500).send('Something broke!');
});

// Initialize the database
openDb().then(() => {
  app.listen(port, () => {
    logger.info('Server running at http://localhost:%d', port);
  });
}).catch((err: Error) => {
  logger.error('Failed to open database: %O', err);
});

// Register webhook routes
app.use('/api', webhookRoutes);

// CORS configuration
app.use(cors({
  origin: 'https://hook.eu2.make.com'
}));

export default app;

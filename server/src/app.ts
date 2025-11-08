import express from 'express';
import authRoutes from './routes/auth.routes';
import applicationsRoutes from './routes/applications.routes';
import { logger } from './utils/logger';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger for development
app.use((req, res, next) => {
  try {
    const shortBody = req.body ? (() => {
      try { return JSON.stringify(req.body).slice(0, 1000); } catch { return '[unserializable body]'; }
    })() : '';
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${shortBody ? '- body:' : ''}`, shortBody);
  } catch (err) {
    // ignore logging errors
  }
  next();
});

// Simple CORS middleware for local development. If you prefer the `cors` package,
// install it and replace this with `app.use(cors({ origin: true }))`.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    return res.status(200).end();
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
// also expose legacy /auth for the auth frontend (it posts to /auth/...)
app.use('/auth', authRoutes);
app.use('/api/applications', applicationsRoutes);

// Error handling (typed)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err?.stack || err);
  res.status(500).json({ message: 'Something broke!', error: err?.message || String(err) });
});

export default app;
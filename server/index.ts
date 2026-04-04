import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import session from 'express-session';
import 'express-session';

import authRouter from './routes/auth.routes.js';
import sigilRouter from './routes/sigil.routes.js';
import userRouter from './routes/user.routes.js';
import { sessionStore } from './sessionStore.js';
import client from './prisma/prisma.client.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set('trust proxy', 1);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(compression());

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production' && process.env.ENABLE_HTTPS === 'true',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}));

app.use('/api/auth', authRouter);
app.use('/api/sigils', sigilRouter);
app.use('/api/users', userRouter);

const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

app.get('/*splat', (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

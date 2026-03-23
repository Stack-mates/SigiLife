import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Routes
app.get('/', (req, res) => {
  res.send('Hello SigiLife!');
});

app.post('/auth', (req, res) => {
  res.json({
    user: 'HopeyQueenie',
    gmail: 'someGmail@gmail.com',
    friends: ['BernMan'],
    avatar: 2,
    theme: 1,
    admin: true,
    sigils: [
      {
        sigilOne: {
          name: 'sigilOne',
          created_at: '2026-03-22T00:00:00.001Z',
          isCharged: false,
          location: { name: 'sigil-here', latitude: 1, longitude: 1 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilTwo: {
          name: 'sigilTwo',
          created_at: '2026-03-22T00:00:00.002Z',
          isCharged: false,
          location: { name: 'sigil-here2', latitude: 2, longitude: 2 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilThree: {
          name: 'sigilThree',
          created_at: '2026-03-22T00:00:00.003Z',
          isCharged: false,
          location: { name: 'sigil-here3', latitude: 3, longitude: 3 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilFour: {
          name: 'sigilFour',
          created_at: '2026-03-22T00:00:00.004Z',
          isCharged: false,
          location: { name: 'sigil-here4', latitude: 4, longitude: 4 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilFive: {
          name: 'sigilFive',
          created_at: '2026-03-22T00:00:00.005Z',
          isCharged: false,
          location: { name: 'sigil-here5', latitude: 5, longitude: 5 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilSix: {
          name: 'sigilSix',
          created_at: '2026-03-22T00:00:00.006Z',
          isCharged: false,
          location: { name: 'sigil-here6', latitude: 6, longitude: 6 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilSeven: {
          name: 'sigilSeven',
          created_at: '2026-03-22T00:00:00.007Z',
          isCharged: false,
          location: { name: 'sigil-here7', latitude: 7, longitude: 7 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilEight: {
          name: 'sigilEight',
          created_at: '2026-03-22T00:00:00.008Z',
          isCharged: false,
          location: { name: 'sigil-here8', latitude: 8, longitude: 8 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilNine: {
          name: 'sigilNine',
          created_at: '2026-03-22T00:00:00.009Z',
          isCharged: false,
          location: { name: 'sigil-here9', latitude: 9, longitude: 9 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilTen: {
          name: 'sigilTen',
          created_at: '2026-03-22T00:00:00.010Z',
          isCharged: false,
          location: { name: 'sigil-here10', latitude: 10, longitude: 10 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilEleven: {
          name: 'sigilEleven',
          created_at: '2026-03-22T00:00:00.011Z',
          isCharged: false,
          location: { name: 'sigil-here11', latitude: 11, longitude: 11 },
          sigilGroup: ['BernMan'],
        },
      },
      {
        sigilTwelve: {
          name: 'sigilTwelve',
          created_at: '2026-03-22T00:00:00.012Z',
          isCharged: false,
          location: { name: 'sigil-here12', latitude: 12, longitude: 12 },
          sigilGroup: ['BernMan'],
        },
      },
      { sigilThirteen: null },
    ],
  });
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});

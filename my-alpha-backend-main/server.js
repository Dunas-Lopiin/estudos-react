import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import auth from './routes/auth.js';
import register from './routes/register.js';
import deleteUser from './routes/delete.js';
import viewRoute from './routes/view.js';
import edit from './routes/edit.js';

const app = express();
const port = 3001;

// middlewares
app.use(
  cors({
    origin: ['https://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json({ limit: '8 mb' }));
app.use(cookieParser());

app.use('/auth', auth);
app.use('/register', register);
app.use('/delete', deleteUser);
app.use('/view', viewRoute);
app.use('/edit', edit);

app.listen(port, () => console.log(`Server started on port ${port}`));

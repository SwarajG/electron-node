import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import router from './routes';
import { dbHost, dbUser, dbPassword, port } from './config';
import './auth/googleAuth';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'todo-session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(dbHost, {
  user: dbUser,
  pass: dbPassword,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', () => {
  console.error.bind(console, 'connection error:');
});
db.once('open', () => {
  app.use('/', router);
});
app.listen(port, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${port}`);
});

import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST || '';
const dbUser = process.env.MONGO_USER || '';
const dbPassword = process.env.MONGO_PASSWORD || '';
const port = process.env.PORT || 8080;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

export { dbHost, dbUser, dbPassword, port, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID };

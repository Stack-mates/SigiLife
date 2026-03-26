import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const url = new URL(process.env.DATABASE_URL)

const adapter = new PrismaMariaDb({
  host: url.hostname,
  user: url.username,
  password: url.password || undefined,
  database: url.pathname.slice(1),
  port: url.port ? parseInt(url.port) : 3306,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });
export default prisma;

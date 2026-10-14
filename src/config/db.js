import knex from 'knex';
import { ENV } from './env.js';

export const db = knex({
  client: 'pg',
  connection: {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    database: ENV.DB_NAME,
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
  },
  pool: { min: 2, max: 10 },
});
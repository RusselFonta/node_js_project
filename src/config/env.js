import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('8000').transform(Number),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly']).default('info'),

  // configuration of the database postsql
  DB_HOST: z.string().default('127.0.0.1'),
  DB_PORT: z.string().default('5432').transform(Number),
  DB_NAME: z.string().default('class_project_db'),
  DB_USER: z.string().default('express_user'),
  DB_PASSWORD: z.string().default('westbrook99'),
});

export const ENV = envSchema.parse(process.env);
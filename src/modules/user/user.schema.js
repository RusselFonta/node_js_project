import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
  }),
});

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID'),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID'),
  }),
});

export const getUsersQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((trans) => (trans ? Math.max(1, parseInt(trans, 10)) : 1)),
    limit: z
      .string()
      .optional()
      .transform((trans) => (trans ? Math.max(1, parseInt(trans, 10)) : 10)),
    search: z.string().optional().default(''),
  }),
});
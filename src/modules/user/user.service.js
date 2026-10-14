import { db } from '#src/config/db.js';
import { AppError } from '#src/middlewares/error-handler.js';

export const userService = {
  // Get all users with search and pagination
  getAllUsers: async ({ skip = 0, limit = 10, search = '' } = {}) => {
    // 1. Build the base query for filtering by name
    const query = db('users');

    if (search) {
      // ILIKE performs a case-insensitive search in PostgreSQL
      query.where('name', 'ILIKE', `%${search}%`);
    }

    // 2. Fetch paginated users
    const users = await query
      .clone()
      .select('id', 'name', 'email', 'created_at as createdAt')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(skip);

    // 3. Get total count of matching records
    const [{ count }] = await query.clone().count('* as count');

    return {
      users,
      total: parseInt(count, 10),
    };
  },

  // Get user by ID
  getUserById: async (id) => {
    const user = await db('users')
      .select('id', 'name', 'email', 'created_at as createdAt')
      .where({ id })
      .first();

    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  },

  // Create user
  createUser: async (data) => {
    const existingUser = await db('users').where({ email: data.email }).first();
    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    const [newUser] = await db('users')
      .insert({
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        created_at: new Date(),
      })
      .returning(['id', 'name', 'email', 'created_at as createdAt']);

    return newUser;
  },

  // Delete user
  deleteUser: async (id) => {
    const deletedCount = await db('users').where({ id }).del();
    if (!deletedCount) {
      throw new AppError('User not found', 404);
    }
  },
};
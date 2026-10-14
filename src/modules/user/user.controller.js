import { userService } from './user.service.js';

export const userController = {
  // GET /v1/users (with search and pagination)
  getAllUsers: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search || '';

      const skip = (page - 1) * limit;

      const { users, total } = await userService.getAllUsers({ skip, limit, search });

      return res.status(200).json({
        success: true,
        data: users,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /v1/users/:id
  getUserById: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.params.id);
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /v1/users
  createUser: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /v1/users/:id
  deleteUser: async (req, res, next) => {
    try {
      await userService.deleteUser(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
import { Router } from 'express';
import { validate } from '#src/middlewares/validate.js';
import { userController } from './user.controller.js';
import {
  createUserSchema,
  getUserByIdSchema,
  deleteUserSchema,
  getUsersQuerySchema, // Match the schema export name from user.schema.js
} from './user.schema.js';

const router = Router();

// GET /v1/users with pagination query validation
router.get('/v1/users', validate(getUsersQuerySchema), userController.getAllUsers);

// GET /v1/users/:id
router.get('/v1/users/:id', validate(getUserByIdSchema), userController.getUserById);

// POST /v1/users
router.post('/v1/users', validate(createUserSchema), userController.createUser);

// DELETE /v1/users/:id
router.delete('/v1/users/:id', validate(deleteUserSchema), userController.deleteUser);

export default router;
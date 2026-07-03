import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { userValidationRules, runValidation } from '../middleware/validateUser.js';

const router = Router();

router.route('/').get(getUsers).post(userValidationRules, runValidation, createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(userValidationRules, runValidation, updateUser)
  .delete(deleteUser);

export default router;

import { Router } from 'express';
import { login } from '../controllers/authController';
import { loginSchema } from '../validations/authValidation';

const router = Router();

router.post('/login', validate(loginSchema), login);

export default router;


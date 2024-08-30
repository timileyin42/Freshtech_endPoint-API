import { Router } from 'express';
import { getDashboard, airtimeToCash } from '../controllers/dashboardController';
import { validate } from '../middleware/validationMiddleware';
import { airtimeToCashSchema } from '../validations/dashboardValidation';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/dashboard', getDashboard);
router.post('/airtime-to-cash', validate(airtimeToCashSchema), airtimeToCash);

export default router;


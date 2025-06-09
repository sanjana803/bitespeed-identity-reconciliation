import { Router } from 'express';
import { identifyContact } from '../controllers/contactController';
import { validateIdentifyRequest } from '../middlewares/validationMiddleware';

const router = Router();

router.post('/identify', validateIdentifyRequest, identifyContact);

export default router; 
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import { isValidEmail, isValidPhoneNumber } from '../utils/helpers';

export const validateIdentifyRequest = (req: Request, res: Response, next: NextFunction) => {
  const { email, phoneNumber } = req.body;
  if (email && !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  next();
};

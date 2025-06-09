import { Request, Response } from 'express';
import { identifyContactService } from '../services/contactService';

export const identifyContact = async (req: Request, res: Response) => {
  try {
    const result = await identifyContactService(req.body);
    return res.json({ contact: result });
  } catch (error) {
    console.error('Error in identifyContact:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}; 
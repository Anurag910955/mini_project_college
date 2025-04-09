import express from 'express';
import { bookEvent } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', bookEvent);

export default router;
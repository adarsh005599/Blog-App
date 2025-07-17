// validateRoutes.js
import express from 'express';
import { validateToken } from '../controllers/validateController.js';

const router = express.Router();

router.get('/', validateToken); // GET /api/validate

export { router as validateRouter };

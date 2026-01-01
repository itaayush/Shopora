import express from 'express';
import { requireSignIn } from '../middlewares/authMiddlewares.js';
import { getCategoryController, singleCategoryController } from '../controllers/categoryController.js';

const router = express.Router();



router.get('/get-category',getCategoryController )



router.get('/single-category/:id',singleCategoryController )

export default router;
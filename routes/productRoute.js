import express from 'express';
import formidable from 'express-formidable'
const router = express.Router();

import { requireSignIn } from '../middlewares/authMiddlewares.js';
import { getProductController, getProductPhotoController, getSingleProductController } from '../controllers/productController.js';

router.get('/get-product', getProductController)


router.get('/get-product/:id', getSingleProductController)


router.get('/product-photo/:productId', getProductPhotoController)

export default router;

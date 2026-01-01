import express from "express";
import { requireSignIn } from "../middlewares/authMiddlewares.js";
import { createOrderController, getOrdersController } from "../controllers/orderController.js";

const router = express.Router();


router.post("/create-order", requireSignIn, createOrderController);


router.get("/orders", requireSignIn, getOrdersController);

export default router;

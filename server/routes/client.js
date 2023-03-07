import express from "express";
import { getProduct, getProducts } from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);

export default router;

import express from "express";
import ProductController from "../controllers/productsController";
import { validateProduct } from "../middlewares/productValidate";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

// TODO checkAuth
router.get("/", ProductController.findAllProduct);
router.get("/:productId", ProductController.findOneProduct);
router.post("/", [checkAuth, validateProduct], ProductController.createOneProduct);
router.put("/:productId", [checkAuth, validateProduct], ProductController.updateProduct);
router.delete("/:productId", checkAuth, ProductController.deleteProduct);

export default router;

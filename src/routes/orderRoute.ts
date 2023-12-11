import { Router } from "express";

import OrderController from "../controllers/orderController";
import { checkAuth } from "../middlewares/checkAuth";
import {
  validateOrder,
} from "../middlewares/orderValidate";

const router = Router();

router.post("/", [checkAuth, validateOrder], OrderController.createOrder);
router.get("/user/:id", [checkAuth], OrderController.getAllUserOrders);
router.get("/offset", [checkAuth], OrderController.getAllOffset);
router.get(
  "/user/:id/offset",
  [checkAuth],
  OrderController.getAllUserOrdersOffset
);
router.get("/", [checkAuth], OrderController.getAll);
router.get("/:id", [checkAuth], OrderController.getOrder);
router.put("/:id", [checkAuth, validateOrder], OrderController.updateOrder);
router.delete("/:id", [checkAuth], OrderController.deleteOrder);

router.use((req, res, next) => {
  res.on("finish", () => {
    console.log("Record created:", {
      req,
      /* log data */
    });
  });
  next();
});

export default router;

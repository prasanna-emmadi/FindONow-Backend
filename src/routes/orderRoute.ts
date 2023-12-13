import { Router } from "express";
import { Tspec } from "tspec";
import OrderController from "../controllers/orderController";
import { checkAuth } from "../middlewares/checkAuth";
import { validateOrder } from "../middlewares/orderValidate";

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

/** Order schema Info */
interface Order {
  /** Order ID */
  _id: string;
  /** Date of the Order */
  date: string;
  /** Total amount of the Order */
  totalAmount: number;
}

export type OrderApiSpec = Tspec.DefineApiSpec<{
  tags: ["Order"];
  paths: {
    "/orders/": {
      get: {
        summary: "Gets all Orders";
        responses: { 200: Order[] };
      };
      post: {
        summary: "Creates Order";
        body: Order;
        responses: {
          201: Order;
          400: "bad request";
          403: "Forbidden";
          404: "Not found";
        };
      };
    };
    "/orders/{id}": {
      get: {
        summary: "Get Order by id";
        path: { id: number };
        responses: { 200: Order };
      };
      put: {
        summary: "Updates Order by id";
        path: { id: number };
        body: Order;
        responses: { 201: Order; 403: "Forbidden"; 404: "Not found" };
      };
      delete: {
        summary: "Deletes Order by id";
        path: { id: number };
        body: Order;
        responses: { 201: Order; 403: "Forbidden"; 404: "Not found" };
      };
    };
  };
}>;

export default router;

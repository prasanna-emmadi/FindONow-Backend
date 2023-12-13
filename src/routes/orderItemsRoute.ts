import express from "express";
import { Tspec } from "tspec";
import OrderDetailController from "../controllers/orderItemsController";
import { validateOrderDetail } from "../middlewares/orderItemValidate";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.get("/", [checkAuth], OrderDetailController.findAllOrderDetail);
router.get(
  "/:orderDetailId",
  [checkAuth],
  OrderDetailController.findOneOrderDetail
);
router.get("/offset", [checkAuth], OrderDetailController.findOrderDetailOffset);
router.post(
  "/",
  [checkAuth, validateOrderDetail],
  OrderDetailController.createOneOrderDetail
);
router.put(
  "/:orderDetailId",
  [checkAuth, validateOrderDetail],
  OrderDetailController.findOneAndUpdate
);
router.delete(
  "/:orderDetailId",
  [checkAuth],
  OrderDetailController.findOneAndDelete
);
router.use((req, res, next) => {
  res.on("finish", () => {
    console.log("Record created:", {
      /*log data */
    });
  });
  next();
});


/** OrderItem schema Info */
interface OrderItem {
  /** OrderItem ID */
  _id: string;
  /** Order id of the OrderItem */
  orderId: string;
  /** Product Id */
  product: string;
  /** Quantity of the Products */
  quantity: number;
  /** Price at time of purchase */
  priceAtPurchase: number;
}

export type OrderItemApiSpec = Tspec.DefineApiSpec<{
  tags: ["OrderItem"];
  paths: {
    "/orderItems/": {
      get: {
        summary: "Gets all OrderItems";
        responses: { 200: OrderItem[] };
      };
      post: {
        summary: "Creates OrderItem";
        body: OrderItem;
        responses: {
          201: OrderItem;
          400: "bad request";
          403: "Forbidden";
          404: "Not found";
        };
      };
    };
    "/orderItems/{id}": {
      get: {
        summary: "Get OrderItem by id";
        path: { id: number };
        responses: { 200: OrderItem };
      };
      put: {
        summary: "Updates OrderItem by id";
        path: { id: number };
        body: OrderItem;
        responses: { 201: OrderItem; 403: "Forbidden"; 404: "Not found" };
      };
      delete: {
        summary: "Deletes OrderItem by id";
        path: { id: number };
        body: OrderItem;
        responses: { 201: OrderItem; 403: "Forbidden"; 404: "Not found" };
      };
    };
  };
}>;


export default router;

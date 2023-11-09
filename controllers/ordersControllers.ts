import { NextFunction, Request, Response } from "express";
import OrdersService from "../services/ordersService.js";
import { ApiError } from "../errors/ApiError.js";


export async function findAllOrder(_: Request, res: Response) {
  const orders = await OrdersService.findAll();

  res.json({ orders });
}

export async function findOneOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const orderId = req.params.orderId;
  const order = await OrdersService.findone(orderId);

  if (!order) {
    next(ApiError.resourceNotFound("Order not found."));
    return;
  }

  res.json({ order });
}

export async function createOneOrder(req: Request, res: Response) {
  const newOrder = req.body;
  const order = await OrdersService.createOne(newOrder);

  res.status(201).json({ order });
}

export async function findOneAndUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newOrder = req.body;
  const orderId = req.params.orderId;
  const updatedOrder = await OrdersService.findOneAndUpdate(orderId, newOrder);

  if (!updatedOrder) {
    next(ApiError.resourceNotFound("Order not found."));
    return;
  }
   res.status(201).json({ updatedOrder });
}

export async function findOneAndDelete( req: Request, res: Response, next: NextFunction ) {
const orderId = req.params.orderId;
const deletedOrder = await OrdersService.findOneAndDelete(orderId);

if(!deletedOrder) {
    next(ApiError.resourceNotFound("Order not found."));
    return;
}
res.status(201).json({ deletedOrder });
}

export default {
  findOneOrder,
  findAllOrder,
  createOneOrder,
  findOneAndUpdate,
  findOneAndDelete,
};

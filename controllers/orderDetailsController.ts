import { NextFunction, Request, Response } from "express";
import orderDetailsService from "../services/orderDetailService";
import { ApiError } from "../errors/ApiError";
import orderDetailService from "../services/orderDetailService";

async function findOrderDetailOffset(req: Request, res: Response) {
  const pageNumber = Number(req.query.pageNumber) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const list = await orderDetailService.getPaginatedOrderDetail(
    pageNumber,
    pageSize
  );
  res.json({ list });
}

async function findAllOrderDetail(_: Request, res: Response) {
  const orderDetails = await orderDetailsService.findAll();

  res.json({ orderDetails });
}

async function findOneOrderDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const orderDetailId = req.params.orderDetailId;
  const orderDetail = await orderDetailsService.findone(orderDetailId);

  if (!orderDetail) {
    next(ApiError.resourceNotFound("OrderDetail not found."));
    return;
  }

  res.json({ orderDetail });
}

async function createOneOrderDetail(req: Request, res: Response) {
  const newOrderDetail = req.body;
  const orderDetail = await orderDetailsService.createOne(newOrderDetail);

  res.status(201).json({ orderDetail });
}

async function findOneAndUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newOrderDetail = req.body;
  const orderDetailId = req.params.orderDetailId;
  const updatedOrderDetail = await orderDetailsService.findOneAndUpdate(
    orderDetailId,
    newOrderDetail
  );

  if (!updatedOrderDetail) {
    next(ApiError.resourceNotFound("OrderDetail not found."));
    return;
  }
  res.status(201).json({ updatedOrderDetail });
}

async function findOneAndDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const orderDetailId = req.params.orderDetailId;
  const deletedOrderDetail = await orderDetailsService.findOneAndDelete(
    orderDetailId
  );

  if (!deletedOrderDetail) {
    next(ApiError.resourceNotFound("OderDetail not found."));
    return;
  }
  res.status(201).json({ deletedOrderDetail });
}

export default {
  findOneOrderDetail,
  findAllOrderDetail,
  createOneOrderDetail,
  findOneAndUpdate,
  findOneAndDelete,
  findOrderDetailOffset,
};

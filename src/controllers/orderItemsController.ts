import { NextFunction, Request, Response } from "express";
import orderDetailService from "../services/orderItemService";
import { ApiError } from "../errors/ApiError";
import { ResponseHandler } from "../responses/ResponeHandler";

async function findOrderDetailOffset(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const pageNumber = Number(req.query.pageNumber) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const list = await orderDetailService.getPaginatedOrderDetail(
    pageNumber,
    pageSize
  );
  next(ResponseHandler.resourceFetched(JSON.stringify(list)));
}

async function findAllOrderDetail(
  _: Request,
  res: Response,
  next: NextFunction
) {
  const orderDetails = await orderDetailService.findAll();
  res.json(orderDetails);
}

async function findOneOrderDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const orderDetailId = req.params.orderDetailId;
  const orderDetail = await orderDetailService.findone(orderDetailId);

  if (!orderDetail) {
    next(ApiError.resourceNotFound("OrderDetail not found."));
    return;
  }
  res.json(orderDetail);
}

async function createOneOrderDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newOrderDetail = req.body;
  const orderDetail = await orderDetailService.createOne(newOrderDetail);

  res.status(201).json(orderDetail);
}

async function findOneAndUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newOrderDetail = req.body;
  const orderDetailId = req.params.orderDetailId;
  const updatedOrderDetail = await orderDetailService.findOneAndUpdate(
    orderDetailId,
    newOrderDetail
  );

  if (!updatedOrderDetail) {
    next(ApiError.resourceNotFound("OrderDetail not found."));
    return;
  }

  res.status(201).json(updatedOrderDetail);
}

async function findOneAndDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const orderDetailId = req.params.orderDetailId;
  const deletedOrderDetail =
    await orderDetailService.findOneAndDelete(orderDetailId);

  if (!deletedOrderDetail) {
    next(ApiError.resourceNotFound("OderDetail not found."));
    return;
  }

  res.status(201).json(deletedOrderDetail);
}

export default {
  findOneOrderDetail,
  findAllOrderDetail,
  createOneOrderDetail,
  findOneAndUpdate,
  findOneAndDelete,
  findOrderDetailOffset,
};

import express, { NextFunction, Request, Response } from "express";
import OrderService from "../services/orderService";
import { ApiError } from "../errors/ApiError";
import { ResponseHandler } from "../responses/ResponeHandler";
import { WithAuthRequest } from "../middlewares/checkAuth";

const OrderController = {
  async getAll(req: WithAuthRequest, res: Response, next: NextFunction) {
    if (req.decoded) {
      const userId = req.decoded.userId;
      const list = await OrderService.findAllForUser(userId);
      res.json(list);
    } else {
      next(ApiError.forbidden("user not found"));
    }
  },
  async getAllOffset(req: Request, res: Response, next: NextFunction) {
    const pageNumber = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    if (pageNumber < 0) {
      next(ApiError.internal("PageNumber Must be Non Negative"));
      return;
    }
    const list = await OrderService.getPaginatedOrder(pageNumber, pageSize);
    //res.json({ list });
    //next(ResponseHandler.resourceFetched(JSON.stringify(list)))
    res.json(list);
  },
  async getAllUserOrdersOffset(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.params.id;
    if (userId.length !== 24) {
      next(
        ApiError.internal(
          "ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"
        )
      );
      return;
    }
    const pageNumber = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    if (pageNumber < 0) {
      next(ApiError.internal("PageNumber Must be Non Negative"));
      return;
    }

    const list = await OrderService.getPaginatedUserOrder(
      userId,
      pageNumber,
      pageSize
    );
    //res.json({ list });
    //next(ResponseHandler.resourceFetched(JSON.stringify(list)))
    res.json(list);
  },
  async getAllUserOrders(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    if (userId.length !== 24) {
      next(
        ApiError.internal(
          "ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"
        )
      );
      return;
    }
    const list = await OrderService.findAllForUser(userId);
    //res.json({ list });
    //next(ResponseHandler.resourceFetched(JSON.stringify(list)))
    res.json(list);
  },
  async getOrder(req: Request, res: Response, next: NextFunction) {
    const orderId = req.params.id;
    if (orderId.length !== 24) {
      next(
        ApiError.internal(
          "ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"
        )
      );
      return;
    }
    const item = await OrderService.findOne(orderId);
    if (!item) {
      next(ApiError.resourceNotFound(`OrderId ${orderId} is not found`));
    }
    //next(ResponseHandler.resourceFetched(JSON.stringify(item)))
    res.json(item);
  },
  async createOrder(req: WithAuthRequest, res: Response, next: NextFunction) {
    const order = req.body;
    if (!order) {
      next(ApiError.internal("Details are Required"));
      return;
    }
    if (req.decoded) {
      const userId = req.decoded.userId;
      const orderWithUserId = {
        ...order,
        userId,
      };
      const newOrder = await OrderService.createOne(orderWithUserId);
      res.status(201).json(newOrder);
    } else {
      next(ApiError.forbidden("User not found"));
    }
  },
  async updateOrder(req: Request, res: Response, next: NextFunction) {
    const orderId = req.params.id;
    if (orderId.length !== 24) {
      next(
        ApiError.internal(
          "ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"
        )
      );
      return;
    }
    const updatedOrder = req.body;
    if (!updatedOrder) {
      next(ApiError.internal("Details are Required"));
      return;
    }
    const order = await OrderService.updateOne(orderId, updatedOrder);
    if (!order) {
      next(ApiError.resourceNotFound("Order not found"));
      return;
    }
    //next(ResponseHandler.resourceUpdated(JSON.stringify(order), `Order with ${order._id} has been updated`))
    res.status(201).json(order);
  },
  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    const orderId = req.params.id;
    if (orderId.length !== 24) {
      next(
        ApiError.internal(
          "ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"
        )
      );
      return;
    }
    const order = await OrderService.deleteOne(orderId);
    if (!order) {
      next(ApiError.resourceNotFound("Order not found"));
      return;
    }
    //next(ResponseHandler.resourceDeleted(JSON.stringify(order), `Order with ${order._id} has been deleted`))
    res.status(201).json(order);
  },
};

export default OrderController;

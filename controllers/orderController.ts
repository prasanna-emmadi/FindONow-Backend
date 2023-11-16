import express, { Request, Response } from "express";
import OrderService from "../services/orderService.js"


const OrderController = {
  async getAll(req: Request, res: Response) {
    const {userId} = req.body
    const list = await OrderService.findAll()
    res.json({ list });
  }
  ,
  async getAllOffset(req: Request, res: Response) {
    const pageNumber = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const list = await OrderService.getPaginatedOrder(pageNumber, pageSize)
    res.json({ list });
  }
  ,
  async getAllUserOrdersOffset(req: Request, res: Response) {
    const userId = req.params.id
    const pageNumber = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const list = await OrderService.getPaginatedUserOrder(userId, pageNumber, pageSize)
    res.json({ list });
  }
,
  async getAllUserOrders(req: Request, res: Response) {
    const userId = req.params.id
    const list = await OrderService.findAllForUser(userId)
    res.json({ list });
  }
,
  async getOrder(req: Request, res: Response) {
    const orderId = req.params.id;
    const item = await OrderService.findOne(orderId)
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ code: 404, error: "Order not found" });
    }
  }
  ,
  async createOrder(req: Request, res: Response) {
    const order = req.body;
    if (order) {
      const newCategory = await OrderService.createOne(order)
      res.status(201).json(newCategory);
    } else {
      res.status(400).json({ code: 404, error: "Details are Required" });
    }
  }
  ,
  async updateOrder(req: Request, res: Response) {
    const orderId = req.params.id;
    const  updatedOrder  = req.body;
    if (updatedOrder) {
      const order = await OrderService.updateOne(orderId, updatedOrder);
      if (order) {
        res.json({ message: `${JSON.stringify(order)} has been updated` });
      } else {
        res.status(404).json({ code: 404, error: "Order not found" });
      }
    } else {
      res.status(400).json({ code: 404, error: "Details are Required" });
    }
  }
  ,
  async deleteOrder(req: Request, res: Response) {
    const orderId = req.params.id;
    const order = await OrderService.deleteOne(orderId);

    if (order) {
      res.json({
        message: `Order ${orderId} has been deleted successfully`,
      });
    } else {
      res.status(404).json({ code: 404, error: "Order not found" });
    }
  }
}

export default OrderController;
import express, { Request, Response } from "express";
import OrderService from "../services/orderService.js"

export class OrderController {

  async getAllUserOrders(req: Request, res: Response) {
    const {userId} = req.body
    const list = await OrderService.findAll(userId)
    res.json({ list });
  }

  async getOrder(req: Request, res: Response) {
    const orderId = req.params.id;
    const item = await OrderService.findOne(orderId)
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ code: 404, error: "Order not found" });
    }
  }
  async createOrder(req: Request, res: Response) {
    const order = req.body;
    if (order) {
      const newCategory = await OrderService.createOne(order)
      res.status(201).json(newCategory);
    } else {
      res.status(400).json({ code: 404, error: "Details are Required" });
    }
  }
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

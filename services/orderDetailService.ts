import mongoose from "mongoose";
import OrderRepo from "../models/Order.js";
import { Order } from "../types/orders.js";

async function findAll() {
  const orders = await OrderRepo.find().exec();

  return orders;
}

async function findone(orderId: string) {
  const id = new mongoose.Types.ObjectId(orderId);
  const order = await OrderRepo.findById(id);

  return order;
}

async function createOne(order: Order) {
  const newOrder = new OrderRepo(order);
  return await newOrder.save();
}

async function findOneAndUpdate(orderId: string, order: Order) {
  const id = new mongoose.Types.ObjectId(orderId);
  return await OrderRepo.findByIdAndUpdate(id, order);
}

async function findOneAndDelete(orderId: string) {
  const id = new mongoose.Types.ObjectId(orderId);
  return await OrderRepo.findByIdAndDelete(id);
}

export default {
  findone,
  findAll,
  createOne,
  findOneAndUpdate,
  findOneAndDelete,
};

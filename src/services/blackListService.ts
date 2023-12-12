import mongoose, { ObjectId } from "mongoose";
import BlackListRepo from "../models/BlackListSchema";
import { BlackListItem } from "../types/blackListItem";

async function findOne(token: string) {
  const blackListToken = await BlackListRepo.findOne({token: token}).exec();
  return blackListToken;
}

async function createOne(item: BlackListItem) {
  const newItem = new BlackListRepo(item);
  return await newItem.save();
}

export default {
  findOne,
  createOne,
};

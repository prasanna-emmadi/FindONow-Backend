import mongoose, { ObjectId } from "mongoose"
import UserRepo  from "../models/User.js"
import { User } from "../types/users.js"

const usersRepo = new UserRepo()

async function findAll() {
  const users = await UserRepo.find().exec()
  return users
}

async function findOne(userId: number) {
  const id = new mongoose.Types.ObjectId(userId)
  const user = await UserRepo.findById(userId)
  return user
}

async function createOne(user: User) {
  const newUser = new UserRepo(user)
  return await newUser.save()
}

async function findOneAndUpdate(userId: string, user: User) {
    const id = new mongoose.Types.ObjectId(userId);
    return await UserRepo.findByIdAndUpdate(id, user);
}

async function findOneAndDelete(userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    return await UserRepo.findByIdAndDelete(id);
  }
 
export default {
  findOne,
  findAll,
  createOne,
  findOneAndUpdate,
  findOneAndDelete,
}

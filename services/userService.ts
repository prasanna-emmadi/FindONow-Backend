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

// async function findIndex(userId: number) {
//   const userIndex = UserRepo.findIndex(userId);
//   return userIndex;
// }

// function updateUser(userIndex: number, user: User) {
//   const updateUser = UserRepo.updateUser(userIndex, user);
//   return updateUser;
// } 

// function deleteUser(userIndex: number) {
//   const user = useUserRepo.deleteUser(userIndex);
//   return user;
// }

export default {
  findOne,
  findAll,
  createOne,
  // findIndex,
  // updateUser,
  // deleteUser
}

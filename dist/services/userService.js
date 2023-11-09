var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import UserRepo from "../models/User.js";
const usersRepo = new UserRepo();
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UserRepo.find().exec();
        return users;
    });
}
function findOne(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(userId);
        const user = yield UserRepo.findById(userId);
        return user;
    });
}
function createOne(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = new UserRepo(user);
        return yield newUser.save();
    });
}
function findOneAndUpdate(userId, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(userId);
        return yield UserRepo.findByIdAndUpdate(id, user);
    });
}
function findOneAndDelete(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(userId);
        return yield UserRepo.findByIdAndDelete(id);
    });
}
export default {
    findOne,
    findAll,
    createOne,
    findOneAndUpdate,
    findOneAndDelete,
};

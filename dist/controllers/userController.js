var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UsersService from "../services/userService.js";
import { ApiError } from "../errors/ApiError.js";
export function findAllUser(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UsersService.findAll();
        res.json({ users });
    });
}
export function findOneUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = Number(req.params.userId);
        const user = yield UsersService.findOne(userId);
        if (!user) {
            next(ApiError.resourceNotFound("user not found."));
            return;
        }
        res.json({ user });
    });
}
export function createOneUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        const user = yield UsersService.createOne(newUser);
        res.status(201).json({ user });
    });
}
export function findOneAndUpdate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        const userId = req.params.userId;
        const updatedUser = yield UsersService.findOneAndUpdate(userId, newUser);
        if (!updatedUser) {
            next(ApiError.resourceNotFound("User not found."));
            return;
        }
        res.status(200).json({ updatedUser });
    });
}
export function findOneAndDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        const deletedUser = yield UsersService.findOneAndDelete(userId);
        if (!deletedUser) {
            next(ApiError.resourceNotFound("User not found."));
            return;
        }
        res.status(200).json({ deletedUser });
        res.status(200).json("User deleted ...");
    });
}
export default {
    findOneUser,
    findAllUser,
    createOneUser,
    findOneAndUpdate,
    findOneAndDelete,
};

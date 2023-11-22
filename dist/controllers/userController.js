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
import { ResponseHandler } from "../responses/ResponeHandler.js";
export function getOffsetUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageNumber = Number(req.query.pageNumber) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        if (pageNumber < 0) {
            next(ApiError.internal("PageNumber Must be Non Negative"));
            return;
        }
        const users = yield UsersService.paginateUsers(pageNumber, pageSize);
        if (!users) {
            next(ApiError.internal("Internal Server error"));
        }
        next(ResponseHandler.resourceFetched(JSON.stringify(users)));
        //res.json(users);
    });
}
export function findAllUser(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UsersService.findAll();
        res.json({ users });
    });
}
export function findOneUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = Number(req.params.userId);
        // if(userId.length!==24){
        //   next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"))
        //   return  
        // }
        const user = yield UsersService.findOne(userId);
        if (!user) {
            next(ApiError.resourceNotFound("User not found."));
            return;
        }
        next(ResponseHandler.resourceFetched(JSON.stringify(user)));
        // res.json({ user });
    });
}
export function createOneUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        if (!newUser) {
            next(ApiError.internal("Details are Required"));
        }
        const user = yield UsersService.createOne(newUser);
        next(ResponseHandler.resourceCreated(JSON.stringify(user), `User with ${user._id} has been added`));
        // res.status(201).json({ user });
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
        next(ResponseHandler.resourceUpdated(JSON.stringify(updatedUser), `User with ${updatedUser._id} has been updated`));
        //res.status(200).json({ updatedUser });
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
        next(ResponseHandler.resourceDeleted(JSON.stringify(deletedUser), `User with ${deletedUser._id} has been Deleted`));
        // res.status(200).json("User deleted ...");
    });
}
//SignUp
export function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const user = yield UsersService.createNewOne({ name, email, password });
        if (!user) {
            res.status(400).json({
                message: "User exists",
                user: null,
            });
            return;
        }
        next(ResponseHandler.resourceCreated(JSON.stringify(user), `User has been added`));
        // res.status(201).json({message: "user created",user,})
    });
}
//login
export function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const login = yield UsersService.login(email, password);
        if (login.status === false) {
            // TODO throw API error
            res.status(400).json({ accessToken: null, message: "Bad credentials" });
            return;
        }
        res.json({ message: login.message, accessToken: login.accessToken });
    });
}
export default {
    findOneUser,
    findAllUser,
    createOneUser,
    findOneAndUpdate,
    findOneAndDelete,
    login,
    signup
};

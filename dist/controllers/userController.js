"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.findOneAndDelete = exports.findOneAndUpdate = exports.createOneUser = exports.findOneUser = exports.findAllUser = exports.getOffsetUser = void 0;
const userService_js_1 = __importDefault(require("../services/userService.js"));
const ApiError_js_1 = require("../errors/ApiError.js");
const ResponeHandler_js_1 = require("../responses/ResponeHandler.js");
function getOffsetUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageNumber = Number(req.query.pageNumber) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        if (pageNumber < 0) {
            next(ApiError_js_1.ApiError.internal("PageNumber Must be Non Negative"));
            return;
        }
        const users = yield userService_js_1.default.paginateUsers(pageNumber, pageSize);
        if (!users) {
            next(ApiError_js_1.ApiError.internal("Internal Server error"));
        }
        next(ResponeHandler_js_1.ResponseHandler.resourceFetched(JSON.stringify(users)));
        //res.json(users);
    });
}
exports.getOffsetUser = getOffsetUser;
function findAllUser(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield userService_js_1.default.findAll();
        res.json({ users });
    });
}
exports.findAllUser = findAllUser;
function findOneUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = Number(req.params.userId);
        // if(userId.length!==24){
        //   next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"))
        //   return  
        // }
        const user = yield userService_js_1.default.findOne(userId);
        if (!user) {
            next(ApiError_js_1.ApiError.resourceNotFound("User not found."));
            return;
        }
        next(ResponeHandler_js_1.ResponseHandler.resourceFetched(JSON.stringify(user)));
        // res.json({ user });
    });
}
exports.findOneUser = findOneUser;
function createOneUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        if (!newUser) {
            next(ApiError_js_1.ApiError.internal("Details are Required"));
        }
        const user = yield userService_js_1.default.createOne(newUser);
        next(ResponeHandler_js_1.ResponseHandler.resourceCreated(JSON.stringify(user), `User with ${user._id} has been added`));
        // res.status(201).json({ user });
    });
}
exports.createOneUser = createOneUser;
function findOneAndUpdate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        const userId = req.params.userId;
        const updatedUser = yield userService_js_1.default.findOneAndUpdate(userId, newUser);
        if (!updatedUser) {
            next(ApiError_js_1.ApiError.resourceNotFound("User not found."));
            return;
        }
        next(ResponeHandler_js_1.ResponseHandler.resourceUpdated(JSON.stringify(updatedUser), `User with ${updatedUser._id} has been updated`));
        //res.status(200).json({ updatedUser });
    });
}
exports.findOneAndUpdate = findOneAndUpdate;
function findOneAndDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        const deletedUser = yield userService_js_1.default.findOneAndDelete(userId);
        if (!deletedUser) {
            next(ApiError_js_1.ApiError.resourceNotFound("User not found."));
            return;
        }
        next(ResponeHandler_js_1.ResponseHandler.resourceDeleted(JSON.stringify(deletedUser), `User with ${deletedUser._id} has been Deleted`));
        // res.status(200).json("User deleted ...");
    });
}
exports.findOneAndDelete = findOneAndDelete;
//SignUp
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const user = yield userService_js_1.default.createNewOne({ name, email, password });
        if (!user) {
            res.status(400).json({
                message: "User exists",
                user: null,
            });
            return;
        }
        next(ResponeHandler_js_1.ResponseHandler.resourceCreated(JSON.stringify(user), `User has been added`));
        // res.status(201).json({message: "user created",user,})
    });
}
exports.signup = signup;
//login
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const login = yield userService_js_1.default.login(email, password);
        if (login.status === false) {
            // TODO throw API error
            res.status(400).json({ accessToken: null, message: "Bad credentials" });
            return;
        }
        res.json({ message: login.message, accessToken: login.accessToken });
    });
}
exports.login = login;
exports.default = {
    findOneUser,
    findAllUser,
    createOneUser,
    findOneAndUpdate,
    findOneAndDelete,
    login,
    signup
};

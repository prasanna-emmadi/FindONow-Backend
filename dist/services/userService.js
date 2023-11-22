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
const mongoose_1 = __importDefault(require("mongoose"));
const User_js_1 = __importDefault(require("../models/User.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersRepo = new User_js_1.default();
function paginateUsers(pageNumber, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const skip = (pageNumber - 1) * pageSize;
        const users = yield User_js_1.default.find().skip(skip).limit(pageSize).exec();
        return users;
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_js_1.default.find().exec();
        return users;
    });
}
function findOne(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(userId);
        const user = yield User_js_1.default.findById(userId);
        return user;
    });
}
function createOne(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = new User_js_1.default(user);
        return yield newUser.save();
    });
}
function findOneAndUpdate(userId, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(userId);
        return yield User_js_1.default.findByIdAndUpdate(id, user);
    });
}
function findOneAndDelete(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(userId);
        return yield User_js_1.default.findByIdAndDelete(id);
    });
}
function findOneByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return User_js_1.default.findOne({ email });
    });
}
//signup
function createNewOne({ name, email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        console.log("HashedPassword:", hashedPassword);
        const userFromDB = yield findOneByEmail(email);
        if (userFromDB) {
            return null;
        }
        const user = new User_js_1.default({
            name,
            email,
            password: hashedPassword,
        });
        yield user.save();
        const userWithoutPass = {
            name: user.name,
            email: user.email,
            role: user.role,
        };
        return userWithoutPass;
    });
}
//login
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield findOneByEmail(email);
        if (!user) {
            return {
                message: "User not found by email",
                status: false,
                accessToken: null,
            };
        }
        const hashedPassword = user.password;
        console.log("hashedPassword==", hashedPassword);
        console.log("Password==", password);
        const isValid = bcrypt_1.default.compareSync(password, hashedPassword);
        if (!isValid) {
            return {
                message: "bad credentials",
                status: false,
                accessToken: null,
            };
        }
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
        });
        console.log("AccessToken:", accessToken);
        return {
            message: "valid credentials",
            status: true,
            accessToken,
        };
    });
}
exports.default = {
    paginateUsers,
    findOne,
    findAll,
    createOne,
    findOneAndUpdate,
    findOneAndDelete,
    createNewOne,
    findOneByEmail,
    login
};
//# sourceMappingURL=userService.js.map
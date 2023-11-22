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
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const usersRepo = new UserRepo();
function paginateUsers(pageNumber, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const skip = (pageNumber - 1) * pageSize;
        const users = yield UserRepo.find().skip(skip).limit(pageSize).exec();
        return users;
    });
}
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
function findOneByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return UserRepo.findOne({ email });
    });
}
//signup
function createNewOne({ name, email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = bcrypt.hashSync(password, 10);
        console.log("HashedPassword:", hashedPassword);
        const userFromDB = yield findOneByEmail(email);
        if (userFromDB) {
            return null;
        }
        const user = new UserRepo({
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
        const isValid = bcrypt.compareSync(password, hashedPassword);
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
        const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
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
export default {
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

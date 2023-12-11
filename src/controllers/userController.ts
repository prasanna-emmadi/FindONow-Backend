import { NextFunction, Request, Response } from "express";
import UsersService from "../services/userService";
import { ApiError } from "../errors/ApiError";

const UserController = {
  async getOffsetUser(req: Request, res: Response, next: NextFunction) {
    const pageNumber = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    if (pageNumber < 0) {
      next(ApiError.internal("PageNumber Must be Non Negative"));
      return;
    }
    const users = await UsersService.paginateUsers(pageNumber, pageSize);
    if (!users) {
      next(ApiError.internal("Internal Server error"));
    }
    //next(ResponseHandler.resourceFetched(JSON.stringify(users)))
    res.json(users);
  },

  async findAllUser(_: Request, res: Response) {
    const users = await UsersService.findAll();
    res.json(users);
  },

  async findOneUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    // if(userId.length!==24){
    //   next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"))
    //   return
    // }
    const user = await UsersService.findOne(userId);

    if (!user) {
      next(ApiError.resourceNotFound("User not found."));
      return;
    }
    //next(ResponseHandler.resourceFetched(JSON.stringify(user)))
    res.json(user);
  },

  async createOneUser(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;
    if (!newUser) {
      next(ApiError.internal("Details are Required"));
    }
    const user = await UsersService.createOne(newUser);
    //next(ResponseHandler.resourceCreated(JSON.stringify(user), `User with ${user._id} has been added`))
    res.status(201).json(user);
  },

  async findOneAndUpdate(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;
    const userId = req.params.userId;
    const updatedUser = await UsersService.findOneAndUpdate(userId, newUser);

    if (!updatedUser) {
      next(ApiError.resourceNotFound("User not found."));
      return;
    }
    //next(ResponseHandler.resourceUpdated(JSON.stringify(updatedUser), `User with ${updatedUser._id} has been updated`))
    res.status(200).json(updatedUser);
  },

  async findOneAndDelete(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const deletedUser = await UsersService.findOneAndDelete(userId);

    if (!deletedUser) {
      next(ApiError.resourceNotFound("User not found."));
      return;
    }
    //next(ResponseHandler.resourceDeleted(JSON.stringify(deletedUser), `User with ${deletedUser._id} has been Deleted`))
    res.status(200).json(deletedUser);
  },
};

export default UserController;

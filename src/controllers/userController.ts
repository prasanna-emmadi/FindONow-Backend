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
    res.json(users);
  },

  async findAllUser(_: Request, res: Response) {
    const users = await UsersService.findAll();
    res.json(users);
  },

  async findOneUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const user = await UsersService.findOne(userId);

    if (!user) {
      next(ApiError.resourceNotFound("User not found."));
      return;
    }
    res.json(user);
  },

  async createOneUser(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;
    if (!newUser) {
      next(ApiError.internal("Details are Required"));
    }
    const user = await UsersService.createOne(newUser);
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
    res.status(200).json(updatedUser);
  },

  async findOneAndDelete(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const deletedUser = await UsersService.findOneAndDelete(userId);

    if (!deletedUser) {
      next(ApiError.resourceNotFound("User not found."));
      return;
    }
    res.status(200).json(deletedUser);
  },
};

export default UserController;

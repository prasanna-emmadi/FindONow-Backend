import { NextFunction, Request, Response } from "express";
import UsersService from "../services/userService.js";
import { ApiError } from "../errors/ApiError.js";

export async function getOffsetUser(req:Request, res: Response, next: NextFunction)  {
  
  const pageNumber = Number(req.query.pageNumber) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const users = await UsersService.paginateUsers(pageNumber, pageSize);
  if(!users) {
    next(ApiError.internal("Internal Server error"));
  }
  res.json(users);
  //res.status(500).json({ error: "Internal Server Error" });
}

export async function findAllUser(_: Request, res: Response) {
  const users = await UsersService.findAll();
  res.json({ users });
}

export async function findOneUser(req: Request, res: Response, next: NextFunction) {
  const userId = Number(req.params.userId);
  const user = await UsersService.findOne(userId);

  if (!user) {
    next(ApiError.resourceNotFound("user not found."))
    return;
  }
  res.json({ user });
}

export async function createOneUser(req: Request, res: Response) {
  const newUser = req.body;
  const user = await UsersService.createOne(newUser);
  res.status(201).json({ user });
}

export async function findOneAndUpdate(req: Request,res: Response,next: NextFunction) {
    const newUser = req.body;
    const userId = req.params.userId;
    const updatedUser = await UsersService.findOneAndUpdate(userId, newUser);
  
    if (!updatedUser) {
      next(ApiError.resourceNotFound("User not found."));
      return;
    }
     res.status(200).json({ updatedUser });
}

export async function findOneAndDelete( req: Request, res: Response, next: NextFunction ) {
    const userId = req.params.userId;
    const deletedUser = await UsersService.findOneAndDelete(userId);

    if(!deletedUser) {
        next(ApiError.resourceNotFound("User not found."));
        return;
    }
    res.status(200).json({ deletedUser });
    res.status(200).json("User deleted ...");
}


export default {
  findOneUser,
  findAllUser,
  createOneUser,
  findOneAndUpdate,
  findOneAndDelete,
};

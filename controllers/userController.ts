import { NextFunction, Request, Response } from "express";
import UsersService from "../services/usersService.js";
import { ApiError } from "../errors/ApiError.js";

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


export default {
  findOneUser,
  findAllUser,
  createOneUser,
  // updateUser,
  // deleteUser,
};

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

//SignUp
export async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body
  const user = await UsersService.createOne({ name, email, password })
  if (!user) {
    res.status(400).json({
      message: "User exists",
      user: null,
    })
    return
  }

  res.status(201).json({
    message: "user created",
    user,
  })
}

//login
export async function login(req: Request, res: Response) {
  const { password, email } = req.body
  const login = await UsersService.login(email, password)

  if (!login.status) {
    // TODO throw API error
    res.status(400).json({ accessToken: null, message: "Bad credentials" })
    return
  }

  res.json({ message: login.message, accessToken: login.accessToken })
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

import { NextFunction, Request, Response } from "express";
import UsersService from "../services/userService";
import { ApiError } from "../errors/ApiError";
import { Role, UserProfile } from "user";
import { WithAuthRequest } from "../middlewares/checkAuth";

//SignUp

const AuthController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, role } = req.body;
    const user = await UsersService.createNewOne({
      name,
      email,
      password,
      role,
    });
    if (!user) {
      res.status(400).json({
        message: "User exists",
        user: null,
      });
      return;
    }

    res.status(201).json(user);
  },

  //login
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const login = await UsersService.login(email, password);

    if (login.status === false) {
      // TODO throw API error
      res.status(400).json({ accessToken: null, message: "Bad credentials" });
      return;
    }

    res.json({
      message: login.message,
      accessToken: login.accessToken,
      refresh_token: login.refreshToken,
    });
  },

  async profile(req: WithAuthRequest, res: Response, next: NextFunction) {
    const userId = req.decoded?.userId;
    if (!userId) {
      next(ApiError.resourceNotFound("User not found."));
    } else {
      const user = await UsersService.findOne(userId);

      if (!user) {
        next(ApiError.resourceNotFound("User not found."));
        return;
      }
      const role = user.role as Role;
      const profile: UserProfile = {
        name: user.name,
        email: user.email,
        role,
      };
      res.json(profile);
    }
  },
};

export default AuthController;

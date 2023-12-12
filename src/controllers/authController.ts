import { NextFunction, Request, Response } from "express";
import UsersService from "../services/userService";
import BlackListService from "../services/blackListService";
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
      access_token: login.access_token,
      refresh_token: login.refresh_token,
    });
  },

  async logout(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1]; // get the session cookie from request header
      if (!accessToken) return res.sendStatus(204); // No content
      const checkIfBlacklisted = await BlackListService.findOne(accessToken); // Check if that token is blacklisted
      // if true, send a no content response.
      if (checkIfBlacklisted) return res.sendStatus(204);
      // otherwise blacklist token
      await BlackListService.createOne({ token: accessToken });
      // Also clear request cookie on client
      res.setHeader("Clear-Site-Data", '"cookies"');
      res.status(200).json({ message: "You are logged out!" });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
    res.end();
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

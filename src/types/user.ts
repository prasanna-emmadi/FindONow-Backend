import { JwtPayload } from "jsonwebtoken";

export const role = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export interface DecodedUser extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export type Role = keyof typeof role;

export type User = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type UserProfile = {
  name: string;
  email: string;
  role: Role;
};
//new type file user.ts according to lecture

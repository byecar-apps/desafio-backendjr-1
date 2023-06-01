import { NextFunction, Request, Response } from "express";
import { userRepo } from "../repositories";
import { AppError } from "../errors";

const verifyEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emailExists = await userRepo
    .createQueryBuilder("users")
    .where("users.email = :email", { email: req.body.email })
    .getOne();

  if (emailExists) throw new AppError("Email already exists", 409);

  return next();
};

export default verifyEmailExists;

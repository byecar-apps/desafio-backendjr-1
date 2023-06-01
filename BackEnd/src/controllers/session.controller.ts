import { Request, Response } from "express";
import loginUserService from "../services/session/loginUser.service";

export const loginUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = await loginUserService(req.body);

  return res.status(200).json(token);
};

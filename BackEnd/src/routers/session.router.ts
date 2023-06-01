import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import { loginShape } from "../schemas/user.schema";
import { loginUserController } from "../controllers/session.controller";

export const sessionRouter = Router();

sessionRouter.post(
  "",
  validateSchemaMiddleware(loginShape),
  loginUserController
);

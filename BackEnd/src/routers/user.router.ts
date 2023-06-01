import { Router } from "express";
import {
  deleteUserController,
  getAllUserController,
  getProfileController,
  patchUserController,
  postUserController,
  retrieveUserController,
} from "../controllers/user.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import { registerUserShape, updateUserShape } from "../schemas/user.schema";
import verifyEmailExists from "../middlewares/verifyEmailExists.middleware";

export const userRouter = Router();

userRouter.get("", getAllUserController);

userRouter.post(
  "",
  validateSchemaMiddleware(registerUserShape),
  verifyEmailExists,
  postUserController
);

userRouter.get("/profile", ensureAuthMiddleware, getProfileController);

userRouter.get("/:id", retrieveUserController);

userRouter.patch(
  "",
  ensureAuthMiddleware,
  validateSchemaMiddleware(updateUserShape),
  verifyEmailExists,
  patchUserController
);

userRouter.delete("", ensureAuthMiddleware, deleteUserController);

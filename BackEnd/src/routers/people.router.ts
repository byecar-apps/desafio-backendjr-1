import { Router } from "express";
import multer from "multer";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import {
  deletePeopleController,
  getAllPeopleController,
  readCsvController,
} from "../controllers/people.controller";

export const peopleRouter = Router();

const configMulter = multer({ dest: "uploads" });

peopleRouter.post(
  "",
  configMulter.single("file"),
  ensureAuthMiddleware,
  readCsvController
);

peopleRouter.get("", ensureAuthMiddleware, getAllPeopleController);

peopleRouter.delete("/:id", ensureAuthMiddleware, deletePeopleController);

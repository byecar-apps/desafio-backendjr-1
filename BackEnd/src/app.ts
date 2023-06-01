import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import { userRouter } from "./routers/user.router";
import { peopleRouter } from "./routers/people.router";
import { errorHandler } from "./errors";
import { sessionRouter } from "./routers/session.router";

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use("/user", userRouter);
app.use("/people", peopleRouter);
app.use("/login", sessionRouter);

app.use(errorHandler);

export default app;

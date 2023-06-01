import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "yup";
import { ObjectShape } from "yup";

const validateSchemaMiddleware =
  (serialize: ObjectSchema<ObjectShape | any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await serialize.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
      req.body = validated;
      next();
    } catch (error) {
      return res.status(400).json({ message: error.errors });
    }
  };

export default validateSchemaMiddleware;

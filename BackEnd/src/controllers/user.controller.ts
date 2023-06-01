import { Request, Response } from "express";
import deleteUserService from "../services/users/deleteUser.service";
import getAllUserService from "../services/users/getAllUser.service";
import getProfileService from "../services/users/getProfile.service";
import patchUserService from "../services/users/patchUser.service";
import postUserService from "../services/users/postUser.service";
import retrieveUserService from "../services/users/retrieveUser.service";

const getAllUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { pagination, users } = await getAllUserService(req);
  return res.status(200).json({ ...pagination, users: { ...users } });
};

const getProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await getProfileService(req.userId.id);

  return res.status(200).json(data);
};

const retrieveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await retrieveUserService(req.params.id);

  return res.status(200).json(data);
};

const postUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await postUserService(req.body);
  return res.status(201).json(data);
};

const patchUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await patchUserService(req.body, req.userId.id);
  return res.status(200).json(data);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteUserService(req.userId.id);
  return res.status(204).json();
};

export {
  getAllUserController,
  retrieveUserController,
  patchUserController,
  deleteUserController,
  postUserController,
  getProfileController,
};

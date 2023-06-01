import { Request, Response } from "express";
import readCsvService from "../services/people/readCsv.service";
import getAllPeopleService from "../services/people/getAllPeople.service";
import deletePeopleService from "../services/people/deletePeople.service";

export const readCsvController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await readCsvService(req.file);

  return res.status(200).json({ message: "File successfully read and stored" });
};

export const getAllPeopleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { pagination, peoples } = await getAllPeopleService(req);
  return res.status(200).json({ ...pagination, peoples: { ...peoples } });
};

export const deletePeopleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deletePeopleService(req.params.id);
  return res.status(204);
};

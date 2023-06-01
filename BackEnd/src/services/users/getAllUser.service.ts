import { Request } from "express";
import { userRepo } from "../../repositories";
import { userArrayReturnedShape } from "../../schemas/user.schema";

const getAllUserService = async (req: Request): Promise<any> => {
  const pageSize = 10;
  const page = parseInt(req.query.page as string) || 1;

  const [result, total] = await userRepo
    .createQueryBuilder("user")
    .skip((page - 1) * pageSize)
    .take(pageSize)
    .getManyAndCount();

  const totalPages = Math.ceil(total / pageSize);

  const pagination = {
    page: page,
    pageSize: pageSize,
    total: total,
    totalPages: totalPages,
    nextPage: page + 1 > totalPages ? null : page + 1,
    previusPage: page - 1 === 0 ? null : page - 1,
  };

  const userRes = await userArrayReturnedShape.validate(result, {
    stripUnknown: true,
  });

  return { pagination: { ...pagination }, users: { ...userRes } };
};

export default getAllUserService;

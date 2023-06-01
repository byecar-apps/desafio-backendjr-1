import { peopleRepo } from "../../repositories";
import { Request } from "express";
import { returnedPeoplesShape } from "../../schemas/people.schema";

const getAllPeopleService = async (req: Request) => {
  const pageSize = 8;
  const page = parseInt(req.query.page as string) || 1;

  const [result, total] = await peopleRepo
    .createQueryBuilder("people")
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

  const peopleRes = await returnedPeoplesShape.validate(result, {
    stripUnknown: true,
  });

  return { pagination: { ...pagination }, peoples: { ...peopleRes } };
};

export default getAllPeopleService;

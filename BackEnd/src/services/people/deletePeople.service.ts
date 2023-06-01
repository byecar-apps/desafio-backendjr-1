import People from "../../entities/people.entitie";
import { AppError } from "../../errors";
import { peopleRepo } from "../../repositories";

const deletePeopleService = async (id: string) => {
  try {
    const user = await peopleRepo
      .createQueryBuilder()
      .delete()
      .from(People)
      .where("id = :id", { id: id })
      .execute();

    if (!user.affected) throw new Error();

    return {};
  } catch (error) {
    throw new AppError("People not found!", 404);
  }
};

export default deletePeopleService;

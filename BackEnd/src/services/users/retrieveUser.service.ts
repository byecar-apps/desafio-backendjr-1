import { AppError } from "../../errors";
import { IUser } from "../../interfaces/user.interface";
import { userRepo } from "../../repositories";
import { returnUserShape } from "../../schemas/user.schema";

const retrieveUserService = async (userId: string): Promise<IUser> => {
  try {
    const user = await userRepo
      .createQueryBuilder("users")
      .where("users.id = :id", { id: userId })
      .getOneOrFail();

    const resUser = (await returnUserShape.validate(user, {
      stripUnknown: true,
    })) as IUser;

    return resUser;
  } catch (error) {
    throw new AppError("User not found", 404);
  }
};

export default retrieveUserService;

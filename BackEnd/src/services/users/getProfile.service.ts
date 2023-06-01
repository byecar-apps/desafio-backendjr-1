import { IUser } from "../../interfaces/user.interface";
import { userRepo } from "../../repositories";
import { returnUserShape } from "../../schemas/user.schema";

const getProfileService = async (userId: string): Promise<IUser> => {
  const user = await userRepo
    .createQueryBuilder("users")
    .where("users.id = :id", { id: userId })
    .getOneOrFail();

  const userRes = (await returnUserShape.validate(user, {
    stripUnknown: true,
  })) as IUser;

  return userRes;
};

export default getProfileService;

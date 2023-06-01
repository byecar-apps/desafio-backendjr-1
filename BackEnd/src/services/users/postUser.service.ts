import { IRegisterUser, IUser } from "../../interfaces/user.interface";
import { userRepo } from "../../repositories";
import { returnUserShape } from "../../schemas/user.schema";

const postUserService = async (data: IRegisterUser): Promise<IUser> => {
  const user = userRepo.create(data);

  await userRepo.save(user);

  const userRes = (await returnUserShape.validate(user, {
    stripUnknown: true,
  })) as IUser;

  return userRes;
};

export default postUserService;

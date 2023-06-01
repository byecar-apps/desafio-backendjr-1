import { AppError } from "../../errors";
import { IUser } from "../../interfaces/user.interface";
import { userRepo } from "../../repositories";
import { returnUserShape } from "../../schemas/user.schema";

const patchUserService = async (data: any, userId: string): Promise<IUser> => {
  try {
    const findUser = await userRepo.findOneBy({ id: userId });

    if (!findUser) throw new Error();

    const updateUser = userRepo.create({
      ...findUser,
      ...data,
    });

    await userRepo.save(updateUser);

    const userWithoutPsw = await returnUserShape.validate(updateUser, {
      stripUnknown: true,
    });

    return userWithoutPsw as IUser;
  } catch (error) {
    throw new AppError("User not found!", 404);
  }
};

export default patchUserService;

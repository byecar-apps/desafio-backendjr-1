import { AppError } from "../../errors";
import { ILogin, IToken } from "../../interfaces/session.interface";
import { userRepo } from "../../repositories";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUserService = async (data: ILogin): Promise<IToken> => {
  try {
    const user = await userRepo
      .createQueryBuilder("users")
      .where("users.email = :email", { email: data.email })
      .getOneOrFail();

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) throw new Error();

    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        subject: String(user.id),
        expiresIn: "24h",
      }
    );

    return { token: token };
  } catch (error) {
    throw new AppError("Email or Password invalid!", 403);
  }
};

export default loginUserService;

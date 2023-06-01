import AppDataSource from "../data-source";
import People from "../entities/people.entitie";
import User from "../entities/user.entitie";

const userRepo = AppDataSource.getRepository(User);
const peopleRepo = AppDataSource.getRepository(People);

export { userRepo, peopleRepo };

import { ApiError } from "../utils/ApiError.js";
import { userRepository } from "../utils/repository.js";
import bcrpyt from "bcrypt";
import { tokenUtil } from "../utils/token.js";

export class userService {
  static registerUser = async (
    firstName: string,
    lastName:string,
    password: string,
    email: string,
  ) => {
    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      throw new ApiError(409, "User already exists");
    }
    const saltRounds = 10;

    const hashedPassword = await bcrpyt.hash(password, saltRounds);
    const newUser = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return await userRepository.save(newUser);
  };
  static loginUser = async (email: string, password: string) => {
    const existingUser = await userRepository.findOne({ where: { email } });
    if (!existingUser || !(await bcrpyt.compare(password, existingUser.password))) {
      throw new ApiError(401, "Email or Password Wrong");
    }
    const id = existingUser.id;
    const accessToken = await tokenUtil.createToken(id);
    const { password: _, ...user } = existingUser;
    const newUser = {
      user,
      accessToken,
    };
    return newUser;
  };
}

import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

class UserService {

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const isEmailAlreadyExist = await userRepository.find({ where: { email: email } });
    if (isEmailAlreadyExist.length) {
        return { sucess: false, message: "User Already Exist" };
    }
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    const response = await userRepository.save(user);
    return { success: true, Data: response }
  }

  async login(req: Request, res: Response) {
    try{
      const { email, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const user: any = await userRepository.find({ where: { email: email } });
      if (!user[0]) {
          return { sucess: false, message: "Email not found" };
      }
      // console.log(user[0])
      // console.log(!user[0])
      // console.log(user[0].password != password)
      if (user[0].password != password){
          return { sucess: false, message: "Invalid Email or Password" };
      }
      return { success: true, Data: user[0].id }
    }
    catch(error){
      console.log(error);
    }

  }

}

export const userService: UserService = new UserService();

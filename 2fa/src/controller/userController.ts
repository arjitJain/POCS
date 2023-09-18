import { Request, Response } from "express";
import { userService } from "../service/userService";

class UserController {

  async register(req: Request, res: Response) {
    try {
      const finalResponse = await userService.register(req, res);
      console.log(finalResponse);
      res.send(finalResponse);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const finalResponse = await userService.login(req, res);
      res.send(finalResponse);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

}

export const userController: UserController = new UserController();

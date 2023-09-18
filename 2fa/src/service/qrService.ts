import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import TwoFAHandler from "../utils/2faHandler";
import speakeasy from "speakeasy";
import TOTP from "totp.js";

class QrService {
  async generateQr(req: Request, res: Response) {
    let userId: number = 1;
    const userRepository = AppDataSource.getRepository(User);
    let user: any = await userRepository.find({ where: { id: userId } });
    if (!user.length) {
      return { message: "User not found" };
    }
    let secret = speakeasy.generateSecret({ length: 20 }).base32;
    let qrLink = await TwoFAHandler.get2FABase64QR(user?.name, secret);
    await userRepository.update({ id: userId }, { secret: secret });
    return { qrLink, secret };
  }

  async verify2FA(req: Request, res: Response) {
    let userId: number = 1;
    let { otp } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    let user: any = await userRepository.find({ where: { id: userId } });
    let secret = user[0]?.secret;
    let verify = await TwoFAHandler.verify2FA(otp, secret);
    if (!verify) {
      return { messge: false };
    }
    return { message: true };
  }
}

const qrService: QrService = new QrService();
export default qrService;

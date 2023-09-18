import { Request, Response } from "express";
import qrService from "../service/qrService";

class QrController {
  async generateQr(req: Request, res: Response) {
    try {
      const finalResponse = await qrService.generateQr(req, res);
      res.send({ finalResponse });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send(error);
    }
  }

  async verify2FA(req: Request, res: Response) {
    try {
      const finalResponse = await qrService.verify2FA(req, res);
      res.send({ finalResponse });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send(error);
    }
  }
}

export const qrController: QrController = new QrController();

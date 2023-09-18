import express from "express";
import { qrController } from "../controller/qrController";

const qrRouter = express.Router();

qrRouter.get("/generateQr", qrController.generateQr);
qrRouter.post("/verify2FA", qrController.verify2FA);

export default qrRouter;

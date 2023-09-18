import QrCode from "qrcode";
import speakeasy from "speakeasy";
import TOTP from "totp.js";

export default class TwoFAHandler {
  public static async get2FABase64QR(name: string, secret: string) {
    const link = `otpauth://totp/${name}?secret=${secret}&issuer=Systango`;
    const qrCodeData = await QrCode.toDataURL(link);
    return qrCodeData;
  }

  public static async verify2FA(otp: string, secret: string) {
    let totp = new TOTP(secret.toString());
    const verify = totp.verify(otp);
    return verify;
  }
}

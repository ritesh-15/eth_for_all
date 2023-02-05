import crypto from "crypto"
import { SEND_GRID_API_KEY, SEND_GRID_EMAIL } from "../keys"
import sendgrid from "@sendgrid/mail"
import generateTemplate from "./generate_email_template"

interface OtpData {
  email: string
  expiresIn?: number
  otp?: number
}

interface OtpSetData {
  otp: number
  email: string
  expiresIn: number
  hash: string
  message: string
}

class OtpHelper {
  otp: number
  email: string
  expiresIn: number
  hash: string
  message: string

  constructor(data: OtpData) {
    this.email = data.email
    this.expiresIn = data.expiresIn || Date.now() + 1000 * 60 * 10
    this.otp =
      data.otp || Math.floor(Math.random() * (9999999 - 1000000) + 1000000)
    this.hash = this.generateHash()
    this.message = `One time password for account verification is ${this.otp}`
  }

  private generateHash() {
    return crypto
      .createHash("sha256")
      .update(`${this.email}${this.otp}${this.expiresIn}`)
      .digest("hex")
  }

  public setData(data: OtpSetData) {
    this.email = data.email
    this.expiresIn = data.expiresIn
    this.otp = data.otp
    this.hash = data.hash
    this.message = data.message
  }

  public send() {
    sendgrid.setApiKey(SEND_GRID_API_KEY)
    return sendgrid.send({
      from: SEND_GRID_EMAIL,
      to: this.email,
      subject: "Account Verification!",
      text: this.message,
      html: generateTemplate(`${this.otp}`),
    })
  }

  static verify(data: OtpData, hash: string) {
    const otpGenerator = new OtpHelper(data)
    return hash === otpGenerator.hash
  }
}

export default OtpHelper

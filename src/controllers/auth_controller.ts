import { NextFunction, Request, Response } from "express"
import { SessionService, UserService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import {
  ICreateAccount,
  ILogin,
  ISendOTP,
  IVerifyOTP,
} from "../validations/auth_validations"
import bcrypt from "bcrypt"
import { signTokens, verifyRefreshToken } from "../utils/jwt"
import UserDTO from "../dtos/UserDTO"
import OtpHelper from "../helper/otp_helper"
import verficationCodeQueue from "../tasks/send_verification_code"

class AuthController {
  /**
   * @route POST auth/login
   * @desc Login to the account
   * @access Public
   */
  static async login(
    req: Request<{}, {}, ILogin["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { phone, email, password } = req.body

      if (!phone && !email)
        return next(
          CreateHttpError.unprocessableEntity("Username is required!")
        )

      const user = await UserService.findUserByPhoneOREmail(
        (phone && Number(phone)) || 0,
        email || ""
      )

      if (!user)
        return next(
          CreateHttpError.notFound("Username or password is invalid!")
        )

      const isValidPassword = await bcrypt.compare(
        password,
        user.password || ""
      )

      if (!isValidPassword)
        return next(
          CreateHttpError.forbidden("Username or password is invalid!")
        )

      const { accessToken, refreshToken } = signTokens(user.id)

      await SessionService.create({ token: refreshToken, userId: user.id })

      return res.json({
        ok: true,
        user: new UserDTO(user),
        tokens: {
          accessToken,
          refreshToken,
        },
      })
    } catch (err) {
      return next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route DELETE auth/logout
   * @desc Log out from the account
   * @access Private
   */
  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await SessionService.deleteManyByUserID(req.user.id)
      res.json({
        ok: true,
        message: "Logged out successfully!",
      })
    } catch (e) {
      console.log(e)
      next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route POST auth/verify-otp
   * @desc Verify the One time password
   * @access Public
   */
  static async verifyOtp(
    req: Request<{}, {}, IVerifyOTP["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, otp, hash } = req.body

      const user = await UserService.findByEmail(email)

      if (!user) return next(CreateHttpError.notFound("User not found!"))

      const [otpHash, time] = hash.split(".")

      if (parseInt(time) < Date.now())
        return next(CreateHttpError.badRequest("Verification code is expired!"))

      const isValidOTP = OtpHelper.verify(
        {
          otp: otp,
          email: email,
          expiresIn: parseInt(time),
        },
        otpHash
      )

      if (!isValidOTP)
        return next(CreateHttpError.badRequest("Verification code is invalid!"))

      const updatedUser = await UserService.updateByID(user.id, {
        isVerified: true,
      })

      const { accessToken, refreshToken } = signTokens(user.id)

      await SessionService.create({ token: refreshToken, userId: user.id })

      res.json({
        ok: true,
        user: new UserDTO(updatedUser),
        tokens: {
          accessToken,
          refreshToken,
        },
      })
    } catch (e) {
      next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route GET auth/refresh
   * @desc Refresh the tokens
   * @access Public
   */
  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshtoken } = req.headers

      if (!refreshtoken)
        return next(CreateHttpError.notFound("No token found!"))

      const payload = verifyRefreshToken(refreshtoken as string)

      const session = await SessionService.findByToken(refreshtoken as string)

      if (!session) {
        await SessionService.deleteManyByUserID(payload.id)
        return next(CreateHttpError.forbidden())
      }

      const user = await UserService.findByID(session.userId)

      if (!user) return next(CreateHttpError.notFound("User not found!"))

      await SessionService.deleteByID(session.id)

      const { accessToken, refreshToken } = signTokens(user.id)

      await SessionService.create({ token: refreshToken, userId: user.id })

      res.json({
        ok: true,
        tokens: {
          accessToken,
          refreshToken,
        },
      })
    } catch (e) {
      next(CreateHttpError.unauthorized())
    }
  }

  /**
   * @route POST auth/send-otp
   * @desc Send the one tome password to the email address
   * @access Public
   */
  static async sendOtp(
    req: Request<{}, {}, ISendOTP["body"], {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body

      const user = await UserService.findByEmail(email)

      if (!user)
        return next(
          CreateHttpError.notFound("User not exits with email address!")
        )

      // send the code in background
      const otp = new OtpHelper({ email })
      await verficationCodeQueue.add({
        meta: otp,
      })

      res.json({
        ok: true,
        message: "Verification code sent successfully!",
        meta: {
          hash: `${otp.hash}.${otp.expiresIn}`,
          email: otp.email,
        },
      })
    } catch (err) {
      next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route POST auth/register
   * @desc Create a new user account
   * @access Public
   */
  static async createNewAccount(
    req: Request<{}, {}, ICreateAccount["body"]>,
    res: Response,
    next: NextFunction
  ) {
    const { phone, email } = req.body

    const foundUser = await UserService.findUserByPhoneOREmail(
      Number(phone),
      email
    )

    if (foundUser)
      return next(
        CreateHttpError.badRequest(
          "User already exits with given phone number!"
        )
      )

    const user = await UserService.create(Number(phone), email)

    // send otp in the background
    const otp = new OtpHelper({ email })
    await verficationCodeQueue.add({
      meta: otp,
    })

    res.status(201).json({
      ok: true,
      message: "Account created successfully!",
      user: new UserDTO(user),
      meta: {
        hash: `${otp.hash}.${otp.expiresIn}`,
        email: otp.email,
      },
    })
  }
}

export default AuthController

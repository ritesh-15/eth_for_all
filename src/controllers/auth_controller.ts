import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { SessionService, UserService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import {
  ICreateAccount,
  ILogin,
  ISendOTP,
  IVerifyOTP,
} from "../validations/auth_validations"
import bcrypt from "bcrypt"
import { signTokens } from "../utils/jwt"
import UserDTO from "../dtos/UserDTO"

class AuthController {
  static userService = new UserService()
  static sessionService = new SessionService()

  /**
   * @route POST auth/login
   * @desc Login to the account
   * @access Public
   */
  static login = asyncHandler(
    async (
      req: Request<{}, {}, ILogin, {}, {}>,
      res: Response,
      next: NextFunction
    ) => {
      const { phone, email, password } = req.body

      if (!phone && !email)
        return next(
          CreateHttpError.badRequest("Please provide username for login!")
        )

      const user = await this.userService.findUserByPhoneOREmail(
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

      await this.sessionService.create({ token: refreshToken, userId: user.id })
    }
  )

  /**
   * @route POST auth/verify-otp
   * @desc Verify the One time password
   * @access Public
   */
  static verifyOtp = asyncHandler(
    async (
      req: Request<{}, {}, IVerifyOTP, {}, {}>,
      res: Response,
      next: NextFunction
    ) => {}
  )

  /**
   * @route GET auth/refresh
   * @desc Refresh the tokens
   * @access Public
   */
  static refresh = asyncHandler(
    async (
      req: Request<{}, {}, {}, {}, {}>,
      res: Response,
      next: NextFunction
    ) => {}
  )

  /**
   * @route POST auth/send-otp
   * @desc Send the one tome password to the email address
   * @access Public
   */
  static sendOtp = asyncHandler(
    async (
      req: Request<{}, {}, ISendOTP, {}, {}>,
      res: Response,
      next: NextFunction
    ) => {}
  )

  /**
   * @route POST auth/register
   * @desc Create a new user account
   * @access Public
   */
  static createNewAccount = asyncHandler(
    async (
      req: Request<{}, {}, ICreateAccount, {}, {}>,
      res: Response,
      next: NextFunction
    ) => {
      const { phone, email } = req.body
      const foundUser = await this.userService.findUserByPhoneOREmail(
        Number(phone),
        email
      )

      if (foundUser)
        return next(
          CreateHttpError.badRequest(
            "User already exits with given phone number!"
          )
        )

      const user = await this.userService.create(Number(phone), email)

      // TODO: Send the One time password to the email address

      res.status(201).json({
        ok: true,
        message: "Account created successfully!",
        user: {
          phone,
          email,
        },
      })
    }
  )
}

export default AuthController

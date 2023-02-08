import { NextFunction, Request, Response } from "express"
import UserDTO from "../dtos/UserDTO"
import { UserService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import {
  IUpdatePasswordSchema,
  IUpdateSchema,
} from "../validations/user_validation"
import bcrypt from "bcrypt"

class UserController {
  /**
   * @route GET user/me
   * @desc Get current logged in user
   * @access Private
   */
  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({
        ok: true,
        user: req.user,
      })
    } catch (err) {
      next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route GET user/update
   * @desc Update profile
   * @access Private
   */
  static async update(
    req: Request<{}, {}, IUpdateSchema["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.updateByID(req.user.id, req.body)
      await UserService.setUser(new UserDTO(user))

      res.json({
        ok: true,
        user: new UserDTO(user),
        message: "Profile updated successfully!",
      })
    } catch (err) {
      next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route PATCH user/change-password
   * @desc Update password
   * @access Private
   */
  static async changePassword(
    req: Request<{}, {}, IUpdatePasswordSchema["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 12)
      const user = await UserService.updateByID(req.user.id, {
        password: hashedPassword,
      })
      res.json({
        ok: true,
        user: new UserDTO(user),
        message: "Password chnged successfully!",
      })
    } catch (err) {
      next(CreateHttpError.internalServerError())
    }
  }
}

export default UserController

import { Roles } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import CreateHttpError from "../utils/create_http_error"

export default async function admin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user
    if (user.role !== Roles.ADMIN)
      throw new Error("You are not allowed to access this resource.")
    next()
  } catch (err) {
    // @ts-ignore
    next(CreateHttpError.unauthorized(err.message))
  }
}

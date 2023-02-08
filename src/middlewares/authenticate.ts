import { NextFunction, Request, Response } from "express"
import { UserService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import { verifyAccessToken } from "../utils/jwt"

export default async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.headers["authorization"]
    if (!token) throw new Error("Token not found!")
    token = token.split(" ")[1]

    const payload = verifyAccessToken(token)

    const user = await UserService.getUser(payload.id)

    if (!user) throw new Error("No user found!")

    req.user = user
    next()
  } catch (e) {
    next(CreateHttpError.unauthorized())
  }
}

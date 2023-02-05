import { NextFunction, Request, Response } from "express"
import { SessionService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import { verifyAccessToken } from "../utils/jwt"

export default async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.headers["authorization"]
    const { refreshtoken } = req.headers

    if (!token) throw new Error("Token not found!")

    const session = await SessionService.findByToken(refreshtoken as string)

    if (!session) throw new Error("Session not found")

    token = token.split(" ")[1]
    const payload = verifyAccessToken(token)
    req.user = {
      id: payload.id,
    }
    next()
  } catch (e) {
    next(CreateHttpError.unauthorized())
  }
}

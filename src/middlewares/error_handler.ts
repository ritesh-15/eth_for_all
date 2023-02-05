import { NextFunction, Request, Response } from "express"
import CreateHttpError from "../utils/create_http_error"
import logger from "../utils/logger"

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(error)

  if (error instanceof CreateHttpError) {
    return res.status(error.status).json({
      ok: false,
      message: error.message,
      code: error.status,
      error: error.error,
    })
  }

  return res.status(500).json({
    ok: false,
    message: "Something went wrong at our side, please try again later!",
    code: 500,
    error: "Internal server error!",
  })
}

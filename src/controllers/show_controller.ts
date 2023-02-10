import { NextFunction, Request, Response } from "express"
import { ShowService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import logger from "../utils/logger"
import { INewShowSchema } from "../validations/show_validation"

class ShowController {
  static async addNewShow(
    req: Request<{}, {}, INewShowSchema["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await ShowService.create(req.body)
      res.status(201).json({
        ok: true,
        message: "Show created successfully!",
      })
    } catch (error) {
      logger.error(error)
      next(CreateHttpError.internalServerError())
    }
  }
}

export default ShowController

import { NextFunction, Request, Response } from "express"
import { CinemaHallService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import logger from "../utils/logger"
import { IAddCinemaHallSchema } from "../validations/cinema_hall_validation"

class CinemaHallController {
  static async addNewHall(
    req: Request<{}, {}, IAddCinemaHallSchema["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await CinemaHallService.create(req.body)
      res.status(201).json({
        ok: true,
        message: "Cinema hall added successfully",
      })
    } catch (error) {
      logger.error(error)
      next(CreateHttpError.internalServerError())
    }
  }
}

export default CinemaHallController

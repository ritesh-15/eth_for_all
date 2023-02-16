import { NextFunction, Request, Response } from "express"
import { CinemaHallService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import logger from "../utils/logger"
import {
  IAddCinemaHallSchema,
  IUpdateCinemaHallSchema,
} from "../validations/cinema_hall_validation"

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

  static async getAllCinemaHalls(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const halls = await CinemaHallService.findAll()
      res.status(201).json({
        ok: true,
        halls,
      })
    } catch (error) {
      logger.error(error)
      next(CreateHttpError.internalServerError())
    }
  }

  static async updateCinemaHall(
    req: Request<
      IUpdateCinemaHallSchema["params"],
      {},
      IUpdateCinemaHallSchema["body"]
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params
      const hall = await CinemaHallService.findByID(id)
      if (!hall) return next(CreateHttpError.notFound("Cinema hall not found!"))

      await CinemaHallService.updateByID(id, req.body)

      res.status(201).json({
        ok: true,
        hall,
        message: "Updated successfully",
      })
    } catch (error) {
      logger.error(error)
      next(CreateHttpError.internalServerError())
    }
  }

  static async deleteCinemaHall(
    req: Request<IUpdateCinemaHallSchema["params"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params

      const hall = await CinemaHallService.findByID(id)
      if (!hall) return next(CreateHttpError.notFound("Cinema hall not found!"))

      await CinemaHallService.deleteByID(id)

      res.status(201).json({
        ok: true,
        message: "Deleted successfully",
      })
    } catch (error) {
      logger.error(error)
      next(CreateHttpError.internalServerError())
    }
  }
}

export default CinemaHallController

import { NextFunction, Request, Response } from "express"
import { ShowService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import logger from "../utils/logger"
import { IGetMovieShows, INewShowSchema } from "../validations/show_validation"

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

  static async getMovieShows(
    req: Request<IGetMovieShows["params"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { movieId } = req.params
      const shows = await ShowService.findShowsByMovieID(movieId)
      res.json({
        ok: true,
        shows,
      })
    } catch (error) {
      logger.error(error)
      next(CreateHttpError.internalServerError())
    }
  }
}

export default ShowController

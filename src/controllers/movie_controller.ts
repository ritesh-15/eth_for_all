import { NextFunction, Request, Response } from "express"
import { MovieService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import { IAddMovieSchema } from "../validations/movie_validation"

class MovieController {
  /**
   * @route POST movie/add-new
   * @desc Add new movie
   * @access Private Admin only
   */
  static async addNewMovie(
    req: Request<{}, {}, IAddMovieSchema["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const movie = await MovieService.create(req.body)
      res.status(201).json({
        ok: true,
        message: "Movie created successfully",
        movie: movie,
      })
    } catch (e) {
      console.log(e)
      next(CreateHttpError.internalServerError())
    }
  }
}

export default MovieController

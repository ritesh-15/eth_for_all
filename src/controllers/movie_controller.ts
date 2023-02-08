import { NextFunction, Request, Response } from "express"
import { MovieService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import {
  IAddMovieSchema,
  IGetAllMoviesSchema,
} from "../validations/movie_validation"

class MovieController {
  /**
   * @route POST movie/
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
      await MovieService.delMovies()
      res.status(201).json({
        ok: true,
        message: "Movie created successfully",
        movie: movie,
      })
    } catch (e) {
      next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route GET movie/?name=
   * @desc Get all movies
   * @access Public
   */
  static async getMovies(
    req: Request<{}, {}, {}, IGetAllMoviesSchema["query"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name } = req.query

      let movies = await MovieService.getMovies()

      if (movies !== null)
        return res.json({
          ok: true,
          movies,
        })

      movies = await MovieService.findAll(name)

      await MovieService.setMovies(movies)

      res.json({
        ok: true,
        movies,
      })
    } catch (e) {
      next(CreateHttpError.internalServerError())
    }
  }
}

export default MovieController

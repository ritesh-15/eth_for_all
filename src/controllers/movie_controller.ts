import { NextFunction, Request, Response } from "express"
import { MovieService } from "../services"
import CreateHttpError from "../utils/create_http_error"
import {
  IAddMovieSchema,
  IGetAllMoviesSchema,
  IUpdateMovieSchema,
  ISingleMovieSchema,
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
   * @route GET movie/
   * @desc Get all movies
   * @access Public
   */
  static async getMovies(req: Request, res: Response, next: NextFunction) {
    try {
      let movies = await MovieService.getMovies()

      if (movies !== null)
        return res.json({
          ok: true,
          movies,
        })

      movies = await MovieService.findAll()

      await MovieService.setMovies(movies)

      res.json({
        ok: true,
        movies,
      })
    } catch (e) {
      next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route GET movie/search
   * @desc Serach movies
   * @access Public
   */
  static async searchMovies(
    req: Request<{}, {}, {}, IGetAllMoviesSchema["query"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name } = req.query
      const movies = await MovieService.findAll(name)
      res.json({
        ok: true,
        movies,
      })
    } catch (e) {
      next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route PUT movie/:id
   * @desc Update movie
   * @access Private Admin Only
   */
  static async updateMovie(
    req: Request<IUpdateMovieSchema["params"], {}, IUpdateMovieSchema["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body
      await Promise.all([
        MovieService.updateMovie(req.params.id, body),
        MovieService.delMovies(),
        MovieService.delMovie(req.params.id),
      ])
      res.json({
        ok: true,
        message: "Movie updated successfully",
      })
    } catch (e) {
      next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route GET movie/:id
   * @desc Get single movie
   * @access Public
   */
  static async singleMovie(
    req: Request<ISingleMovieSchema["params"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params
      let movie = await MovieService.getMovie(id)

      if (movie)
        return res.json({
          ok: true,
          movie,
        })

      movie = await MovieService.findByID(id)

      if (!movie)
        return next(CreateHttpError.notFound("Movie not found with given id!"))

      await MovieService.setMovie(movie)

      res.json({
        ok: true,
        movie,
      })
    } catch (e) {
      next(CreateHttpError.internalServerError())
    }
  }

  /**
   * @route DELETE movie/:id
   * @desc Get single movie
   * @access Public
   */
  static async deleteMovie(
    req: Request<ISingleMovieSchema["params"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params

      const movie = await MovieService.findByID(id)

      if (!movie)
        return next(CreateHttpError.notFound("Movie not found with given id!"))

      await Promise.all([
        MovieService.deleteByID(id),
        MovieService.delMovies(),
        MovieService.delMovie(req.params.id),
      ])

      res.json({
        ok: true,
        message: "Movie deleted successfully!",
      })
    } catch (e) {
      next(CreateHttpError.internalServerError())
    }
  }
}

export default MovieController

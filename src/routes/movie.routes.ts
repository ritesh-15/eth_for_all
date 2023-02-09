import { Router } from "express"
import { MovieController } from "../controllers"
import { authenticate, validateData } from "../middlewares"
import admin from "../middlewares/admin"
import {
  AddMovieSchema,
  UpdateMovieSchema,
  GetAllMoviesSchema,
  SingleMovieSchema,
} from "../validations/movie_validation"

const router = Router()

router
  .route("/")
  .post(
    [authenticate, admin, validateData(AddMovieSchema)],
    MovieController.addNewMovie
  )
  .get(MovieController.getMovies)

router
  .route("/search")
  .get(validateData(GetAllMoviesSchema), MovieController.searchMovies)

router
  .route("/:id")
  .put(
    [authenticate, admin, validateData(UpdateMovieSchema)],
    MovieController.updateMovie
  )
  .get([validateData(SingleMovieSchema)], MovieController.singleMovie)
  .delete(
    [authenticate, admin, validateData(SingleMovieSchema)],
    MovieController.deleteMovie
  )

export default router

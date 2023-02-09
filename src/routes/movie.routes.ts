import { Router } from "express"
import { MovieController } from "../controllers"
import { authenticate, validateData } from "../middlewares"
import admin from "../middlewares/admin"
import {
  AddMovieSchema,
  UpdateMovieSchema,
  GetAllMoviesSchema,
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

export default router

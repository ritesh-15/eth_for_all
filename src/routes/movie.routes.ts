import { Router } from "express"
import { MovieController } from "../controllers"
import { authenticate, validateData } from "../middlewares"
import admin from "../middlewares/admin"
import { AddMovieSchema } from "../validations/movie_validation"

const router = Router()

router
  .route("/")
  .post(
    [authenticate, admin, validateData(AddMovieSchema)],
    MovieController.addNewMovie
  )
  .get(MovieController.getMovies)

export default router

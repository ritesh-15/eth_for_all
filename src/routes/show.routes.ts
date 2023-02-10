import { Router } from "express"
import { showRouter } from "."
import { ShowController } from "../controllers"
import { authenticate, validateData } from "../middlewares"
import admin from "../middlewares/admin"
import {
  DeleteShowSchema,
  GetMovieShows,
  NewShowSchema,
  UpdateShowSchema,
} from "../validations/show_validation"

const router = Router()

// add new show
router
  .route("/")
  .post(
    [authenticate, admin, validateData(NewShowSchema)],
    ShowController.addNewShow
  )

// delete show

router
  .route("/:showId")
  .delete(
    [authenticate, admin, validateData(DeleteShowSchema)],
    ShowController.deleteShow
  )
  .patch(
    [authenticate, admin, validateData(UpdateShowSchema)],
    ShowController.updateShow
  )

// get all shows
router
  .route("/:movieId")
  .get(validateData(GetMovieShows), ShowController.getMovieShows)

export default router

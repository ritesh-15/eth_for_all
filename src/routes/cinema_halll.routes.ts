import { Router } from "express"
import { CinemaHallController } from "../controllers"
import { authenticate, validateData } from "../middlewares"
import admin from "../middlewares/admin"
import { AddCinemaHallSchema } from "../validations/cinema_hall_validation"

const router = Router()

// add cinema hall
router
  .route("/")
  .post(
    [authenticate, admin, validateData(AddCinemaHallSchema)],
    CinemaHallController.addNewHall
  )

export default router

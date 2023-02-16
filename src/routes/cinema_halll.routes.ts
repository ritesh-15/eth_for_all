import { Router } from "express"
import { CinemaHallController } from "../controllers"
import { authenticate, validateData } from "../middlewares"
import admin from "../middlewares/admin"
import {
  AddCinemaHallSchema,
  DeleteCienemaHallSchema,
  UpdateCinemaHallSchema,
} from "../validations/cinema_hall_validation"

const router = Router()

// add cinema hall
router
  .route("/")
  .post(
    [authenticate, admin, validateData(AddCinemaHallSchema)],
    CinemaHallController.addNewHall
  )
  .get([authenticate, admin], CinemaHallController.getAllCinemaHalls)

// delete and update cinema hall
router
  .route("/:id")
  .patch(
    [authenticate, admin, validateData(UpdateCinemaHallSchema)],
    CinemaHallController.updateCinemaHall
  )
  .delete(
    [authenticate, admin, validateData(DeleteCienemaHallSchema)],
    CinemaHallController.deleteCinemaHall
  )

export default router

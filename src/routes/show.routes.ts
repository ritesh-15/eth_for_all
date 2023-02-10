import { Router } from "express"
import { ShowController } from "../controllers"
import { authenticate, validateData } from "../middlewares"
import admin from "../middlewares/admin"
import { NewShowSchema } from "../validations/show_validation"

const router = Router()

// add new show
router
  .route("/")
  .post(
    [authenticate, admin, validateData(NewShowSchema)],
    ShowController.addNewShow
  )

// delete show

// update show

// get show

// get all shows

export default router

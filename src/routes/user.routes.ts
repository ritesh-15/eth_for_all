import { Router } from "express"
import { UserController } from "../controllers"
import { authenticate, validateData } from "../middlewares"
import {
  UpdatePasswordSchema,
  UpdateSchema,
} from "../validations/user_validation"

const router = Router()

router.route("/me").get(authenticate, UserController.me)

router
  .route("/update")
  .patch(authenticate, validateData(UpdateSchema), UserController.update)

router
  .route("/change-password")
  .patch(
    authenticate,
    validateData(UpdatePasswordSchema),
    UserController.changePassword
  )

export default router

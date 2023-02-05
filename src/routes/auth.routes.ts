import { Router } from "express"
import { AuthController } from "../controllers"
import { authenticate, validateData } from "../middlewares"
import {
  CreateAccountSchema,
  LoginSchema,
  SendOTPSchema,
  VerifyOTPSchema,
} from "../validations/auth_validations"

const router = Router()

router
  .route("/register")
  .post(validateData(CreateAccountSchema), AuthController.createNewAccount)

router.route("/login").post(validateData(LoginSchema), AuthController.login)

router
  .route("/verify-otp")
  .post(validateData(VerifyOTPSchema), AuthController.verifyOtp)

router
  .route("/send-otp")
  .post(validateData(SendOTPSchema), AuthController.sendOtp)

router.route("/logout").delete(authenticate, AuthController.logout)

router.route("/refresh").get(AuthController.refresh)

export default router

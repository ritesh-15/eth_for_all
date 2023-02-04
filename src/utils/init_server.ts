import { Application, json, NextFunction, Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import morgan from "morgan"
import CreateHttpError from "./create_http_error"
import { errorHandler } from "../middlewares"
import rateLimiter from "./rate_limiter"
import { autheRouter } from "../routes"

export default function initServer(app: Application) {
  app.use(json())

  app.use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  )

  app.use(cookieParser())

  app.use(helmet())

  app.use(morgan("dev"))

  app.use(rateLimiter)

  app.use("/api/v1/auth", autheRouter)

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(
      CreateHttpError.notImplemented(
        "The route your looking for is not implemented!"
      )
    )
  })

  app.use(errorHandler)
}

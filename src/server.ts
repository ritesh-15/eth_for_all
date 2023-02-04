import express, { Application } from "express"
import Prisma from "./helper/prisma_client"
import initServer from "./utils/init_server"
import logger from "./utils/logger"

const app: Application = express()

initServer(app)

const PORT = process.env.PORT || 9000

app.listen(PORT, async () => {
  try {
    await Prisma.get().$connect()
    logger.info(`Listening on port ${PORT} 🚀🚀`)
    logger.info("Database connected successfully! ✅✅")
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
})

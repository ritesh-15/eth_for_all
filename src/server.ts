import express, { Application } from "express"
import initServer from "./utils/init_server"
import logger from "./utils/logger"

const app: Application = express()

initServer(app)

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT} 🚀🚀`)
})

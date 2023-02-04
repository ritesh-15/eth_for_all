import path from "path"
import winston, { createLogger, format, transports } from "winston"
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

let logger: winston.Logger

if (process.env.NODE_ENV === "production") {
  logger = createLogger({
    level: "debug",
    format: combine(timestamp(), myFormat),
    transports: [new transports.Console()],
  })
} else {
  logger = createLogger({
    level: "debug",
    format: combine(
      format.colorize(),
      timestamp({ format: "YYYY:MM:DD hh:mm:ss" }),
      myFormat
    ),
    transports: [new transports.Console()],
  })
}

export default logger

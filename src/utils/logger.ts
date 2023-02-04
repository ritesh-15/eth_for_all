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
    transports: [
      new transports.Console(),
      new transports.File({
        level: "error",

        format: format.prettyPrint(),
      }),
      new transports.File({
        level: "info",

        format: format.prettyPrint(),
      }),
      new transports.File({
        level: "debug",

        format: format.prettyPrint(),
      }),
    ],
  })
} else {
  logger = createLogger({
    level: "debug",
    format: combine(
      format.colorize(),
      timestamp({ format: "YYYY:MM:DD hh:mm:ss" }),
      myFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        level: "error",
        format: format.prettyPrint(),
      }),
      new transports.File({
        level: "info",
        format: format.prettyPrint(),
      }),
      new transports.File({
        level: "debug",
        format: format.prettyPrint(),
      }),
    ],
  })
}

export default logger

import { NextFunction, Request, Response } from "express"
import z from "zod"
import CreateHttpError from "../utils/create_http_error"

function formateZodError(error: z.ZodError<any>) {
  return error.errors.map((error) => {
    return {
      message: error.message,
    }
  })
}

export default function validateData(schema: z.AnyZodObject) {
  return async (req: Request, Res: Response, next: NextFunction) => {
    const body = req.body
    const parsed = await schema.safeParseAsync(body)
    if (parsed.success) return next()
    next(CreateHttpError.unprocessableEntity(formateZodError(parsed.error)))
  }
}

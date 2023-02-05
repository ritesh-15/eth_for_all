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
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (e: any) {
      next(CreateHttpError.unprocessableEntity(formateZodError(e)))
    }
  }
}

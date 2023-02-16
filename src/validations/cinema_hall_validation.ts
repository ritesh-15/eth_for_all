import z from "zod"

// single movie schema
export const AddCinemaHallSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Cinema hall name is require" }),
    totalSeats: z.number({ required_error: "Total seats required" }),
  }),
})

export type IAddCinemaHallSchema = z.infer<typeof AddCinemaHallSchema>

// update cinema hall
export const UpdateCinemaHallSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Cinema hall name is require" }),
    totalSeats: z.number({ required_error: "Total seats required" }),
  }),
  params: z.object({
    id: z
      .string({ required_error: "Cinema hall id is required" })
      .uuid("Cinema hall id must be valid"),
  }),
})

export type IUpdateCinemaHallSchema = z.infer<typeof UpdateCinemaHallSchema>

// delete cinema hall
export const DeleteCienemaHallSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: "Cinema hall id is required" })
      .uuid("Cinema hall id must be valid"),
  }),
})

export type IDeleteCienemaHallSchema = z.infer<typeof DeleteCienemaHallSchema>

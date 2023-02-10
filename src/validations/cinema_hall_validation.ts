import z from "zod"

// single movie schema
export const AddCinemaHallSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Cinema hall name is require" }),
    totalSeats: z.number({ required_error: "Total seats required" }),
  }),
})

export type IAddCinemaHallSchema = z.infer<typeof AddCinemaHallSchema>

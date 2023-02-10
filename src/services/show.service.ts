import Prisma from "../helper/prisma_client"
import { INewShowSchema } from "../validations/show_validation"

class ShowService {
  static create(data: INewShowSchema["body"]) {
    return Prisma.get().show.create({ data })
  }

  static findShowsByMovieID(movieId: string) {
    return Prisma.get().show.findMany({
      where: {
        movieId,
      },
      include: {
        showSeats: true,
        bookings: true,
        cinemaHall: true,
      },
    })
  }
}

export default ShowService

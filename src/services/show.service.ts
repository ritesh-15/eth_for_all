import Prisma from "../helper/prisma_client"
import {
  INewShowSchema,
  IUpdateShowSchema,
} from "../validations/show_validation"

class ShowService {
  static findByID(showId: string) {
    return Prisma.get().show.findUnique({
      where: {
        id: showId,
      },
      include: {
        showSeats: true,
        bookings: true,
        cinemaHall: true,
      },
    })
  }

  static updateShowByID(showId: string, data: IUpdateShowSchema["body"]) {
    return Prisma.get().show.update({
      where: {
        id: showId,
      },
      data,
    })
  }

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

  static deleteShowByID(id: string) {
    return Prisma.get().show.delete({
      where: {
        id,
      },
    })
  }
}

export default ShowService

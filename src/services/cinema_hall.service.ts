import Prisma from "../helper/prisma_client"
import {
  IAddCinemaHallSchema,
  IUpdateCinemaHallSchema,
} from "../validations/cinema_hall_validation"

class CinemaHallService {
  static create(data: IAddCinemaHallSchema["body"]) {
    return Prisma.get().cinemaHall.create({ data })
  }

  static findAll() {
    return Prisma.get().cinemaHall.findMany()
  }

  static findByID(id: string) {
    return Prisma.get().cinemaHall.findUnique({
      where: {
        id,
      },
    })
  }

  static updateByID(id: string, data: IUpdateCinemaHallSchema["body"]) {
    return Prisma.get().cinemaHall.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })
  }

  static deleteByID(id: string) {
    return Prisma.get().cinemaHall.delete({
      where: {
        id,
      },
    })
  }
}

export default CinemaHallService

import { User } from "@prisma/client"
import Prisma from "../helper/prisma_client"

export interface IUpdateUser {
  isVerified?: boolean
  name?: string
  avatar?: string
  password?: string
}

class UserService {
  static findUserByPhoneOREmail(phone: number, email: string) {
    return Prisma.get().user.findFirst({
      where: {
        OR: [{ phone }, { email }],
      },
    })
  }

  static findByEmail(email: string) {
    return Prisma.get().user.findUnique({
      where: {
        email,
      },
    })
  }

  static findByID(id: string) {
    return Prisma.get().user.findUnique({
      where: {
        id,
      },
    })
  }

  static updateByID(id: string, data: IUpdateUser) {
    return Prisma.get().user.update({
      where: {
        id,
      },
      data,
    })
  }

  static create(phone: number, email: string) {
    return Prisma.get().user.create({
      data: {
        phone,
        email,
      },
    })
  }
}

export default UserService

import UserDTO from "../dtos/UserDTO"
import Prisma from "../helper/prisma_client"
import Redis from "../helper/redis_client"

export interface IUpdateUser {
  isVerified?: boolean
  name?: string
  avatar?: string
  password?: string
  email?: string
  phone?: string
}

class UserService {
  static USER_KEY = "USER"

  static setUser(user: UserDTO) {
    return Redis.get().set(`${this.USER_KEY}-${user.id}`, JSON.stringify(user))
  }

  static async getUser(userId: string): Promise<UserDTO | null> {
    const user = await Redis.get().get(`${this.USER_KEY}-${userId}`)
    if (!user) return null
    return JSON.parse(user)
  }

  static async deleteUser(userId: string) {
    await Redis.get().del(`${this.USER_KEY}-${userId}`)
  }

  static findUserByPhoneOREmail(phone: string, email: string) {
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

  static findByWalletAddress(address: string) {
    return Prisma.get().user.findUnique({
      where: {
        walletAddress: address,
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

  static createByWallet(address: string) {
    return Prisma.get().user.create({
      data: {
        walletAddress: address,
      },
    })
  }

  static createByPhoneAndEmail(phone: string, email: string) {
    return Prisma.get().user.create({
      data: {
        phone,
        email,
      },
    })
  }
}

export default UserService

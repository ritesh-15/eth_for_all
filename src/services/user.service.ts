import Prisma from "../helper/prisma_client"

class UserService {
  findUserByPhoneOREmail(phone: number, email: string) {
    return Prisma.get().user.findFirst({
      where: {
        OR: [{ phone }, { email }],
      },
    })
  }

  create(phone: number, email: string) {
    return Prisma.get().user.create({
      data: {
        phone,
        email,
      },
    })
  }
}

export default UserService

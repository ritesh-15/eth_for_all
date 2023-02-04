import { User } from "@prisma/client"

class UserDTO {
  name: string | null
  id: string
  email: string
  phone: string
  avatar: string | null
  isVerified: boolean

  constructor(user: User) {
    this.name = user.name
    this.id = user.id
    this.email = user.email
    this.phone = String(user.phone)
    this.avatar = user.avatar
    this.isVerified = user.isVerified
  }
}

export default UserDTO

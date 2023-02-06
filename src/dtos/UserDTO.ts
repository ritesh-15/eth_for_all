import { Roles, User } from "@prisma/client"

class UserDTO {
  name: string | null
  id: string
  email: string | null
  phone: string | null
  avatar: string | null
  isVerified: boolean
  role: Roles
  walletAddress: string | null

  constructor(user: User) {
    this.name = user.name
    this.id = user.id
    this.email = user.email
    this.phone = user.phone
    this.avatar = user.avatar
    this.isVerified = user.isVerified
    this.role = user.role
    this.walletAddress = user.walletAddress
  }
}

export default UserDTO

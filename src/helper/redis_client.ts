import { createClient, RedisClientType } from "redis"

class Redis {
  static client: RedisClientType | null = null

  static get() {
    if (this.client === null) {
      this.client = createClient()
      return this.client
    }
    return this.client
  }
}

export default Redis

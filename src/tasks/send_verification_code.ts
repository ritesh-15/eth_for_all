import Queue from "bull"
import OtpHelper from "../helper/otp_helper"
import logger from "../utils/logger"

const verficationCodeQueue = new Queue("send_verification_code")

verficationCodeQueue.process(async (job, done) => {
  try {
    const meta = job.data.meta
    const otp = new OtpHelper({ email: meta.email })
    otp.setData(meta)
    const response = await otp.send()
    done(null, response)
  } catch (err) {
    // @ts-ignore
    done(err)
  }
})

verficationCodeQueue.on("error", (err) => {
  logger.error(err)
})

export default verficationCodeQueue

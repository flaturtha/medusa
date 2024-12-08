import { AbstractNotificationService } from "@medusajs/medusa"
import { Logger } from "@medusajs/types"
import { Resend } from "resend"

type NotificationData = {
  to: string
  data?: Record<string, unknown>
}

class ResendService extends AbstractNotificationService {
  protected identifier = "resend"
  protected resendClient: Resend
  protected logger: Logger

  constructor({ logger }, options) {
    super()
    this.logger = logger
    this.resendClient = new Resend(options.api_key)
    this.options = options
  }

  async sendNotification(
    event: string,
    data: NotificationData,
    attachmentGenerator: unknown
  ): Promise<{ 
    to: string; 
    status: string; 
    data: Record<string, unknown>; 
  }> {
    this.logger.debug(`Sending email via Resend to ${data.to}`)

    try {
      const response = await this.resendClient.emails.send({
        from: this.options.from,
        to: data.to,
        subject: data.data?.subject as string,
        html: data.data?.html as string,
      })

      this.logger.debug("Email sent successfully", response)

      return {
        to: data.to,
        status: "success",
        data: {
          ...data.data,
          sent_at: new Date(),
          response,
        },
      }
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`)
      throw error
    }
  }
}

export default ResendService 
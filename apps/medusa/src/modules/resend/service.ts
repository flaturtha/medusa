import { 
  AbstractNotificationProviderService
} from "@medusajs/framework/utils"
import { Logger } from "@medusajs/framework/types"
import { Resend } from "resend"

type NotificationData = {
  to: string
  data?: Record<string, unknown>
  template?: string
}

type NotificationResult = {
  id: string
  response: { success: boolean }
  content: {
    to: string
    subject?: string
    html?: string
  }
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "notification-resend"
  private resendClient: Resend
  private options: {
    api_key: string
    from: string
  }
  private logger: Logger

  constructor(
    { logger }: { logger: Logger }, 
    options: { api_key: string; from: string }
  ) {
    super()
    this.resendClient = new Resend(options.api_key)
    this.options = options
    this.logger = logger
  }

  async send(
    notification: NotificationData
  ): Promise<NotificationResult> {
    this.logger.debug(`Sending notification via Resend to ${notification.to}`)

    if (!notification.to) {
      throw new Error("No recipient provided")
    }

    try {
      const result = await this.resendClient.emails.send({
        from: this.options.from,
        to: notification.to,
        subject: notification.data?.subject as string ?? "Notification",
        html: notification.template ?? notification.data?.html as string ?? "",
      })

      this.logger.debug(`Email sent successfully with ID ${result.data.id}`)

      return {
        id: result.data.id,
        response: { success: true },
        content: {
          to: notification.to,
          subject: notification.data?.subject as string,
          html: notification.template ?? notification.data?.html as string,
        },
      }
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`)
      throw error
    }
  }

  async sendNotification(
    event: string,
    data: NotificationData
  ): Promise<NotificationResult> {
    this.logger.debug(`Received notification event: ${event}`)
    return this.send(data)
  }
}

export default ResendNotificationProviderService 
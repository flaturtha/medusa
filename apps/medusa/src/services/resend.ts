import { Resend } from "resend"

type NotificationData = {
  to: string
  data?: Record<string, unknown>
  template?: string
}

class ResendService {
  static identifier = "resend"
  protected resendClient_: Resend
  protected fromEmail_: string

  constructor(_, options) {
    const { api_key, from } = options
    this.resendClient_ = new Resend(api_key)
    this.fromEmail_ = from
  }

  async sendNotification(
    event: string,
    data: NotificationData,
    _attachmentGenerator: unknown
  ): Promise<{ 
    to: string; 
    status: string; 
    data: Record<string, unknown> 
  }> {
    if (!data.to) {
      throw new Error("No recipient provided")
    }

    try {
      await this.resendClient_.emails.send({
        from: this.fromEmail_,
        to: data.to,
        subject: data.data?.subject as string ?? event,
        html: data.template ?? data.data?.html as string ?? "",
      })

      return {
        to: data.to,
        status: "sent",
        data: {
          ...data,
          sent_at: new Date(),
        },
      }
    } catch (error) {
      return {
        to: data.to,
        status: "failed",
        data: {
          ...data,
          error: error.message,
        },
      }
    }
  }
}

export default ResendService 
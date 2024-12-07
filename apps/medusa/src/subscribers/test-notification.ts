import type { SubscriberConfig, SubscriberArgs } from "@medusajs/medusa"
import { Modules } from "@medusajs/utils"

export default async function testNotificationHandler({
  container,
}: SubscriberArgs<Record<string, unknown>>) {
  const notificationService = container.resolve(Modules.NOTIFICATION)

  await notificationService.createNotifications({
    template: "test-email",
    to: "atticus@crowmail.co",
    channel: "email",
    data: {
      subject: "Test Email",
      html: "<h1>Test Notification</h1><p>This is a test email from your Medusa store!</p>",
    },
  })
}

export const config: SubscriberConfig = {
  event: "test.notification",
} 
import { MedusaContainer } from "@medusajs/medusa"
import { Modules } from "@medusajs/utils"

export default async function ({ container }: { container: MedusaContainer }) {
  const notificationService = container.resolve(Modules.NOTIFICATION)

  console.log("Sending test notification...")

  try {
    const result = await notificationService.createNotifications({
      template: "test-email",
      to: "atticus@crowmail.co",
      channel: "email",
      data: {
        subject: "Test Email from Medusa",
        html: `
          <h1>Test Notification</h1>
          <p>This is a test email from your Medusa store!</p>
          <p>Sent at: ${new Date().toISOString()}</p>
        `,
      },
    })

    console.log("Notification sent successfully:", result)
  } catch (error) {
    console.error("Failed to send notification:", error)
    throw error
  }
} 
import { MedusaContainer } from "@medusajs/medusa"
import { Modules } from "@medusajs/utils"

export default async function ({ container }: { container: MedusaContainer }) {
  const notificationService = container.resolve(Modules.NOTIFICATION)
  const token = "test-token-" + Math.random().toString(36).substring(7)

  console.log("Sending user invite notification...")

  try {
    const result = await notificationService.createNotifications({
      template: "user-invite",
      to: "atticus@crowmail.co",
      channel: "email",
      data: {
        subject: "You've been invited to join the team",
        token: token,
        role: "admin",
        first_name: "Atticus",
        html: `
          <h1>Welcome to the team!</h1>
          <p>Hi Atticus,</p>
          <p>You've been invited to join our team as an admin.</p>
          <p>Click the link below to set up your account:</p>
          <p><a href="${process.env.ADMIN_BACKEND_URL}/invite?token=${token}">Accept Invitation</a></p>
          <p>This link will expire in 7 days.</p>
          <p>If you didn't expect this invitation, you can safely ignore this email.</p>
          <br>
          <p>Best regards,</p>
          <p>The Team</p>
        `,
      },
    })

    console.log("User invite sent successfully:", result)
  } catch (error) {
    console.error("Failed to send user invite:", error)
    throw error
  }
} 
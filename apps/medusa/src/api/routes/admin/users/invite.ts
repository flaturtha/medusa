import { Router } from "express"
import { Modules } from "@medusajs/utils"
import { authenticate } from "@medusajs/medusa"

export default (router: Router) => {
  router.post("/users/invite", authenticate(), async (req, res) => {
    const notificationService = req.scope.resolve(Modules.NOTIFICATION)
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      })
    }

    try {
      // Generate a secure token
      const token = crypto.randomUUID()

      // Send the invite notification
      await notificationService.createNotifications({
        template: "user-invite",
        to: email,
        channel: "email",
        data: {
          subject: "You've been invited to join the team",
          token,
          role: "admin", // Default to admin
          html: `
            <h1>Welcome to the team!</h1>
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

      res.json({
        success: true,
        message: "Invitation sent successfully"
      })
    } catch (error) {
      console.error("Failed to send invitation:", error)
      res.status(500).json({
        success: false,
        message: "Failed to send invitation",
        error: error.message
      })
    }
  })

  return router
} 
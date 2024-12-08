import type { SubscriberConfig, SubscriberArgs } from "@medusajs/medusa"
import { Modules } from "@medusajs/utils"

export default async function userInviteHandler({
  event,
  container,
}: SubscriberArgs<Record<string, unknown>>) {
  console.log("Handling user invite event:", event)

  const notificationService = container.resolve(Modules.NOTIFICATION)
  const userModuleService = container.resolve(Modules.USER)

  try {
    const invites = await userModuleService.listInvites({
      id: event.data.id as string
    })

    const invite = invites[0]

    if (!invite) {
      throw new Error(`Invite ${event.data.id} not found`)
    }

    const role = 'admin' // Default to admin since role might not be available
    const acceptUrl = `${process.env.ADMIN_BACKEND_URL}/invite?token=${invite.token}`

    console.log(`Processing invite for: ${invite.email} (role: ${role})`)

    await notificationService.createNotifications({
      to: invite.email,
      template: "user-invite",
      channel: "email",
      data: {
        subject: "Welcome to the Team - Set Up Your Account",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #454545; text-align: center; padding: 20px 0;">Welcome to the Team!</h1>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
              <p style="margin-bottom: 20px;">You've been invited to join our team as an ${role}.</p>
              
              <div style="margin: 30px 0;">
                <h2 style="color: #454545; font-size: 18px;">Next Steps:</h2>
                <ol style="color: #666;">
                  <li>Click the button below to accept your invitation</li>
                  <li>Create your password</li>
                  <li>Start managing your store</li>
                </ol>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${acceptUrl}" 
                   style="background-color: #7C3AED; color: white; padding: 12px 24px; 
                          text-decoration: none; border-radius: 5px; display: inline-block;">
                  Accept Invitation & Set Up Account
                </a>
              </div>

              <p style="color: #666; font-size: 14px;">This invitation link will expire in 7 days.</p>
              <p style="color: #666; font-size: 14px;">If you didn't expect this invitation, you can safely ignore this email.</p>
            </div>

            <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
              <p>Need help? Contact our support team.</p>
            </div>
          </div>
        `,
      },
    })

    console.log(`Invite notification sent successfully to ${invite.email}`)
  } catch (error) {
    console.error("Failed to send invite notification:", error)
    throw error
  }
}

export const config: SubscriberConfig = {
  event: "user.invite.created",
} 
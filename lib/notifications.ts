import type { Child, VaccinationRecord } from "./children"
import { calculateVaccineSchedule } from "./vaccine-schedule"

export interface NotificationPreferences {
  sms: boolean
  email: boolean
  whatsapp: boolean
  reminderDays: number[] // Days before due date to send reminders
}

export interface NotificationTemplate {
  id: string
  type: "sms" | "email" | "whatsapp"
  subject?: string
  content: string
  variables: string[] // Available template variables
}

export interface ScheduledNotification {
  id: string
  childId: string
  parentId: string
  vaccineId: string
  type: "sms" | "email" | "whatsapp"
  scheduledDate: Date
  dueDate: Date
  status: "pending" | "sent" | "failed"
  content: string
  createdAt: Date
}

// Mock notification service
export class NotificationService {
  static async sendSMS(phone: string, message: string): Promise<boolean> {
    // Mock SMS service - would integrate with Twilio, AWS SNS, etc.
    console.log(`SMS to ${phone}: ${message}`)
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000))
  }

  static async sendEmail(email: string, subject: string, content: string): Promise<boolean> {
    // Mock email service - would integrate with SendGrid, AWS SES, etc.
    console.log(`Email to ${email}: ${subject}\n${content}`)
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000))
  }

  static async sendWhatsApp(phone: string, message: string): Promise<boolean> {
    // Mock WhatsApp service - would integrate with WhatsApp Business API
    console.log(`WhatsApp to ${phone}: ${message}`)
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000))
  }
}

// Notification templates
export const notificationTemplates: NotificationTemplate[] = [
  {
    id: "vaccine-reminder-sms",
    type: "sms",
    content:
      "Hi {parentName}! {childName} has {vaccineName} vaccination due on {dueDate}. Please schedule an appointment. - VaxTracker",
    variables: ["parentName", "childName", "vaccineName", "dueDate"],
  },
  {
    id: "vaccine-reminder-email",
    type: "email",
    subject: "Vaccination Reminder for {childName}",
    content: `Dear {parentName},

This is a friendly reminder that {childName} has the following vaccination due:

Vaccine: {vaccineName}
Due Date: {dueDate}
Age: {childAge}

Please schedule an appointment with your healthcare provider to ensure {childName} stays protected.

Why this vaccine is important:
{vaccineImportance}

Best regards,
VaxTracker Team`,
    variables: ["parentName", "childName", "vaccineName", "dueDate", "childAge", "vaccineImportance"],
  },
  {
    id: "vaccine-reminder-whatsapp",
    type: "whatsapp",
    content: `🩺 *Vaccination Reminder*

Hi {parentName}! 

{childName} has *{vaccineName}* vaccination due on *{dueDate}*.

Please schedule an appointment to keep {childName} protected! 💉

- VaxTracker`,
    variables: ["parentName", "childName", "vaccineName", "dueDate"],
  },
]

// Calculate and schedule reminders
export function calculateReminders(
  child: Child,
  vaccinationRecords: VaccinationRecord[],
  preferences: NotificationPreferences,
): ScheduledNotification[] {
  const schedule = calculateVaccineSchedule(child.dateOfBirth, vaccinationRecords)
  const reminders: ScheduledNotification[] = []

  schedule.forEach((vaccine) => {
    if (vaccine.status === "due" || vaccine.status === "upcoming") {
      preferences.reminderDays.forEach((days) => {
        const reminderDate = new Date(vaccine.dueDate)
        reminderDate.setDate(reminderDate.getDate() - days)

        if (reminderDate > new Date()) {
          // Create reminders for each enabled notification type
          if (preferences.sms) {
            reminders.push({
              id: `${child.id}-${vaccine.id}-sms-${days}`,
              childId: child.id,
              parentId: child.parentId,
              vaccineId: vaccine.id,
              type: "sms",
              scheduledDate: reminderDate,
              dueDate: vaccine.dueDate,
              status: "pending",
              content: generateNotificationContent("vaccine-reminder-sms", {
                parentName: "Parent",
                childName: child.name,
                vaccineName: vaccine.name,
                dueDate: vaccine.dueDate.toLocaleDateString(),
              }),
              createdAt: new Date(),
            })
          }

          if (preferences.email) {
            reminders.push({
              id: `${child.id}-${vaccine.id}-email-${days}`,
              childId: child.id,
              parentId: child.parentId,
              vaccineId: vaccine.id,
              type: "email",
              scheduledDate: reminderDate,
              dueDate: vaccine.dueDate,
              status: "pending",
              content: generateNotificationContent("vaccine-reminder-email", {
                parentName: "Parent",
                childName: child.name,
                vaccineName: vaccine.name,
                dueDate: vaccine.dueDate.toLocaleDateString(),
                childAge: calculateAge(child.dateOfBirth),
                vaccineImportance: "This vaccine helps protect against serious diseases.",
              }),
              createdAt: new Date(),
            })
          }

          if (preferences.whatsapp) {
            reminders.push({
              id: `${child.id}-${vaccine.id}-whatsapp-${days}`,
              childId: child.id,
              parentId: child.parentId,
              vaccineId: vaccine.id,
              type: "whatsapp",
              scheduledDate: reminderDate,
              dueDate: vaccine.dueDate,
              status: "pending",
              content: generateNotificationContent("vaccine-reminder-whatsapp", {
                parentName: "Parent",
                childName: child.name,
                vaccineName: vaccine.name,
                dueDate: vaccine.dueDate.toLocaleDateString(),
              }),
              createdAt: new Date(),
            })
          }
        }
      })
    }
  })

  return reminders
}

function generateNotificationContent(templateId: string, variables: Record<string, string>): string {
  const template = notificationTemplates.find((t) => t.id === templateId)
  if (!template) return ""

  let content = template.content
  Object.entries(variables).forEach(([key, value]) => {
    content = content.replace(new RegExp(`{${key}}`, "g"), value)
  })

  return content
}

function calculateAge(dateOfBirth: Date): string {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth())

  if (ageInMonths < 12) {
    return `${ageInMonths} months`
  } else {
    const years = Math.floor(ageInMonths / 12)
    const months = ageInMonths % 12
    return months > 0 ? `${years} years ${months} months` : `${years} years`
  }
}

// Mock data for demonstration
export const mockNotificationPreferences: NotificationPreferences = {
  sms: true,
  email: true,
  whatsapp: false,
  reminderDays: [7, 3, 1], // 7 days, 3 days, 1 day before due date
}

export const mockScheduledNotifications: ScheduledNotification[] = [
  {
    id: "1",
    childId: "1",
    parentId: "parent1",
    vaccineId: "mmr",
    type: "email",
    scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: "pending",
    content: "Dear Parent, Emma has MMR vaccination due on...",
    createdAt: new Date(),
  },
  {
    id: "2",
    childId: "2",
    parentId: "parent1",
    vaccineId: "dtap",
    type: "sms",
    scheduledDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    status: "pending",
    content: "Hi Parent! Alex has DTaP vaccination due on...",
    createdAt: new Date(),
  },
]

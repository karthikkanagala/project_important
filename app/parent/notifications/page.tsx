"use client"

import { useState } from "react"
import { NotificationPreferencesComponent } from "@/components/notifications/notification-preferences"
import { ScheduledNotifications } from "@/components/notifications/scheduled-notifications"
import {
  mockNotificationPreferences,
  mockScheduledNotifications,
  type NotificationPreferences,
} from "@/lib/notifications"

export default function NotificationsPage() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(mockNotificationPreferences)

  const handleSavePreferences = (newPreferences: NotificationPreferences) => {
    setPreferences(newPreferences)
    // In a real app, this would save to the database
    console.log("Saving notification preferences:", newPreferences)
  }

  const handleResendNotification = (notificationId: string) => {
    console.log("Resending notification:", notificationId)
    // In a real app, this would trigger the notification service
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notification Settings</h1>
        <p className="text-muted-foreground mt-2">Manage how you receive vaccination reminders for your children</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <NotificationPreferencesComponent preferences={preferences} onSave={handleSavePreferences} />

        <ScheduledNotifications notifications={mockScheduledNotifications} onResend={handleResendNotification} />
      </div>
    </div>
  )
}

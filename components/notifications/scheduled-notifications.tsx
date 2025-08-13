"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Mail, MessageSquare, Phone } from "lucide-react"
import type { ScheduledNotification } from "@/lib/notifications"

interface ScheduledNotificationsProps {
  notifications: ScheduledNotification[]
  onResend?: (notificationId: string) => void
}

export function ScheduledNotifications({ notifications, onResend }: ScheduledNotificationsProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <Phone className="h-4 w-4" />
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sent":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Notifications</CardTitle>
        <CardDescription>Upcoming and recent vaccination reminders</CardDescription>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No scheduled notifications</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(notification.status)}>{notification.status}</Badge>
                      <span className="text-sm font-medium capitalize">{notification.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.content.substring(0, 100)}...</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Scheduled: {notification.scheduledDate.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Due: {notification.dueDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                {notification.status === "failed" && onResend && (
                  <Button variant="outline" size="sm" onClick={() => onResend(notification.id)}>
                    Resend
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

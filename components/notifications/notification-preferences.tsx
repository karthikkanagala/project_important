"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, Mail, MessageSquare, Phone } from "lucide-react"
import type { NotificationPreferences } from "@/lib/notifications"

interface NotificationPreferencesProps {
  preferences: NotificationPreferences
  onSave: (preferences: NotificationPreferences) => void
}

export function NotificationPreferencesComponent({ preferences, onSave }: NotificationPreferencesProps) {
  const [localPreferences, setLocalPreferences] = useState<NotificationPreferences>(preferences)

  const handleSave = () => {
    onSave(localPreferences)
  }

  const reminderOptions = [
    { value: 14, label: "2 weeks before" },
    { value: 7, label: "1 week before" },
    { value: 3, label: "3 days before" },
    { value: 1, label: "1 day before" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>Choose how and when you want to receive vaccination reminders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Notification Channels</h4>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <Label htmlFor="email">Email Notifications</Label>
            </div>
            <Switch
              id="email"
              checked={localPreferences.email}
              onCheckedChange={(checked) => setLocalPreferences((prev) => ({ ...prev, email: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-600" />
              <Label htmlFor="sms">SMS Notifications</Label>
            </div>
            <Switch
              id="sms"
              checked={localPreferences.sms}
              onCheckedChange={(checked) => setLocalPreferences((prev) => ({ ...prev, sms: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-green-500" />
              <Label htmlFor="whatsapp">WhatsApp Notifications</Label>
            </div>
            <Switch
              id="whatsapp"
              checked={localPreferences.whatsapp}
              onCheckedChange={(checked) => setLocalPreferences((prev) => ({ ...prev, whatsapp: checked }))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Reminder Timing</h4>
          <p className="text-sm text-muted-foreground">
            Select when you want to receive reminders before vaccination due dates
          </p>

          <div className="grid grid-cols-2 gap-3">
            {reminderOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`reminder-${option.value}`}
                  checked={localPreferences.reminderDays.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setLocalPreferences((prev) => ({
                        ...prev,
                        reminderDays: [...prev.reminderDays, option.value].sort((a, b) => b - a),
                      }))
                    } else {
                      setLocalPreferences((prev) => ({
                        ...prev,
                        reminderDays: prev.reminderDays.filter((day) => day !== option.value),
                      }))
                    }
                  }}
                />
                <Label htmlFor={`reminder-${option.value}`} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, AlertTriangle, Clock } from "lucide-react"
import { getUpcomingVaccines } from "@/lib/vaccine-schedule"
import type { Child } from "@/lib/children"

interface UpcomingVaccinesCardProps {
  child: Child
  onViewSchedule?: () => void
}

export function UpcomingVaccinesCard({ child, onViewSchedule }: UpcomingVaccinesCardProps) {
  const upcomingVaccines = getUpcomingVaccines(child, 60) // Next 60 days

  if (upcomingVaccines.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <span>Upcoming Vaccinations</span>
          </CardTitle>
          <CardDescription>No vaccinations due in the next 60 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {child.fullName} is up to date with their vaccination schedule!
          </p>
          {onViewSchedule && (
            <Button variant="outline" onClick={onViewSchedule}>
              View Full Schedule
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Upcoming Vaccinations</span>
        </CardTitle>
        <CardDescription>
          {upcomingVaccines.length} vaccination{upcomingVaccines.length > 1 ? "s" : ""} due soon
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingVaccines.slice(0, 3).map((scheduledVaccine) => (
          <div
            key={`${scheduledVaccine.vaccine.id}-${scheduledVaccine.schedule.doseNumber}`}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {scheduledVaccine.status === "overdue" ? (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              ) : (
                <Clock className="h-5 w-5 text-orange-600" />
              )}

              <div>
                <h4 className="font-medium">
                  {scheduledVaccine.vaccine.shortName} - {scheduledVaccine.schedule.doseDescription}
                </h4>
                <p className="text-sm text-muted-foreground">Due: {scheduledVaccine.dueDate.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant={scheduledVaccine.status === "overdue" ? "destructive" : "secondary"}>
                {scheduledVaccine.status === "overdue" ? "Overdue" : "Due Soon"}
              </Badge>

              {scheduledVaccine.isUrgent && <Badge variant="destructive">Urgent</Badge>}
            </div>
          </div>
        ))}

        {upcomingVaccines.length > 3 && (
          <p className="text-sm text-muted-foreground text-center">And {upcomingVaccines.length - 3} more...</p>
        )}

        {onViewSchedule && (
          <Button onClick={onViewSchedule} className="w-full">
            View Full Schedule
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

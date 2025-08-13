"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, AlertTriangle, Syringe } from "lucide-react"
import {
  generateVaccineSchedule,
  getVaccinationStats,
  formatAgeFromDays,
  type ScheduledVaccine,
} from "@/lib/vaccine-schedule"
import type { Child } from "@/lib/children"

interface VaccineScheduleTimelineProps {
  child: Child
  onRecordVaccination?: (scheduledVaccine: ScheduledVaccine) => void
}

export function VaccineScheduleTimeline({ child, onRecordVaccination }: VaccineScheduleTimelineProps) {
  const schedule = generateVaccineSchedule(child)
  const stats = getVaccinationStats(child)

  const getStatusIcon = (status: ScheduledVaccine["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "due":
        return <Clock className="h-5 w-5 text-orange-600" />
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "upcoming":
        return <Calendar className="h-5 w-5 text-blue-600" />
    }
  }

  const getStatusColor = (status: ScheduledVaccine["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "due":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const completionPercentage = Math.round((stats.completed / stats.total) * 100)

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Syringe className="h-5 w-5" />
            <span>Vaccination Progress for {child.fullName}</span>
          </CardTitle>
          <CardDescription>
            {stats.completed} of {stats.total} vaccinations completed ({completionPercentage}%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={completionPercentage} className="h-3" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.due}</div>
              <div className="text-muted-foreground">Due Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
              <div className="text-muted-foreground">Overdue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
              <div className="text-muted-foreground">Upcoming</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Vaccination Timeline</CardTitle>
          <CardDescription>Complete vaccination schedule based on your child's age</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedule.map((scheduledVaccine, index) => (
              <div
                key={`${scheduledVaccine.vaccine.id}-${scheduledVaccine.schedule.doseNumber}`}
                className="flex items-start space-x-4 p-4 rounded-lg border"
              >
                <div className="flex-shrink-0 mt-1">{getStatusIcon(scheduledVaccine.status)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold">
                        {scheduledVaccine.vaccine.shortName} - {scheduledVaccine.schedule.doseDescription}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">{scheduledVaccine.vaccine.name}</p>

                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className={getStatusColor(scheduledVaccine.status)}>
                          {scheduledVaccine.status.charAt(0).toUpperCase() + scheduledVaccine.status.slice(1)}
                        </Badge>

                        <Badge variant="secondary">
                          Due at: {formatAgeFromDays(scheduledVaccine.schedule.recommendedAgeDays)}
                        </Badge>

                        <Badge variant="secondary">Date: {scheduledVaccine.dueDate.toLocaleDateString()}</Badge>

                        {scheduledVaccine.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                      </div>

                      <p className="text-sm text-muted-foreground">{scheduledVaccine.vaccine.importanceInfo}</p>

                      {scheduledVaccine.vaccinationRecord && (
                        <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                          <p className="font-medium text-green-800">
                            Completed on:{" "}
                            {new Date(scheduledVaccine.vaccinationRecord.vaccinationDate).toLocaleDateString()}
                          </p>
                          {scheduledVaccine.vaccinationRecord.notes && (
                            <p className="text-green-700 mt-1">{scheduledVaccine.vaccinationRecord.notes}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {scheduledVaccine.status !== "completed" && onRecordVaccination && (
                      <Button
                        variant={scheduledVaccine.status === "overdue" ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => onRecordVaccination(scheduledVaccine)}
                        className="ml-4"
                      >
                        Record Vaccination
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Droplet, User, AlertTriangle, Clock } from "lucide-react"
import { calculateAge } from "@/lib/children"
import type { DoctorPatient } from "@/lib/doctor"

interface PatientCardProps {
  patient: DoctorPatient
  onViewDetails: (patient: DoctorPatient) => void
  onRecordVaccination: (patient: DoctorPatient) => void
}

export function PatientCard({ patient, onViewDetails, onRecordVaccination }: PatientCardProps) {
  const age = calculateAge(patient.dateOfBirth)

  const formatAge = () => {
    if (age.years > 0) {
      return `${age.years}y ${age.months}m`
    } else if (age.months > 0) {
      return `${age.months}m ${age.days}d`
    } else {
      return `${age.days}d`
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={patient.profilePictureUrl || "/placeholder.svg"} alt={patient.fullName} />
            <AvatarFallback>
              {patient.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{patient.fullName}</h3>
            <p className="text-sm text-muted-foreground">{formatAge()} old</p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            {patient.overdueCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {patient.overdueCount} Overdue
              </Badge>
            )}
            {patient.upcomingVaccines.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {patient.upcomingVaccines.length} Due Soon
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span>DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="capitalize">{patient.gender}</span>
          </div>
          {patient.bloodGroup && (
            <div className="flex items-center space-x-1">
              <Droplet className="h-3 w-3 text-muted-foreground" />
              <span>{patient.bloodGroup}</span>
            </div>
          )}
          {patient.lastVisit && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span>Last: {new Date(patient.lastVisit).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {patient.allergies && patient.allergies !== "None known" && (
          <div>
            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-800 border-yellow-200">
              Allergies: {patient.allergies}
            </Badge>
          </div>
        )}

        {/* Upcoming Vaccines Preview */}
        {patient.upcomingVaccines.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-muted-foreground">Next Due:</h4>
            {patient.upcomingVaccines.slice(0, 2).map((sv) => (
              <div
                key={`${sv.vaccine.id}-${sv.schedule.doseNumber}`}
                className="flex items-center justify-between text-xs"
              >
                <span>
                  {sv.vaccine.shortName} - {sv.schedule.doseDescription}
                </span>
                <div className="flex items-center space-x-1">
                  {sv.status === "overdue" && <AlertTriangle className="h-3 w-3 text-red-500" />}
                  <span className={sv.status === "overdue" ? "text-red-600" : "text-muted-foreground"}>
                    {sv.dueDate.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <Button onClick={() => onViewDetails(patient)} variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button
            onClick={() => onRecordVaccination(patient)}
            size="sm"
            className="flex-1"
            variant={patient.overdueCount > 0 ? "destructive" : "default"}
          >
            Record Vaccine
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

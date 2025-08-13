"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, User, Calendar, Droplet, Syringe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VaccineScheduleTimeline } from "@/components/vaccines/vaccine-schedule-timeline"
import { VaccinationRecordForm } from "@/components/doctor/vaccination-record-form"
import { getChildById, calculateAge, type Child } from "@/lib/children"
import { getCurrentUser } from "@/lib/auth"
import type { ScheduledVaccine } from "@/lib/vaccine-schedule"

export default function DoctorPatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.patientId as string

  const [patient, setPatient] = useState<Child | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isRecordingVaccination, setIsRecordingVaccination] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [user, patientData] = await Promise.all([getCurrentUser(), getChildById(patientId)])

        setCurrentUser(user)
        setPatient(patientData)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [patientId])

  const handleRecordVaccination = (scheduledVaccine: ScheduledVaccine) => {
    setIsRecordingVaccination(true)
  }

  const handleVaccinationSuccess = () => {
    setIsRecordingVaccination(false)
    // Refresh patient data if needed
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading patient details...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Patient Not Found</CardTitle>
            <CardDescription>The requested patient could not be found</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/doctor/dashboard")}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const age = calculateAge(patient.dateOfBirth)

  const formatAge = () => {
    if (age.years > 0) {
      return `${age.years} year${age.years > 1 ? "s" : ""} ${age.months} month${age.months !== 1 ? "s" : ""}`
    } else if (age.months > 0) {
      return `${age.months} month${age.months > 1 ? "s" : ""} ${age.days} day${age.days !== 1 ? "s" : ""}`
    } else {
      return `${age.days} day${age.days !== 1 ? "s" : ""}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => router.push("/doctor/dashboard")} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">VaxTracker - Doctor Portal</h1>
            </div>
            <Button onClick={() => setIsRecordingVaccination(true)} className="flex items-center space-x-2">
              <Syringe className="h-4 w-4" />
              <span>Record Vaccination</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={patient.profilePictureUrl || "/placeholder.svg"} alt={patient.fullName} />
                  <AvatarFallback className="text-2xl">
                    {patient.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{patient.fullName}</CardTitle>
                <CardDescription>{formatAge()} old</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Born: {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">{patient.gender}</span>
                  </div>
                  {patient.bloodGroup && (
                    <div className="flex items-center space-x-2">
                      <Droplet className="h-4 w-4 text-muted-foreground" />
                      <span>{patient.bloodGroup}</span>
                    </div>
                  )}
                </div>

                {patient.allergies && patient.allergies !== "None known" && (
                  <div>
                    <h4 className="font-medium mb-2">Allergies</h4>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                      {patient.allergies}
                    </Badge>
                  </div>
                )}

                {patient.medicalNotes && (
                  <div>
                    <h4 className="font-medium mb-2">Medical Notes</h4>
                    <p className="text-sm text-muted-foreground">{patient.medicalNotes}</p>
                  </div>
                )}

                {patient.birthWeight && (
                  <div>
                    <h4 className="font-medium mb-2">Birth Information</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Weight: {patient.birthWeight} kg</p>
                      {patient.birthHeight && <p>Height: {patient.birthHeight} cm</p>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Vaccination Timeline */}
          <div className="lg:col-span-2">
            <VaccineScheduleTimeline child={patient} onRecordVaccination={handleRecordVaccination} />
          </div>
        </div>
      </main>

      {/* Record Vaccination Dialog */}
      <Dialog open={isRecordingVaccination} onOpenChange={setIsRecordingVaccination}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Record Vaccination</DialogTitle>
          </DialogHeader>
          <VaccinationRecordForm
            patient={patient}
            doctorId={currentUser?.id || ""}
            onSuccess={handleVaccinationSuccess}
            onCancel={() => setIsRecordingVaccination(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, User, Calendar, Droplet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { VaccineScheduleTimeline } from "@/components/vaccines/vaccine-schedule-timeline"
import { UpcomingVaccinesCard } from "@/components/vaccines/upcoming-vaccines-card"
import { getChildById, calculateAge, type Child } from "@/lib/children"
import type { ScheduledVaccine } from "@/lib/vaccine-schedule"

export default function ChildDetailPage() {
  const params = useParams()
  const router = useRouter()
  const childId = params.childId as string

  const [child, setChild] = useState<Child | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadChild = async () => {
      try {
        const childData = await getChildById(childId)
        setChild(childData)
      } catch (error) {
        console.error("Failed to load child:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadChild()
  }, [childId])

  const handleRecordVaccination = (scheduledVaccine: ScheduledVaccine) => {
    // TODO: Open vaccination recording dialog
    console.log("Record vaccination for:", scheduledVaccine.vaccine.shortName)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading child details...</p>
        </div>
      </div>
    )
  }

  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Child Not Found</CardTitle>
            <CardDescription>The requested child profile could not be found</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/parent/dashboard")}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const age = calculateAge(child.dateOfBirth)

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={() => router.push("/parent/dashboard")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">VaxTracker</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Child Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={child.profilePictureUrl || "/placeholder.svg"} alt={child.fullName} />
                  <AvatarFallback className="text-2xl">
                    {child.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{child.fullName}</CardTitle>
                <CardDescription>{formatAge()} old</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Born: {new Date(child.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">{child.gender}</span>
                  </div>
                  {child.bloodGroup && (
                    <div className="flex items-center space-x-2">
                      <Droplet className="h-4 w-4 text-muted-foreground" />
                      <span>{child.bloodGroup}</span>
                    </div>
                  )}
                </div>

                {child.allergies && child.allergies !== "None known" && (
                  <div>
                    <h4 className="font-medium mb-2">Allergies</h4>
                    <Badge variant="secondary" className="text-xs">
                      {child.allergies}
                    </Badge>
                  </div>
                )}

                {child.medicalNotes && (
                  <div>
                    <h4 className="font-medium mb-2">Medical Notes</h4>
                    <p className="text-sm text-muted-foreground">{child.medicalNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Vaccines */}
            <UpcomingVaccinesCard child={child} />
          </div>

          {/* Vaccination Timeline */}
          <div className="lg:col-span-2">
            <VaccineScheduleTimeline child={child} onRecordVaccination={handleRecordVaccination} />
          </div>
        </div>
      </main>
    </div>
  )
}

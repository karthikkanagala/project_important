"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Users, AlertTriangle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { PatientCard } from "@/components/doctor/patient-card"
import { VaccinationRecordForm } from "@/components/doctor/vaccination-record-form"
import { getDoctorPatients, searchPatients, getDoctorStats, type DoctorPatient } from "@/lib/doctor"
import { getCurrentUser, signOut } from "@/lib/auth"

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<DoctorPatient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<DoctorPatient[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<DoctorPatient | null>(null)
  const [isRecordingVaccination, setIsRecordingVaccination] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          setCurrentUser(user)
          const patientsData = await getDoctorPatients(user.id)
          setPatients(patientsData)
          setFilteredPatients(patientsData)
        }
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    const performSearch = async () => {
      if (currentUser) {
        const results = await searchPatients(currentUser.id, searchQuery)
        setFilteredPatients(results)
      }
    }

    performSearch()
  }, [searchQuery, currentUser])

  const handleViewDetails = (patient: DoctorPatient) => {
    router.push(`/doctor/patient/${patient.id}`)
  }

  const handleRecordVaccination = (patient: DoctorPatient) => {
    setSelectedPatient(patient)
    setIsRecordingVaccination(true)
  }

  const handleVaccinationSuccess = () => {
    setIsRecordingVaccination(false)
    setSelectedPatient(null)
    // Refresh patient data
    if (currentUser) {
      getDoctorPatients(currentUser.id).then((patientsData) => {
        setPatients(patientsData)
        setFilteredPatients(patientsData)
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = getDoctorStats(patients)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">VaxTracker - Doctor Portal</h1>
              <p className="text-sm text-gray-600">Welcome, Dr. {currentUser?.fullName}</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Vaccines</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.totalOverdue}</div>
              <p className="text-xs text-muted-foreground">{stats.patientsWithOverdue} patients affected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
              <Calendar className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.totalUpcoming}</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.totalPatients > 0
                  ? Math.round(((stats.totalPatients - stats.patientsWithOverdue) / stats.totalPatients) * 100)
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">On schedule</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name, ID, or blood group..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {filteredPatients.length} patient{filteredPatients.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </div>
        </div>

        {/* Patients Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Patients</h2>
              <p className="text-gray-600 mt-1">Manage vaccination records for your patients</p>
            </div>
          </div>

          {filteredPatients.length === 0 ? (
            <Card className="text-center py-12">
              <CardHeader>
                <CardTitle>{searchQuery ? "No Patients Found" : "No Patients Yet"}</CardTitle>
                <CardDescription>
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : "Patients will appear here once they are assigned to you"}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onViewDetails={handleViewDetails}
                  onRecordVaccination={handleRecordVaccination}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Record Vaccination Dialog */}
      <Dialog open={isRecordingVaccination} onOpenChange={setIsRecordingVaccination}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Record Vaccination</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <VaccinationRecordForm
              patient={selectedPatient}
              doctorId={currentUser?.id || ""}
              onSuccess={handleVaccinationSuccess}
              onCancel={() => setIsRecordingVaccination(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

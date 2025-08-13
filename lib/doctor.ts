import type { Child } from "./children"
import type { VaccinationRecord, ScheduledVaccine } from "./vaccine-schedule"
import { generateVaccineSchedule, getUpcomingVaccines } from "./vaccine-schedule"

export interface DoctorPatient extends Child {
  lastVisit?: string
  upcomingVaccines: ScheduledVaccine[]
  overdueCount: number
}

// Mock function to get patients for a doctor - replace with database query
export async function getDoctorPatients(doctorId: string): Promise<DoctorPatient[]> {
  // In a real app, this would query the database for children assigned to this doctor
  // For now, we'll return all children as potential patients
  const mockChildren: Child[] = [
    {
      id: "1",
      parentId: "1",
      fullName: "Emma Doe",
      dateOfBirth: "2022-03-15",
      gender: "female",
      bloodGroup: "O+",
      profilePictureUrl: "/adorable-baby-girl.png",
      birthWeight: 3.2,
      birthHeight: 50,
      allergies: "None known",
      medicalNotes: "Healthy baby, no complications",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      parentId: "1",
      fullName: "James Doe",
      dateOfBirth: "2020-08-22",
      gender: "male",
      bloodGroup: "A+",
      profilePictureUrl: "/happy-toddler.png",
      birthWeight: 3.5,
      birthHeight: 52,
      allergies: "Mild peanut allergy",
      medicalNotes: "Regular checkups, developing well",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "3",
      parentId: "2",
      fullName: "Sophia Johnson",
      dateOfBirth: "2023-01-10",
      gender: "female",
      bloodGroup: "B+",
      profilePictureUrl: "/adorable-baby-girl.png",
      birthWeight: 3.0,
      birthHeight: 48,
      allergies: "None known",
      medicalNotes: "Born premature but catching up well",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  ]

  // Convert to DoctorPatient format
  const patients: DoctorPatient[] = mockChildren.map((child) => {
    const schedule = generateVaccineSchedule(child)
    const upcoming = getUpcomingVaccines(child, 30)
    const overdueCount = schedule.filter((sv) => sv.status === "overdue").length

    return {
      ...child,
      upcomingVaccines: upcoming,
      overdueCount,
      lastVisit: "2024-01-15", // Mock last visit date
    }
  })

  return patients
}

export async function searchPatients(doctorId: string, query: string): Promise<DoctorPatient[]> {
  const allPatients = await getDoctorPatients(doctorId)

  if (!query.trim()) {
    return allPatients
  }

  const searchTerm = query.toLowerCase()
  return allPatients.filter(
    (patient) =>
      patient.fullName.toLowerCase().includes(searchTerm) ||
      patient.id.includes(searchTerm) ||
      (patient.bloodGroup && patient.bloodGroup.toLowerCase().includes(searchTerm)),
  )
}

export interface VaccinationRecordInput {
  childId: string
  vaccineId: string
  scheduleId: string
  doseNumber: number
  vaccinationDate: string
  batchNumber?: string
  manufacturer?: string
  siteOfInjection?: string
  notes?: string
  sideEffectsReported?: string
}

export async function recordVaccinationByDoctor(
  doctorId: string,
  recordData: VaccinationRecordInput,
): Promise<VaccinationRecord> {
  // Mock function - replace with database insert
  const newRecord: VaccinationRecord = {
    id: Date.now().toString(),
    ...recordData,
    doctorId,
    status: "completed",
  }

  // In a real app, this would save to database
  console.log("Recording vaccination:", newRecord)

  return newRecord
}

export function getDoctorStats(patients: DoctorPatient[]) {
  const totalPatients = patients.length
  const totalOverdue = patients.reduce((sum, patient) => sum + patient.overdueCount, 0)
  const totalUpcoming = patients.reduce((sum, patient) => sum + patient.upcomingVaccines.length, 0)
  const patientsWithOverdue = patients.filter((patient) => patient.overdueCount > 0).length

  return {
    totalPatients,
    totalOverdue,
    totalUpcoming,
    patientsWithOverdue,
  }
}

import type { Child } from "./children"

export interface Vaccine {
  id: string
  name: string
  shortName: string
  description: string
  manufacturer?: string
  vaccineType: string
  routeOfAdministration: string
  storageTemperature?: string
  contraindications?: string
  sideEffects?: string
  importanceInfo: string
  isMandatory: boolean
  isActive: boolean
}

export interface VaccineSchedule {
  id: string
  vaccineId: string
  doseNumber: number
  recommendedAgeDays: number
  ageRangeStartDays?: number
  ageRangeEndDays?: number
  doseDescription: string
  isBooster: boolean
  intervalFromPreviousDays?: number
}

export interface VaccinationRecord {
  id: string
  childId: string
  vaccineId: string
  scheduleId?: string
  doctorId?: string
  doseNumber: number
  vaccinationDate: string
  batchNumber?: string
  manufacturer?: string
  siteOfInjection?: string
  nextDueDate?: string
  notes?: string
  sideEffectsReported?: string
  status: "completed" | "missed" | "delayed"
}

export interface ScheduledVaccine {
  vaccine: Vaccine
  schedule: VaccineSchedule
  dueDate: Date
  status: "completed" | "due" | "overdue" | "upcoming"
  vaccinationRecord?: VaccinationRecord
  daysFromBirth: number
  isUrgent: boolean
}

// Mock data - replace with database queries later
const mockVaccines: Vaccine[] = [
  {
    id: "1",
    name: "Bacillus Calmette-Guérin",
    shortName: "BCG",
    description: "Protects against tuberculosis",
    vaccineType: "live",
    routeOfAdministration: "intradermal",
    importanceInfo: "Essential for protection against TB, especially important in high TB burden countries like India",
    isMandatory: true,
    isActive: true,
  },
  {
    id: "2",
    name: "Hepatitis B",
    shortName: "Hep B",
    description: "Protects against Hepatitis B virus infection",
    vaccineType: "inactivated",
    routeOfAdministration: "intramuscular",
    importanceInfo: "Prevents chronic liver disease and liver cancer caused by Hepatitis B virus",
    isMandatory: true,
    isActive: true,
  },
  {
    id: "3",
    name: "Oral Polio Vaccine",
    shortName: "OPV",
    description: "Protects against poliomyelitis",
    vaccineType: "live",
    routeOfAdministration: "oral",
    importanceInfo: "Critical for polio eradication. India has been polio-free since 2014",
    isMandatory: true,
    isActive: true,
  },
  {
    id: "4",
    name: "Diphtheria, Pertussis, Tetanus",
    shortName: "DPT",
    description: "Protects against diphtheria, whooping cough, and tetanus",
    vaccineType: "inactivated",
    routeOfAdministration: "intramuscular",
    importanceInfo: "Prevents three serious bacterial infections that can be life-threatening in children",
    isMandatory: true,
    isActive: true,
  },
  {
    id: "5",
    name: "Measles, Mumps, Rubella",
    shortName: "MMR",
    description: "Protects against measles, mumps, and rubella",
    vaccineType: "live",
    routeOfAdministration: "intramuscular",
    importanceInfo: "Prevents three viral infections that can cause serious complications including brain damage",
    isMandatory: true,
    isActive: true,
  },
]

const mockVaccineSchedules: VaccineSchedule[] = [
  // BCG (at birth)
  {
    id: "1",
    vaccineId: "1",
    doseNumber: 1,
    recommendedAgeDays: 0,
    ageRangeStartDays: 0,
    ageRangeEndDays: 365,
    doseDescription: "Birth dose",
    isBooster: false,
  },

  // Hepatitis B (birth, 6 weeks, 14 weeks)
  {
    id: "2",
    vaccineId: "2",
    doseNumber: 1,
    recommendedAgeDays: 0,
    ageRangeStartDays: 0,
    ageRangeEndDays: 7,
    doseDescription: "Birth dose",
    isBooster: false,
  },
  {
    id: "3",
    vaccineId: "2",
    doseNumber: 2,
    recommendedAgeDays: 42,
    ageRangeStartDays: 35,
    ageRangeEndDays: 70,
    doseDescription: "Second dose",
    isBooster: false,
  },
  {
    id: "4",
    vaccineId: "2",
    doseNumber: 3,
    recommendedAgeDays: 98,
    ageRangeStartDays: 91,
    ageRangeEndDays: 126,
    doseDescription: "Third dose",
    isBooster: false,
  },

  // OPV (birth, 6 weeks, 10 weeks, 14 weeks, 16-24 months)
  {
    id: "5",
    vaccineId: "3",
    doseNumber: 1,
    recommendedAgeDays: 0,
    ageRangeStartDays: 0,
    ageRangeEndDays: 14,
    doseDescription: "Birth dose",
    isBooster: false,
  },
  {
    id: "6",
    vaccineId: "3",
    doseNumber: 2,
    recommendedAgeDays: 42,
    ageRangeStartDays: 35,
    ageRangeEndDays: 56,
    doseDescription: "First dose",
    isBooster: false,
  },
  {
    id: "7",
    vaccineId: "3",
    doseNumber: 3,
    recommendedAgeDays: 70,
    ageRangeStartDays: 63,
    ageRangeEndDays: 84,
    doseDescription: "Second dose",
    isBooster: false,
  },
  {
    id: "8",
    vaccineId: "3",
    doseNumber: 4,
    recommendedAgeDays: 98,
    ageRangeStartDays: 91,
    ageRangeEndDays: 112,
    doseDescription: "Third dose",
    isBooster: false,
  },
  {
    id: "9",
    vaccineId: "3",
    doseNumber: 5,
    recommendedAgeDays: 547,
    ageRangeStartDays: 487,
    ageRangeEndDays: 730,
    doseDescription: "Booster",
    isBooster: true,
  },

  // DPT (6 weeks, 10 weeks, 14 weeks, 16-24 months, 5-6 years)
  {
    id: "10",
    vaccineId: "4",
    doseNumber: 1,
    recommendedAgeDays: 42,
    ageRangeStartDays: 35,
    ageRangeEndDays: 56,
    doseDescription: "First dose",
    isBooster: false,
  },
  {
    id: "11",
    vaccineId: "4",
    doseNumber: 2,
    recommendedAgeDays: 70,
    ageRangeStartDays: 63,
    ageRangeEndDays: 84,
    doseDescription: "Second dose",
    isBooster: false,
  },
  {
    id: "12",
    vaccineId: "4",
    doseNumber: 3,
    recommendedAgeDays: 98,
    ageRangeStartDays: 91,
    ageRangeEndDays: 112,
    doseDescription: "Third dose",
    isBooster: false,
  },
  {
    id: "13",
    vaccineId: "4",
    doseNumber: 4,
    recommendedAgeDays: 547,
    ageRangeStartDays: 487,
    ageRangeEndDays: 730,
    doseDescription: "First booster",
    isBooster: true,
  },
  {
    id: "14",
    vaccineId: "4",
    doseNumber: 5,
    recommendedAgeDays: 1825,
    ageRangeStartDays: 1642,
    ageRangeEndDays: 2190,
    doseDescription: "Second booster",
    isBooster: true,
  },

  // MMR (9-12 months, 16-24 months)
  {
    id: "15",
    vaccineId: "5",
    doseNumber: 1,
    recommendedAgeDays: 274,
    ageRangeStartDays: 243,
    ageRangeEndDays: 365,
    doseDescription: "First dose",
    isBooster: false,
  },
  {
    id: "16",
    vaccineId: "5",
    doseNumber: 2,
    recommendedAgeDays: 547,
    ageRangeStartDays: 487,
    ageRangeEndDays: 730,
    doseDescription: "Second dose",
    isBooster: false,
  },
]

const mockVaccinationRecords: VaccinationRecord[] = [
  {
    id: "1",
    childId: "1",
    vaccineId: "1",
    scheduleId: "1",
    doseNumber: 1,
    vaccinationDate: "2022-03-16",
    status: "completed",
    siteOfInjection: "left arm",
    notes: "No immediate reactions observed",
  },
  {
    id: "2",
    childId: "1",
    vaccineId: "2",
    scheduleId: "2",
    doseNumber: 1,
    vaccinationDate: "2022-03-16",
    status: "completed",
    siteOfInjection: "right thigh",
  },
]

export function calculateChildAge(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth)
  const today = new Date()
  return Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
}

export function generateVaccineSchedule(child: Child): ScheduledVaccine[] {
  const childAgeDays = calculateChildAge(child.dateOfBirth)
  const childRecords = mockVaccinationRecords.filter((record) => record.childId === child.id)

  const scheduledVaccines: ScheduledVaccine[] = []

  for (const schedule of mockVaccineSchedules) {
    const vaccine = mockVaccines.find((v) => v.id === schedule.vaccineId)
    if (!vaccine || !vaccine.isActive) continue

    // Check if this dose has been completed
    const existingRecord = childRecords.find(
      (record) =>
        record.vaccineId === schedule.vaccineId &&
        record.doseNumber === schedule.doseNumber &&
        record.status === "completed",
    )

    // Calculate due date
    const birthDate = new Date(child.dateOfBirth)
    const dueDate = new Date(birthDate.getTime() + schedule.recommendedAgeDays * 24 * 60 * 60 * 1000)

    // Determine status
    let status: ScheduledVaccine["status"]
    const today = new Date()
    const daysSinceDue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))

    if (existingRecord) {
      status = "completed"
    } else if (childAgeDays < schedule.recommendedAgeDays - 7) {
      status = "upcoming"
    } else if (daysSinceDue > 30) {
      status = "overdue"
    } else {
      status = "due"
    }

    // Check if urgent (overdue by more than 30 days or due within 7 days)
    const isUrgent = (status === "overdue" && daysSinceDue > 30) || (status === "due" && Math.abs(daysSinceDue) <= 7)

    scheduledVaccines.push({
      vaccine,
      schedule,
      dueDate,
      status,
      vaccinationRecord: existingRecord,
      daysFromBirth: schedule.recommendedAgeDays,
      isUrgent,
    })
  }

  // Sort by recommended age
  return scheduledVaccines.sort((a, b) => a.schedule.recommendedAgeDays - b.schedule.recommendedAgeDays)
}

export function getUpcomingVaccines(child: Child, daysAhead = 30): ScheduledVaccine[] {
  const schedule = generateVaccineSchedule(child)
  const today = new Date()
  const futureDate = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000)

  return schedule.filter(
    (sv) => sv.status === "due" || sv.status === "overdue" || (sv.status === "upcoming" && sv.dueDate <= futureDate),
  )
}

export function getVaccinationStats(child: Child): {
  total: number
  completed: number
  due: number
  overdue: number
  upcoming: number
} {
  const schedule = generateVaccineSchedule(child)

  return {
    total: schedule.length,
    completed: schedule.filter((sv) => sv.status === "completed").length,
    due: schedule.filter((sv) => sv.status === "due").length,
    overdue: schedule.filter((sv) => sv.status === "overdue").length,
    upcoming: schedule.filter((sv) => sv.status === "upcoming").length,
  }
}

export async function recordVaccination(
  childId: string,
  vaccineId: string,
  scheduleId: string,
  vaccinationData: Partial<VaccinationRecord>,
): Promise<VaccinationRecord> {
  // Mock function - replace with database insert
  const newRecord: VaccinationRecord = {
    id: (mockVaccinationRecords.length + 1).toString(),
    childId,
    vaccineId,
    scheduleId,
    doseNumber: vaccinationData.doseNumber || 1,
    vaccinationDate: vaccinationData.vaccinationDate || new Date().toISOString().split("T")[0],
    status: "completed",
    ...vaccinationData,
  }

  mockVaccinationRecords.push(newRecord)
  return newRecord
}

export function formatAgeFromDays(days: number): string {
  if (days === 0) return "At birth"
  if (days < 7) return `${days} day${days > 1 ? "s" : ""}`
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""}`
  if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""}`

  const years = Math.floor(days / 365)
  const remainingMonths = Math.floor((days % 365) / 30)

  if (remainingMonths === 0) {
    return `${years} year${years > 1 ? "s" : ""}`
  }

  return `${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
}

export const calculateVaccineSchedule = generateVaccineSchedule

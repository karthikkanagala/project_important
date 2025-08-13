export interface Child {
  id: string
  parentId: string
  fullName: string
  dateOfBirth: string
  gender: "male" | "female" | "other"
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
  profilePictureUrl?: string
  birthWeight?: number // in kg
  birthHeight?: number // in cm
  allergies?: string
  medicalNotes?: string
  createdAt: string
  updatedAt: string
}

// Mock children data - replace with database queries later
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
]

export async function getChildrenByParentId(parentId: string): Promise<Child[]> {
  // Mock function - replace with database query
  return mockChildren.filter((child) => child.parentId === parentId)
}

export async function getChildById(childId: string): Promise<Child | null> {
  // Mock function - replace with database query
  return mockChildren.find((child) => child.id === childId) || null
}

export async function createChild(childData: Omit<Child, "id" | "createdAt" | "updatedAt">): Promise<Child> {
  // Mock function - replace with database insert
  const newChild: Child = {
    ...childData,
    id: (mockChildren.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockChildren.push(newChild)
  return newChild
}

export async function updateChild(childId: string, updates: Partial<Child>): Promise<Child | null> {
  // Mock function - replace with database update
  const childIndex = mockChildren.findIndex((child) => child.id === childId)

  if (childIndex === -1) {
    return null
  }

  mockChildren[childIndex] = {
    ...mockChildren[childIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  return mockChildren[childIndex]
}

export async function deleteChild(childId: string): Promise<boolean> {
  // Mock function - replace with database delete
  const childIndex = mockChildren.findIndex((child) => child.id === childId)

  if (childIndex === -1) {
    return false
  }

  mockChildren.splice(childIndex, 1)
  return true
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

export function calculateAge(dateOfBirth: string): { years: number; months: number; days: number } {
  const birth = new Date(dateOfBirth)
  const today = new Date()

  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()

  if (days < 0) {
    months--
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += lastMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  return { years, months, days }
}

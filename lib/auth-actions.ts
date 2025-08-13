"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User, UserRole } from "./auth"

// Mock user data - replace with database queries later
const mockUsers: User[] = [
  {
    id: "1",
    email: "parent@example.com",
    fullName: "John Doe",
    role: "parent",
    phone: "+91-9876543210",
    isVerified: true,
  },
  {
    id: "2",
    email: "doctor@example.com",
    fullName: "Dr. Sarah Smith",
    role: "doctor",
    phone: "+91-9876543211",
    licenseNumber: "MED12345",
    specialization: "Pediatrics",
    hospitalClinic: "City Children Hospital",
    isVerified: true,
  },
]

export async function signInAction(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  // Mock authentication - replace with real database query
  const user = mockUsers.find((u) => u.email === email)

  if (!user) {
    return { success: false, error: "Invalid email or password" }
  }

  // Mock password check (in real app, compare with hashed password)
  if (password !== "password123") {
    return { success: false, error: "Invalid email or password" }
  }

  // Set session cookie
  cookies().set("session", JSON.stringify({ userId: user.id, role: user.role }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return { success: true, user }
}

export async function signUpAction(userData: {
  email: string
  password: string
  fullName: string
  role: UserRole
  phone?: string
  licenseNumber?: string
  specialization?: string
  hospitalClinic?: string
}): Promise<{ success: boolean; user?: User; error?: string }> {
  // Check if user already exists
  const existingUser = mockUsers.find((u) => u.email === userData.email)
  if (existingUser) {
    return { success: false, error: "User with this email already exists" }
  }

  // Create new user (in real app, save to database)
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    email: userData.email,
    fullName: userData.fullName,
    role: userData.role,
    phone: userData.phone,
    licenseNumber: userData.licenseNumber,
    specialization: userData.specialization,
    hospitalClinic: userData.hospitalClinic,
    isVerified: userData.role === "parent", // Auto-verify parents, doctors need manual verification
  }

  mockUsers.push(newUser)

  // Set session cookie
  cookies().set("session", JSON.stringify({ userId: newUser.id, role: newUser.role }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return { success: true, user: newUser }
}

export async function signOutAction() {
  cookies().delete("session")
  redirect("/auth/login")
}

export async function getCurrentUser(): Promise<User | null> {
  const sessionCookie = cookies().get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    const user = mockUsers.find((u) => u.id === session.userId)
    return user || null
  } catch {
    return null
  }
}

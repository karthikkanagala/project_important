import { redirect } from "next/navigation"
import { signUpAction, signOutAction, getCurrentUser as getCurrentUserAction } from "./auth-actions"

export type UserRole = "parent" | "doctor"

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  phone?: string
  licenseNumber?: string
  specialization?: string
  hospitalClinic?: string
  isVerified: boolean
}

// Added wrapper functions for client compatibility
export async function signUp(userData: {
  email: string
  password: string
  fullName: string
  role: UserRole
  phone?: string
  licenseNumber?: string
  specialization?: string
  hospitalClinic?: string
}): Promise<{ success: boolean; user?: User; error?: string }> {
  return await signUpAction(userData)
}

export async function signOut() {
  return await signOutAction()
}

export async function getCurrentUser(): Promise<User | null> {
  return await getCurrentUserAction()
}

export async function requireAuth(allowedRoles?: UserRole[]) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    redirect("/unauthorized")
  }

  return user
}

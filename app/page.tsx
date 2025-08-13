import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

export default async function HomePage() {
  const user = await getCurrentUser()

  if (user) {
    // Redirect authenticated users to their dashboard
    if (user.role === "doctor") {
      redirect("/doctor/dashboard")
    } else {
      redirect("/parent/dashboard")
    }
  } else {
    // Redirect unauthenticated users to login
    redirect("/auth/login")
  }
}

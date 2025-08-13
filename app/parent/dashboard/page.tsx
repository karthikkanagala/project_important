"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChildProfileCard } from "@/components/children/child-profile-card"
import { ChildProfileForm } from "@/components/children/child-profile-form"
import { getChildrenByParentId, type Child } from "@/lib/children"
import { getCurrentUser, signOut } from "@/lib/auth"

export default function ParentDashboard() {
  const [children, setChildren] = useState<Child[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingChild, setEditingChild] = useState<Child | undefined>()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          setCurrentUser(user)
          const childrenData = await getChildrenByParentId(user.id)
          setChildren(childrenData)
        }
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleAddChild = () => {
    setEditingChild(undefined)
    setIsFormOpen(true)
  }

  const handleEditChild = (child: Child) => {
    setEditingChild(child)
    setIsFormOpen(true)
  }

  const handleFormSuccess = (child: Child) => {
    if (editingChild) {
      // Update existing child
      setChildren((prev) => prev.map((c) => (c.id === child.id ? child : c)))
    } else {
      // Add new child
      setChildren((prev) => [...prev, child])
    }
    setIsFormOpen(false)
    setEditingChild(undefined)
  }

  const handleViewDetails = (child: Child) => {
    router.push(`/parent/child/${child.id}`)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">VaxTracker</h1>
              <p className="text-sm text-gray-600">Welcome back, {currentUser?.fullName}</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Added vaccine information link */}
              <Button variant="outline" onClick={() => router.push("/vaccines")}>
                <BookOpen className="h-4 w-4 mr-2" />
                Vaccine Info
              </Button>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">My Children</h2>
              <p className="text-gray-600 mt-1">Manage your children's vaccination records</p>
            </div>
            <Button onClick={handleAddChild} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Child</span>
            </Button>
          </div>

          {children.length === 0 ? (
            <Card className="text-center py-12">
              <CardHeader>
                <CardTitle>No Children Added Yet</CardTitle>
                <CardDescription>Get started by adding your first child's profile</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleAddChild} className="flex items-center space-x-2 mx-auto">
                  <Plus className="h-4 w-4" />
                  <span>Add Your First Child</span>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <ChildProfileCard
                  key={child.id}
                  child={child}
                  onEdit={handleEditChild}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Child Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingChild ? "Edit Child Profile" : "Add New Child"}</DialogTitle>
          </DialogHeader>
          <ChildProfileForm
            parentId={currentUser?.id || ""}
            child={editingChild}
            onSuccess={handleFormSuccess}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

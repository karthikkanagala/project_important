"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createChild, updateChild, type Child } from "@/lib/children"

interface ChildProfileFormProps {
  parentId: string
  child?: Child
  onSuccess: (child: Child) => void
  onCancel: () => void
}

export function ChildProfileForm({ parentId, child, onSuccess, onCancel }: ChildProfileFormProps) {
  const [formData, setFormData] = useState({
    fullName: child?.fullName || "",
    dateOfBirth: child?.dateOfBirth || "",
    gender: child?.gender || ("" as Child["gender"]),
    bloodGroup: child?.bloodGroup || ("" as Child["bloodGroup"]),
    profilePictureUrl: child?.profilePictureUrl || "",
    birthWeight: child?.birthWeight?.toString() || "",
    birthHeight: child?.birthHeight?.toString() || "",
    allergies: child?.allergies || "",
    medicalNotes: child?.medicalNotes || "",
  })

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const childData = {
        parentId,
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup || undefined,
        profilePictureUrl: formData.profilePictureUrl || undefined,
        birthWeight: formData.birthWeight ? Number.parseFloat(formData.birthWeight) : undefined,
        birthHeight: formData.birthHeight ? Number.parseFloat(formData.birthHeight) : undefined,
        allergies: formData.allergies || undefined,
        medicalNotes: formData.medicalNotes || undefined,
      }

      let result: Child
      if (child) {
        // Update existing child
        const updated = await updateChild(child.id, childData)
        if (!updated) throw new Error("Failed to update child")
        result = updated
      } else {
        // Create new child
        result = await createChild(childData)
      }

      onSuccess(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateProfilePicture = () => {
    const query = `${formData.gender || "child"} ${formData.fullName || "baby"}`
    const url = `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(query)}`
    updateFormData("profilePictureUrl", url)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{child ? "Edit Child Profile" : "Add New Child"}</CardTitle>
        <CardDescription>
          {child ? "Update your child's information" : "Enter your child's details to create their profile"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.profilePictureUrl || "/placeholder.svg"} alt={formData.fullName} />
              <AvatarFallback className="text-lg">
                {formData.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label htmlFor="profilePictureUrl">Profile Picture URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="profilePictureUrl"
                  value={formData.profilePictureUrl}
                  onChange={(e) => updateFormData("profilePictureUrl", e.target.value)}
                  placeholder="Enter image URL or generate one"
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={generateProfilePicture}>
                  Generate
                </Button>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                placeholder="Enter child's full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select value={formData.bloodGroup} onValueChange={(value) => updateFormData("bloodGroup", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Birth Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthWeight">Birth Weight (kg)</Label>
              <Input
                id="birthWeight"
                type="number"
                step="0.1"
                value={formData.birthWeight}
                onChange={(e) => updateFormData("birthWeight", e.target.value)}
                placeholder="e.g., 3.2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthHeight">Birth Height (cm)</Label>
              <Input
                id="birthHeight"
                type="number"
                step="0.1"
                value={formData.birthHeight}
                onChange={(e) => updateFormData("birthHeight", e.target.value)}
                placeholder="e.g., 50"
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="allergies">Known Allergies</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => updateFormData("allergies", e.target.value)}
                placeholder="List any known allergies or 'None known'"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalNotes">Medical Notes</Label>
              <Textarea
                id="medicalNotes"
                value={formData.medicalNotes}
                onChange={(e) => updateFormData("medicalNotes", e.target.value)}
                placeholder="Any additional medical information or notes"
                rows={3}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Saving..." : child ? "Update Profile" : "Create Profile"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Droplet, Edit, Heart, User } from "lucide-react"
import { calculateAge, type Child } from "@/lib/children"

interface ChildProfileCardProps {
  child: Child
  onEdit: (child: Child) => void
  onViewDetails: (child: Child) => void
}

export function ChildProfileCard({ child, onEdit, onViewDetails }: ChildProfileCardProps) {
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={child.profilePictureUrl || "/placeholder.svg"} alt={child.fullName} />
            <AvatarFallback className="text-lg">
              {child.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{child.fullName}</h3>
            <p className="text-muted-foreground">{formatAge()} old</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(child)}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
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
          {child.birthWeight && (
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span>{child.birthWeight} kg</span>
            </div>
          )}
        </div>

        {child.allergies && child.allergies !== "None known" && (
          <div>
            <Badge variant="secondary" className="text-xs">
              Allergies: {child.allergies}
            </Badge>
          </div>
        )}

        <Button onClick={() => onViewDetails(child)} className="w-full" variant="outline">
          View Vaccination Schedule
        </Button>
      </CardContent>
    </Card>
  )
}

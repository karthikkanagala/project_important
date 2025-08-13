"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Clock, Users, ChevronRight } from "lucide-react"
import type { VaccineInfo } from "@/lib/vaccine-info"

interface VaccineInfoCardProps {
  vaccine: VaccineInfo
  onViewDetails: (vaccine: VaccineInfo) => void
}

export function VaccineInfoCard({ vaccine, onViewDetails }: VaccineInfoCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{vaccine.shortName}</CardTitle>
            <CardDescription className="mt-1">{vaccine.name}</CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2">
            {vaccine.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{vaccine.description}</p>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span>
              <strong>Age Group:</strong> {vaccine.ageGroup}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span>
              <strong>Doses:</strong> {vaccine.administrationInfo.doses}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <span>
              <strong>Schedule:</strong> {vaccine.administrationInfo.schedule}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm font-medium mb-2">Why it's important:</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{vaccine.importanceInfo}</p>
        </div>

        <Button onClick={() => onViewDetails(vaccine)} className="w-full" variant="outline">
          Learn More
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

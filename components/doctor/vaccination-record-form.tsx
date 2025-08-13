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
import { Badge } from "@/components/ui/badge"
import { Calendar, Syringe } from "lucide-react"
import { generateVaccineSchedule, type ScheduledVaccine } from "@/lib/vaccine-schedule"
import { recordVaccinationByDoctor, type VaccinationRecordInput } from "@/lib/doctor"
import type { DoctorPatient } from "@/lib/doctor"

interface VaccinationRecordFormProps {
  patient: DoctorPatient
  doctorId: string
  onSuccess: () => void
  onCancel: () => void
}

export function VaccinationRecordForm({ patient, doctorId, onSuccess, onCancel }: VaccinationRecordFormProps) {
  const [selectedVaccine, setSelectedVaccine] = useState<ScheduledVaccine | null>(null)
  const [formData, setFormData] = useState({
    vaccinationDate: new Date().toISOString().split("T")[0],
    batchNumber: "",
    manufacturer: "",
    siteOfInjection: "",
    notes: "",
    sideEffectsReported: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const schedule = generateVaccineSchedule(patient)
  const availableVaccines = schedule.filter((sv) => sv.status !== "completed")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedVaccine) {
      setError("Please select a vaccine to record")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const recordData: VaccinationRecordInput = {
        childId: patient.id,
        vaccineId: selectedVaccine.vaccine.id,
        scheduleId: selectedVaccine.schedule.id,
        doseNumber: selectedVaccine.schedule.doseNumber,
        vaccinationDate: formData.vaccinationDate,
        batchNumber: formData.batchNumber || undefined,
        manufacturer: formData.manufacturer || undefined,
        siteOfInjection: formData.siteOfInjection || undefined,
        notes: formData.notes || undefined,
        sideEffectsReported: formData.sideEffectsReported || undefined,
      }

      await recordVaccinationByDoctor(doctorId, recordData)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to record vaccination")
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getStatusColor = (status: ScheduledVaccine["status"]) => {
    switch (status) {
      case "due":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Syringe className="h-5 w-5" />
          <span>Record Vaccination</span>
        </CardTitle>
        <CardDescription>Recording vaccination for {patient.fullName}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Patient Info */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-2">Patient Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span> {patient.fullName}
              </div>
              <div>
                <span className="text-muted-foreground">DOB:</span> {new Date(patient.dateOfBirth).toLocaleDateString()}
              </div>
              <div>
                <span className="text-muted-foreground">Gender:</span> {patient.gender}
              </div>
              {patient.bloodGroup && (
                <div>
                  <span className="text-muted-foreground">Blood Group:</span> {patient.bloodGroup}
                </div>
              )}
            </div>
            {patient.allergies && patient.allergies !== "None known" && (
              <div className="mt-2">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                  Allergies: {patient.allergies}
                </Badge>
              </div>
            )}
          </div>

          {/* Vaccine Selection */}
          <div className="space-y-4">
            <Label>Select Vaccine to Record</Label>
            <div className="grid gap-3">
              {availableVaccines.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No vaccines are currently due for this patient.
                </p>
              ) : (
                availableVaccines.map((sv) => (
                  <div
                    key={`${sv.vaccine.id}-${sv.schedule.doseNumber}`}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedVaccine?.vaccine.id === sv.vaccine.id &&
                      selectedVaccine?.schedule.doseNumber === sv.schedule.doseNumber
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedVaccine(sv)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">
                          {sv.vaccine.shortName} - {sv.schedule.doseDescription}
                        </h4>
                        <p className="text-sm text-muted-foreground">{sv.vaccine.name}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getStatusColor(sv.status)}>
                          {sv.status.charAt(0).toUpperCase() + sv.status.slice(1)}
                        </Badge>
                        <div className="text-sm text-muted-foreground">Due: {sv.dueDate.toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedVaccine && (
            <>
              {/* Vaccination Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vaccinationDate">Vaccination Date *</Label>
                  <Input
                    id="vaccinationDate"
                    type="date"
                    value={formData.vaccinationDate}
                    onChange={(e) => updateFormData("vaccinationDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteOfInjection">Site of Injection</Label>
                  <Select
                    value={formData.siteOfInjection}
                    onValueChange={(value) => updateFormData("siteOfInjection", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select injection site" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left-arm">Left Arm</SelectItem>
                      <SelectItem value="right-arm">Right Arm</SelectItem>
                      <SelectItem value="left-thigh">Left Thigh</SelectItem>
                      <SelectItem value="right-thigh">Right Thigh</SelectItem>
                      <SelectItem value="oral">Oral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batchNumber">Batch Number</Label>
                  <Input
                    id="batchNumber"
                    value={formData.batchNumber}
                    onChange={(e) => updateFormData("batchNumber", e.target.value)}
                    placeholder="Enter batch number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    value={formData.manufacturer}
                    onChange={(e) => updateFormData("manufacturer", e.target.value)}
                    placeholder="Enter manufacturer name"
                  />
                </div>
              </div>

              {/* Notes and Side Effects */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => updateFormData("notes", e.target.value)}
                    placeholder="Any additional notes about the vaccination"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sideEffectsReported">Side Effects Reported</Label>
                  <Textarea
                    id="sideEffectsReported"
                    value={formData.sideEffectsReported}
                    onChange={(e) => updateFormData("sideEffectsReported", e.target.value)}
                    placeholder="Any side effects observed or reported"
                    rows={2}
                  />
                </div>
              </div>

              {/* Vaccine Information */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Vaccine Information</span>
                </h4>
                <p className="text-sm text-muted-foreground mb-2">{selectedVaccine.vaccine.importanceInfo}</p>
                <div className="text-xs text-muted-foreground">
                  <p>
                    <strong>Route:</strong> {selectedVaccine.vaccine.routeOfAdministration}
                  </p>
                  <p>
                    <strong>Type:</strong> {selectedVaccine.vaccine.vaccineType}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Form Actions */}
          <div className="flex space-x-4 pt-4">
            <Button type="submit" disabled={isLoading || !selectedVaccine} className="flex-1">
              {isLoading ? "Recording..." : "Record Vaccination"}
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

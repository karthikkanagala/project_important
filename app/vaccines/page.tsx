"use client"

import { useState } from "react"
import { Search, BookOpen, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VaccineInfoCard } from "@/components/vaccines/vaccine-info-card"
import { VaccineDetailView } from "@/components/vaccines/vaccine-detail-view"
import { FAQSection } from "@/components/vaccines/faq-section"
import { searchVaccines, vaccineInfoDatabase, type VaccineInfo } from "@/lib/vaccine-info"

export default function VaccinesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineInfo | null>(null)
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false)

  const vaccines = searchQuery ? searchVaccines(searchQuery) : vaccineInfoDatabase

  const handleViewDetails = (vaccine: VaccineInfo) => {
    setSelectedVaccine(vaccine)
    setIsDetailViewOpen(true)
  }

  const handleCloseDetails = () => {
    setIsDetailViewOpen(false)
    setSelectedVaccine(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">VaxTracker - Vaccine Information</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Learn About Vaccines</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get comprehensive, evidence-based information about vaccines to make informed decisions for your child's
            health. All information is reviewed by medical professionals.
          </p>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="vaccines" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="vaccines" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Vaccine Library</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vaccines" className="space-y-8">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>Search Vaccines</CardTitle>
                <CardDescription>Find detailed information about specific vaccines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by vaccine name or disease..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vaccines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaccines.map((vaccine) => (
                <VaccineInfoCard key={vaccine.id} vaccine={vaccine} onViewDetails={handleViewDetails} />
              ))}
            </div>

            {vaccines.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">
                    No vaccines found matching your search. Try different keywords.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="faq">
            <FAQSection />
          </TabsContent>
        </Tabs>
      </main>

      {/* Vaccine Detail Dialog */}
      <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Vaccine Information</DialogTitle>
          </DialogHeader>
          {selectedVaccine && <VaccineDetailView vaccine={selectedVaccine} onClose={handleCloseDetails} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

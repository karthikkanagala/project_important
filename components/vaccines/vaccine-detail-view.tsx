"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Shield, AlertTriangle, Info, BookOpen, ExternalLink, CheckCircle, XCircle } from "lucide-react"
import type { VaccineInfo } from "@/lib/vaccine-info"

interface VaccineDetailViewProps {
  vaccine: VaccineInfo
  onClose: () => void
}

export function VaccineDetailView({ vaccine, onClose }: VaccineDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{vaccine.name}</h1>
          <p className="text-xl text-muted-foreground mt-1">({vaccine.shortName})</p>
          <div className="flex items-center space-x-2 mt-3">
            <Badge variant="secondary">{vaccine.category}</Badge>
            <Badge variant="outline">{vaccine.ageGroup}</Badge>
          </div>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      {/* Quick Facts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>Quick Facts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Administration</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong>Route:</strong> {vaccine.administrationInfo.route}
                </p>
                <p>
                  <strong>Doses:</strong> {vaccine.administrationInfo.doses}
                </p>
                <p>
                  <strong>Schedule:</strong> {vaccine.administrationInfo.schedule}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Effectiveness</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong>Efficacy:</strong> {vaccine.efficacy}
                </p>
                <p>
                  <strong>Duration:</strong> {vaccine.duration}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Storage</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>{vaccine.administrationInfo.storage}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="myths">Myths & Facts</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Why This Vaccine is Important</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{vaccine.importanceInfo}</p>

              <Separator className="my-4" />

              <h4 className="font-medium mb-2">How It Works</h4>
              <p className="text-muted-foreground">{vaccine.howItWorks}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Active Ingredients</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {vaccine.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Manufacturers</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {vaccine.manufacturerInfo.map((manufacturer, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-blue-600" />
                        <span>{manufacturer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="side-effects" className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Most side effects are mild and go away on their own. Serious side effects are very rare.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Common (Mild)</span>
                </CardTitle>
                <CardDescription>These are normal and expected</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vaccine.sideEffects.common.map((effect, index) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Rare</span>
                </CardTitle>
                <CardDescription>Uncommon but possible</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vaccine.sideEffects.rare.map((effect, index) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center space-x-2">
                  <XCircle className="h-5 w-5" />
                  <span>Serious</span>
                </CardTitle>
                <CardDescription>Very rare but important to know</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vaccine.sideEffects.serious.map((effect, index) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center space-x-2">
                  <XCircle className="h-5 w-5" />
                  <span>Contraindications</span>
                </CardTitle>
                <CardDescription>When NOT to give this vaccine</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vaccine.contraindications.map((item, index) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Precautions</span>
                </CardTitle>
                <CardDescription>Special considerations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vaccine.precautions.map((item, index) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Clinical Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{vaccine.clinicalTrials}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="myths" className="space-y-6">
          <Alert>
            <BookOpen className="h-4 w-4" />
            <AlertDescription>
              Here are common myths about this vaccine and the scientific facts that counter them.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {vaccine.myths.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-red-600 mb-2 flex items-center space-x-2">
                        <XCircle className="h-4 w-4" />
                        <span>Myth:</span>
                      </h4>
                      <p className="text-sm text-muted-foreground pl-6">{item.myth}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-green-600 mb-2 flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Fact:</span>
                      </h4>
                      <p className="text-sm text-muted-foreground pl-6">{item.fact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Additional Resources</span>
              </CardTitle>
              <CardDescription>Learn more from trusted sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vaccine.resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded">
                        {resource.type === "article" && <BookOpen className="h-4 w-4 text-blue-600" />}
                        {resource.type === "video" && <ExternalLink className="h-4 w-4 text-blue-600" />}
                        {resource.type === "pdf" && <BookOpen className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{resource.type}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

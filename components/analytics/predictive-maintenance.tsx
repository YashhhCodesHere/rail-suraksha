"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingUp, Wrench, MapPin, Calendar, Brain } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface PredictiveData {
  zone: string
  highRiskFittings: number
  recommendedActions: string[]
  riskTrend: Array<{ month: string; risk: number; predicted: number }>
  criticalSections: Array<{ section: string; track: string; riskScore: number; fittings: number }>
}

const predictiveData: Record<string, PredictiveData> = {
  "Northern Railway": {
    zone: "Northern Railway",
    highRiskFittings: 45,
    recommendedActions: [
      "Schedule inspection for Section B, Track 2",
      "Replace 12 high-wear rail joints in Section A",
      "Conduct preventive maintenance on Track 3 switches",
    ],
    riskTrend: [
      { month: "Jul", risk: 3.2, predicted: 3.4 },
      { month: "Aug", risk: 3.5, predicted: 3.7 },
      { month: "Sep", risk: 3.8, predicted: 4.1 },
      { month: "Oct", risk: 4.2, predicted: 4.5 },
      { month: "Nov", risk: 4.1, predicted: 4.3 },
      { month: "Dec", risk: 3.9, predicted: 4.0 },
    ],
    criticalSections: [
      { section: "Section B", track: "Track 2", riskScore: 8.7, fittings: 23 },
      { section: "Section A", track: "Track 1", riskScore: 7.9, fittings: 15 },
      { section: "Section C", track: "Track 3", riskScore: 7.2, fittings: 7 },
    ],
  },
  "Western Railway": {
    zone: "Western Railway",
    highRiskFittings: 32,
    recommendedActions: [
      "Monitor Section D for potential failures",
      "Schedule maintenance for Track 1 rail pads",
      "Inspect fish plates in high-traffic areas",
    ],
    riskTrend: [
      { month: "Jul", risk: 2.8, predicted: 3.0 },
      { month: "Aug", risk: 3.1, predicted: 3.3 },
      { month: "Sep", risk: 3.4, predicted: 3.6 },
      { month: "Oct", risk: 3.8, predicted: 4.0 },
      { month: "Nov", risk: 3.6, predicted: 3.8 },
      { month: "Dec", risk: 3.3, predicted: 3.5 },
    ],
    criticalSections: [
      { section: "Section D", track: "Track 1", riskScore: 7.5, fittings: 18 },
      { section: "Section E", track: "Track 2", riskScore: 6.8, fittings: 10 },
      { section: "Section F", track: "Track 1", riskScore: 6.2, fittings: 4 },
    ],
  },
}

const zones = ["Northern Railway", "Western Railway", "Eastern Railway", "Southern Railway", "Central Railway"]

export function PredictiveMaintenanceConsole() {
  const [selectedZone, setSelectedZone] = useState("Northern Railway")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const currentData = predictiveData[selectedZone] || predictiveData["Northern Railway"]

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
  }

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary animate-pulse" />
          <span>Predictive Maintenance Console</span>
        </CardTitle>
        <CardDescription>AI-powered predictive analytics for proactive maintenance scheduling</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Zone Selection */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger>
                <SelectValue placeholder="Select railway zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAnalyze} disabled={isAnalyzing} className="animate-pulse-glow">
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Run AI Analysis
              </>
            )}
          </Button>
        </div>

        {/* Key Predictions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High-Risk Fittings</p>
                  <p className="text-2xl font-bold text-red-500">{currentData.highRiskFittings}</p>
                  <p className="text-xs text-muted-foreground">Next 90 days</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Maintenance Actions</p>
                  <p className="text-2xl font-bold text-yellow-500">{currentData.recommendedActions.length}</p>
                  <p className="text-xs text-muted-foreground">Recommended</p>
                </div>
                <Wrench className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Risk Trend</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {currentData.riskTrend[currentData.riskTrend.length - 1]?.risk.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend Analysis</CardTitle>
            <CardDescription>Historical vs predicted failure risk over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData.riskTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.02 240)" />
                <XAxis dataKey="month" stroke="oklch(0.7 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0 0)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.12 0.02 240)",
                    border: "1px solid oklch(0.25 0.02 240)",
                    borderRadius: "8px",
                    color: "oklch(0.98 0 0)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stackId="1"
                  stroke="oklch(0.7 0.25 25)"
                  fill="oklch(0.7 0.25 25 / 0.3)"
                  name="Actual Risk %"
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stackId="2"
                  stroke="oklch(0.6 0.25 15)"
                  fill="oklch(0.6 0.25 15 / 0.2)"
                  strokeDasharray="5 5"
                  name="Predicted Risk %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recommended Actions */}
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Prioritized maintenance actions based on predictive analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentData.recommendedActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg border-l-4 border-primary"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{action}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Priority: {index === 0 ? "High" : index === 1 ? "Medium" : "Low"}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{selectedZone}</span>
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Schedule
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Critical Sections */}
        <Card>
          <CardHeader>
            <CardTitle>Critical Sections Analysis</CardTitle>
            <CardDescription>Sections requiring immediate attention based on risk scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentData.criticalSections.map((section, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {section.section}, {section.track}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {section.fittings} fittings
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">Risk Score</p>
                      <p className="text-lg font-bold text-red-500">{section.riskScore}/10</p>
                    </div>
                    <Progress value={section.riskScore * 10} className="w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

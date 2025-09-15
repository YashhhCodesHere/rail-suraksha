"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Award, AlertTriangle, Clock, CheckCircle } from "lucide-react"

interface VendorMetrics {
  name: string
  grade: "A" | "B" | "C" | "D" | "F"
  overallScore: number
  defectRate: number
  warrantyClaimsRate: number
  onTimeDelivery: number
  qualityScore: number
  totalFittings: number
  activeContracts: number
  lastDelivery: string
  trend: "up" | "down" | "stable"
  strengths: string[]
  concerns: string[]
}

const vendorMetrics: VendorMetrics[] = [
  {
    name: "Bharat Heavy Electricals Ltd",
    grade: "A",
    overallScore: 96.8,
    defectRate: 0.8,
    warrantyClaimsRate: 1.2,
    onTimeDelivery: 98.5,
    qualityScore: 97.2,
    totalFittings: 450000,
    activeContracts: 12,
    lastDelivery: "2024-12-08",
    trend: "up",
    strengths: ["Excellent quality control", "Consistent delivery", "Low defect rates"],
    concerns: ["Higher pricing", "Limited capacity for rush orders"],
  },
  {
    name: "Tata Steel Limited",
    grade: "A",
    overallScore: 94.2,
    defectRate: 1.1,
    warrantyClaimsRate: 1.8,
    onTimeDelivery: 96.8,
    qualityScore: 95.5,
    totalFittings: 520000,
    activeContracts: 15,
    lastDelivery: "2024-12-10",
    trend: "stable",
    strengths: ["Large production capacity", "Strong R&D", "Good customer support"],
    concerns: ["Occasional delivery delays", "Quality variations in some batches"],
  },
  {
    name: "JSW Steel Limited",
    grade: "B",
    overallScore: 91.7,
    defectRate: 1.9,
    warrantyClaimsRate: 2.4,
    onTimeDelivery: 94.2,
    qualityScore: 92.8,
    totalFittings: 380000,
    activeContracts: 10,
    lastDelivery: "2024-12-09",
    trend: "up",
    strengths: ["Competitive pricing", "Flexible production", "Good technical support"],
    concerns: ["Higher defect rates", "Inconsistent quality in complex items"],
  },
  {
    name: "SAIL Bhilai Steel Plant",
    grade: "B",
    overallScore: 89.3,
    defectRate: 2.3,
    warrantyClaimsRate: 3.1,
    onTimeDelivery: 91.5,
    qualityScore: 90.2,
    totalFittings: 290000,
    activeContracts: 8,
    lastDelivery: "2024-12-07",
    trend: "down",
    strengths: ["Government backing", "Established processes", "Cost-effective"],
    concerns: ["Aging infrastructure", "Slower innovation", "Quality control issues"],
  },
  {
    name: "Jindal Steel & Power",
    grade: "C",
    overallScore: 87.1,
    defectRate: 3.2,
    warrantyClaimsRate: 4.1,
    onTimeDelivery: 88.7,
    qualityScore: 87.9,
    totalFittings: 210000,
    activeContracts: 6,
    lastDelivery: "2024-12-05",
    trend: "down",
    strengths: ["Competitive pricing", "Quick response", "Local presence"],
    concerns: ["Higher defect rates", "Delivery delays", "Quality inconsistencies"],
  },
]

function getGradeColor(grade: string) {
  switch (grade) {
    case "A":
      return "text-green-500 bg-green-500/10 border-green-500"
    case "B":
      return "text-blue-500 bg-blue-500/10 border-blue-500"
    case "C":
      return "text-yellow-500 bg-yellow-500/10 border-yellow-500"
    case "D":
      return "text-orange-500 bg-orange-500/10 border-orange-500"
    case "F":
      return "text-red-500 bg-red-500/10 border-red-500"
    default:
      return "text-gray-500 bg-gray-500/10 border-gray-500"
  }
}

function getTrendIcon(trend: string) {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-500" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-500" />
    default:
      return <div className="h-4 w-4 bg-yellow-500 rounded-full" />
  }
}

export function VendorReportCards() {
  return (
    <div className="space-y-6">
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Vendor Report Cards</span>
          </CardTitle>
          <CardDescription>
            Comprehensive performance evaluation based on quality, delivery, and reliability metrics
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vendorMetrics.map((vendor, index) => (
          <Card
            key={vendor.name}
            className="animate-slide-in-right hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{vendor.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-2 mt-1">
                    <span>{vendor.totalFittings.toLocaleString()} fittings supplied</span>
                    <span>•</span>
                    <span>{vendor.activeContracts} active contracts</span>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(vendor.trend)}
                  <Badge className={`text-2xl font-bold px-3 py-1 ${getGradeColor(vendor.grade)}`}>
                    {vendor.grade}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Score */}
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{vendor.overallScore}%</div>
                <p className="text-sm text-muted-foreground">Overall Performance Score</p>
                <Progress value={vendor.overallScore} className="mt-2" />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Defect Rate</span>
                    <span className="text-sm font-medium">{vendor.defectRate}%</span>
                  </div>
                  <Progress value={100 - vendor.defectRate * 10} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                    <span className="text-sm font-medium">{vendor.onTimeDelivery}%</span>
                  </div>
                  <Progress value={vendor.onTimeDelivery} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Quality Score</span>
                    <span className="text-sm font-medium">{vendor.qualityScore}%</span>
                  </div>
                  <Progress value={vendor.qualityScore} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Warranty Claims</span>
                    <span className="text-sm font-medium">{vendor.warrantyClaimsRate}%</span>
                  </div>
                  <Progress value={100 - vendor.warrantyClaimsRate * 10} className="h-2" />
                </div>
              </div>

              {/* Strengths */}
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Strengths</span>
                </h4>
                <div className="space-y-1">
                  {vendor.strengths.map((strength, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground flex items-center space-x-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concerns */}
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center space-x-1">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Areas for Improvement</span>
                </h4>
                <div className="space-y-1">
                  {vendor.concerns.map((concern, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground flex items-center space-x-2">
                      <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                      <span>{concern}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Delivery */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Last delivery: {new Date(vendor.lastDelivery).toLocaleDateString()}</span>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

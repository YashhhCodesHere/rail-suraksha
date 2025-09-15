"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Wrench, 
  FileText, 
  User, 
  Calendar,
  Activity,
  Target,
  TrendingDown,
  AlertCircle,
  CheckCircle
} from "lucide-react"

interface Alert {
  id: string
  type: "maintenance" | "warranty" | "quality" | "inspection"
  title: string
  message: string
  severity: "high" | "medium" | "low"
  time: string
  location?: string
  actionRequired: boolean
}

interface AlertDetailsModalProps {
  alert: Alert | null
  isOpen: boolean
  onClose: () => void
}

export function AlertDetailsModal({ alert, isOpen, onClose }: AlertDetailsModalProps) {
  if (!alert) return null

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "maintenance":
        return <Wrench className="h-6 w-6 text-blue-500" />
      case "warranty":
        return <FileText className="h-6 w-6 text-yellow-500" />
      case "quality":
        return <AlertTriangle className="h-6 w-6 text-red-500" />
      case "inspection":
        return <Clock className="h-6 w-6 text-orange-500" />
      default:
        return <AlertTriangle className="h-6 w-6 text-red-500" />
    }
  }

  const getSeverityDetails = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return {
          color: "text-red-500",
          bgColor: "bg-red-50 dark:bg-red-950/20",
          borderColor: "border-red-200 dark:border-red-800",
          description: "Immediate action required - potential safety risk"
        }
      case "medium":
        return {
          color: "text-yellow-500",
          bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          description: "Action required within 24 hours"
        }
      case "low":
        return {
          color: "text-blue-500",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          description: "Monitor and schedule maintenance"
        }
    }
  }

  // Generate detailed information based on alert type
  const getDetailedInfo = () => {
    switch (alert.id) {
      case "ALERT-001":
        return {
          batchDetails: {
            batchNumber: "#23-114-254/89",
            vendor: "Tata Steel Limited",
            manufactureDate: "2023-11-15",
            supplyDate: "2023-12-01",
            itemType: "Rail Bolts",
            quantity: 12,
            currentAge: "10 months"
          },
          riskFactors: [
            "Approaching 12-month warranty expiration",
            "Located in high-traffic section",
            "Weather exposure exceeding normal parameters",
            "Previous inspection showed minor wear"
          ],
          affectedAssets: [
            "Northern Zone, Section B, Track 1 - 4 bolts",
            "Northern Zone, Section B, Track 2 - 5 bolts", 
            "Northern Zone, Section B, Track 3 - 3 bolts"
          ],
          recommendations: [
            "Schedule immediate visual inspection",
            "Prepare replacement inventory",
            "Plan maintenance window during low-traffic hours",
            "Notify track maintenance team"
          ]
        }
      case "ALERT-002":
        return {
          warrantyDetails: {
            totalFittings: 847,
            expiringIn7Days: 23,
            expiringIn14Days: 89,
            expiringIn30Days: 735,
            averageAge: "22 months"
          },
          zoneBreakdown: [
            "Northern Zone: 234 fittings",
            "Western Zone: 189 fittings",
            "Eastern Zone: 201 fittings",
            "Southern Zone: 156 fittings",
            "Central Zone: 67 fittings"
          ],
          costImplications: [
            "Estimated replacement cost: ₹12.3 Lakhs",
            "Labor cost: ₹3.2 Lakhs",
            "Potential delay cost if not addressed: ₹45 Lakhs"
          ]
        }
      case "ALERT-003":
        return {
          inspectionDetails: {
            lastInspection: "2024-08-15",
            dueDate: "2024-09-15",
            overdueDays: 15,
            inspectionType: "Quality Assurance",
            inspector: "Railway Inspector Team A"
          },
          sectionDetails: {
            trackSection: "Section B, Track 2",
            length: "2.5 km",
            fittingCount: 156,
            lastMaintenance: "2024-07-20",
            trafficLevel: "High"
          },
          complianceIssues: [
            "Overdue mandatory quarterly inspection",
            "Safety certification pending",
            "Regulatory compliance at risk"
          ]
        }
      default:
        return {
          generalInfo: {
            status: "Under Investigation",
            priority: "Active Monitoring",
            estimatedResolution: "2-4 hours"
          }
        }
    }
  }

  const detailedInfo = getDetailedInfo()
  const severityInfo = getSeverityDetails(alert.severity)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center space-x-3">
            {getAlertIcon(alert.type)}
            <div>
              <span className="text-lg">{alert.title}</span>
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  variant={alert.severity === "high" ? "destructive" : "secondary"}
                  className={severityInfo.color}
                >
                  {alert.severity.toUpperCase()} PRIORITY
                </Badge>
                {alert.actionRequired && (
                  <Badge variant="outline" className="animate-pulse">
                    Action Required
                  </Badge>
                )}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <ScrollArea className="flex-1 max-h-[60vh] p-6">
          <div className="space-y-6">
            {/* Alert Overview */}
            <div className={`p-4 rounded-lg border ${severityInfo.borderColor} ${severityInfo.bgColor}`}>
              <h3 className="font-semibold mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Alert Overview
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
              <p className={`text-xs ${severityInfo.color} font-medium`}>{severityInfo.description}</p>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Alert Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alert ID:</span>
                    <span className="font-mono">{alert.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="capitalize">{alert.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Generated:</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.time}
                    </span>
                  </div>
                  {alert.location && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {alert.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Status & Progress
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned:</span>
                    <span>Maintenance Team Alpha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Resolution:</span>
                    <span>2-4 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information based on alert type */}
            {'batchDetails' in detailedInfo && (
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Batch Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Batch Number:</span>
                      <span className="font-mono">{detailedInfo.batchDetails.batchNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vendor:</span>
                      <span>{detailedInfo.batchDetails.vendor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Item Type:</span>
                      <span>{detailedInfo.batchDetails.itemType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span>{detailedInfo.batchDetails.quantity} units</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Manufactured:</span>
                      <span>{detailedInfo.batchDetails.manufactureDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Supplied:</span>
                      <span>{detailedInfo.batchDetails.supplyDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Age:</span>
                      <span>{detailedInfo.batchDetails.currentAge}</span>
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center text-red-600">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Risk Factors
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {detailedInfo.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="h-3 w-3 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Affected Assets */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Affected Assets
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {detailedInfo.affectedAssets.map((asset, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                        {asset}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center text-green-600">
                    <Target className="h-4 w-4 mr-2" />
                    Recommended Actions
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {detailedInfo.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Warranty Details */}
            {'warrantyDetails' in detailedInfo && (
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Warranty Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600">{detailedInfo.warrantyDetails.expiringIn7Days}</div>
                    <div className="text-sm text-muted-foreground">Expiring in 7 days</div>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">{detailedInfo.warrantyDetails.expiringIn14Days}</div>
                    <div className="text-sm text-muted-foreground">Expiring in 14 days</div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{detailedInfo.warrantyDetails.expiringIn30Days}</div>
                    <div className="text-sm text-muted-foreground">Expiring in 30 days</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Zone Breakdown</h4>
                  <ul className="space-y-1 text-sm">
                    {detailedInfo.zoneBreakdown.map((zone, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span>{zone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Inspection Details */}
            {'inspectionDetails' in detailedInfo && (
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Inspection Status
                </h3>
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{detailedInfo.inspectionDetails.overdueDays}</div>
                    <div className="text-sm text-muted-foreground">Days Overdue</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Inspection Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Inspection:</span>
                        <span>{detailedInfo.inspectionDetails.lastInspection}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span className="text-red-600 font-medium">{detailedInfo.inspectionDetails.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span>{detailedInfo.inspectionDetails.inspectionType}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Section Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Section:</span>
                        <span>{detailedInfo.sectionDetails.trackSection}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Length:</span>
                        <span>{detailedInfo.sectionDetails.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Traffic Level:</span>
                        <Badge variant="outline">{detailedInfo.sectionDetails.trafficLevel}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        <div className="p-6 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {alert.actionRequired && (
                <Button>
                  Take Action
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
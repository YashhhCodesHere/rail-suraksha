"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, MapPin, Wrench, FileText } from "lucide-react"
import { AlertDetailsModal } from "@/components/alerts/alert-details-modal"
import { TakeActionModal } from "@/components/alerts/take-action-modal"

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

interface ActionPlan {
  actionType: string
  priority: string
  assignedTo: string
  scheduledDate: string
  estimatedDuration: string
  description: string
  resources: string[]
  expectedOutcome: string
}

const alerts: Alert[] = [
  {
    id: "ALERT-001",
    type: "quality",
    title: "High-Risk Batch Detected",
    message: "Batch #23-114-254/89 from Tata Steel has 12 fittings entering high-risk period",
    severity: "high",
    time: "2 hours ago",
    location: "Northern Zone, Section B",
    actionRequired: true,
  },
  {
    id: "ALERT-002",
    type: "warranty",
    title: "Warranty Expiration Alert",
    message: "847 fittings expire within 30 days across multiple zones",
    severity: "medium",
    time: "4 hours ago",
    actionRequired: true,
  },
  {
    id: "ALERT-003",
    type: "inspection",
    title: "Inspection Overdue",
    message: "Quality inspection overdue for Section B, Track 2 - Northern Zone",
    severity: "high",
    time: "6 hours ago",
    location: "Northern Zone",
    actionRequired: true,
  },
  {
    id: "ALERT-004",
    type: "maintenance",
    title: "Predictive Maintenance",
    message: "AI model suggests maintenance for 23 fittings in Western Zone",
    severity: "medium",
    time: "8 hours ago",
    location: "Western Zone",
    actionRequired: false,
  },
  {
    id: "ALERT-005",
    type: "quality",
    title: "Quality Score Drop",
    message: "JSW Steel Limited quality score dropped below 90% threshold",
    severity: "low",
    time: "12 hours ago",
    actionRequired: false,
  },
]

function getAlertIcon(type: Alert["type"]) {
  switch (type) {
    case "maintenance":
      return <Wrench className="h-4 w-4" />
    case "warranty":
      return <FileText className="h-4 w-4" />
    case "quality":
      return <AlertTriangle className="h-4 w-4" />
    case "inspection":
      return <Clock className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

function getSeverityColor(severity: Alert["severity"]) {
  switch (severity) {
    case "high":
      return "border-red-500 bg-red-500/10"
    case "medium":
      return "border-yellow-500 bg-yellow-500/10"
    case "low":
      return "border-blue-500 bg-blue-500/10"
    default:
      return "border-gray-500 bg-gray-500/10"
  }
}

export function PriorityAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert)
    setIsDetailsModalOpen(true)
  }

  const handleTakeAction = (alert: Alert) => {
    setSelectedAlert(alert)
    setIsActionModalOpen(true)
  }

  const handleActionTaken = (actionPlan: ActionPlan) => {
    // Handle the action plan (save to backend, update alert status, etc.)
    console.log("Action plan created:", actionPlan)
    // You could update the alert status or show a success message here
  }
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500 animate-pulse" />
          <span>Priority Alerts</span>
          <Badge variant="secondary" className="ml-auto">
            {alerts.filter((alert) => alert.actionRequired).length} Action Required
          </Badge>
        </CardTitle>
        <CardDescription>Critical issues requiring immediate attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {alerts.map((alert, index) => (
            <div
              key={alert.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-md ${getSeverityColor(alert.severity)}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{alert.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        alert.severity === "high"
                          ? "destructive"
                          : alert.severity === "medium"
                            ? "secondary"
                            : "default"
                      }
                      className="text-xs"
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                    {alert.actionRequired && (
                      <Badge variant="outline" className="text-xs animate-pulse">
                        Action Required
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{alert.time}</span>
                    </span>
                    {alert.location && (
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </span>
                    )}
                    <span>ID: {alert.id}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs bg-transparent"
                      onClick={() => handleViewDetails(alert)}
                    >
                      View Details
                    </Button>
                    {alert.actionRequired && (
                      <Button 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleTakeAction(alert)}
                      >
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      {/* Alert Details Modal */}
      <AlertDetailsModal
        alert={selectedAlert}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedAlert(null)
        }}
      />

      {/* Take Action Modal */}
      <TakeActionModal
        alert={selectedAlert}
        isOpen={isActionModalOpen}
        onClose={() => {
          setIsActionModalOpen(false)
          setSelectedAlert(null)
        }}
        onActionTaken={handleActionTaken}
      />
    </Card>
  )
}

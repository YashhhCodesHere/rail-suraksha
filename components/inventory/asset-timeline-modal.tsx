"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Wrench, AlertTriangle, CheckCircle, Clock, Download } from "lucide-react"

interface InventoryItem {
  id: string
  batchId: string
  vendor: string
  itemType: string
  zone: string
  location: string
  manufactureDate: string
  supplyDate: string
  warrantyStatus: "active" | "expiring" | "expired"
  riskLevel: "low" | "medium" | "high"
  lastScanned: string
  status: "active" | "maintenance" | "retired"
}

interface TimelineEvent {
  date: string
  type: "manufacture" | "supply" | "installation" | "inspection" | "maintenance" | "scan" | "alert"
  title: string
  description: string
  location?: string
  status: "completed" | "in-progress" | "scheduled"
}

interface AssetTimelineModalProps {
  item: InventoryItem | null
  isOpen: boolean
  onClose: () => void
}

const generateTimelineEvents = (item: InventoryItem): TimelineEvent[] => {
  return [
    {
      date: item.manufactureDate,
      type: "manufacture",
      title: "Manufacturing Completed",
      description: `Manufactured by ${item.vendor} with quality certification`,
      status: "completed",
    },
    {
      date: item.supplyDate,
      type: "supply",
      title: "Supplied to Railway",
      description: `Delivered to ${item.zone} for installation`,
      location: item.zone,
      status: "completed",
    },
    {
      date: "2024-02-10",
      type: "installation",
      title: "Installation Completed",
      description: `Installed at ${item.location}`,
      location: item.location,
      status: "completed",
    },
    {
      date: "2024-06-15",
      type: "inspection",
      title: "Routine Inspection",
      description: "Passed routine quality inspection with no issues found",
      location: item.location,
      status: "completed",
    },
    {
      date: item.lastScanned,
      type: "scan",
      title: "QR Code Scanned",
      description: "Latest QR code scan for tracking verification",
      location: item.location,
      status: "completed",
    },
    {
      date: "2024-12-20",
      type: "inspection",
      title: "Scheduled Inspection",
      description: "Upcoming routine inspection scheduled",
      location: item.location,
      status: "scheduled",
    },
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

const getEventIcon = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "manufacture":
      return <Wrench className="h-4 w-4" />
    case "supply":
      return <MapPin className="h-4 w-4" />
    case "installation":
      return <CheckCircle className="h-4 w-4" />
    case "inspection":
      return <AlertTriangle className="h-4 w-4" />
    case "maintenance":
      return <Wrench className="h-4 w-4" />
    case "scan":
      return <CheckCircle className="h-4 w-4" />
    case "alert":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getEventColor = (type: TimelineEvent["type"], status: TimelineEvent["status"]) => {
  if (status === "scheduled") return "text-blue-500"
  if (status === "in-progress") return "text-yellow-500"

  switch (type) {
    case "manufacture":
    case "supply":
    case "installation":
      return "text-green-500"
    case "inspection":
      return "text-blue-500"
    case "maintenance":
      return "text-yellow-500"
    case "scan":
      return "text-green-500"
    case "alert":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

export function AssetTimelineModal({ item, isOpen, onClose }: AssetTimelineModalProps) {
  if (!item) return null

  const timelineEvents = generateTimelineEvents(item)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Asset Timeline - {item.batchId}</span>
          </DialogTitle>
          <DialogDescription>
            Complete lifecycle history and tracking information for this railway fitting
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Asset Summary */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Asset Information</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Batch ID:</span> {item.batchId}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Type:</span> {item.itemType}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Vendor:</span> {item.vendor}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Current Status</h3>
                <div className="space-y-2">
                  <Badge variant={item.status === "active" ? "default" : "secondary"}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                  <Badge
                    variant={
                      item.riskLevel === "low" ? "outline" : item.riskLevel === "medium" ? "secondary" : "destructive"
                    }
                  >
                    {item.riskLevel.charAt(0).toUpperCase() + item.riskLevel.slice(1)} Risk
                  </Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Location</h3>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{item.zone}</span>
                  </p>
                  <p className="text-muted-foreground">{item.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Asset Lifecycle Timeline</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative flex items-start space-x-4">
                    {/* Timeline dot */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 bg-background ${getEventColor(event.type, event.status)} border-current`}
                    >
                      {getEventIcon(event.type)}
                    </div>

                    {/* Event content */}
                    <div className="flex-1 min-w-0 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{event.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              event.status === "completed"
                                ? "default"
                                : event.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      {event.location && (
                        <p className="text-xs text-muted-foreground flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <Separator />
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Timeline
              </Button>
              <Button variant="outline" size="sm">
                Schedule Inspection
              </Button>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Wrench, 
  FileText, 
  User, 
  Calendar,
  CheckCircle,
  Send,
  Users,
  Settings,
  Target
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

interface TakeActionModalProps {
  alert: Alert | null
  isOpen: boolean
  onClose: () => void
  onActionTaken: (action: ActionPlan) => void
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

export function TakeActionModal({ alert, isOpen, onClose, onActionTaken }: TakeActionModalProps) {
  const [actionPlan, setActionPlan] = useState<ActionPlan>({
    actionType: "",
    priority: "",
    assignedTo: "",
    scheduledDate: "",
    estimatedDuration: "",
    description: "",
    resources: [],
    expectedOutcome: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!alert) return null

  const getActionOptions = () => {
    switch (alert.type) {
      case "quality":
        return [
          { value: "immediate-inspection", label: "Immediate Inspection" },
          { value: "batch-quarantine", label: "Batch Quarantine" },
          { value: "replacement-order", label: "Replacement Order" },
          { value: "vendor-notification", label: "Vendor Notification" }
        ]
      case "warranty":
        return [
          { value: "schedule-replacement", label: "Schedule Replacement" },
          { value: "expedite-procurement", label: "Expedite Procurement" },
          { value: "extend-warranty", label: "Extend Warranty" },
          { value: "preventive-maintenance", label: "Preventive Maintenance" }
        ]
      case "inspection":
        return [
          { value: "schedule-inspection", label: "Schedule Inspection" },
          { value: "emergency-inspection", label: "Emergency Inspection" },
          { value: "assign-inspector", label: "Assign Inspector" },
          { value: "compliance-review", label: "Compliance Review" }
        ]
      case "maintenance":
        return [
          { value: "schedule-maintenance", label: "Schedule Maintenance" },
          { value: "emergency-repair", label: "Emergency Repair" },
          { value: "resource-allocation", label: "Resource Allocation" },
          { value: "contractor-assignment", label: "Contractor Assignment" }
        ]
      default:
        return [
          { value: "investigate", label: "Investigate Issue" },
          { value: "monitor", label: "Monitor Situation" },
          { value: "escalate", label: "Escalate to Management" }
        ]
    }
  }

  const getTeamOptions = () => {
    return [
      { value: "maintenance-alpha", label: "Maintenance Team Alpha" },
      { value: "maintenance-beta", label: "Maintenance Team Beta" },
      { value: "inspection-team", label: "Quality Inspection Team" },
      { value: "engineering-team", label: "Engineering Team" },
      { value: "vendor-management", label: "Vendor Management Team" },
      { value: "external-contractor", label: "External Contractor" }
    ]
  }

  const getResourceOptions = () => {
    return [
      "Replacement parts inventory",
      "Specialized tools and equipment",
      "Safety equipment and protocols",
      "Transportation vehicles",
      "Testing and measurement devices",
      "Documentation and permits",
      "Emergency response kit",
      "Communication equipment"
    ]
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    onActionTaken(actionPlan)
    setIsSubmitting(false)
    onClose()
    
    // Reset form
    setActionPlan({
      actionType: "",
      priority: "",
      assignedTo: "",
      scheduledDate: "",
      estimatedDuration: "",
      description: "",
      resources: [],
      expectedOutcome: ""
    })
  }

  const handleResourceToggle = (resource: string) => {
    setActionPlan(prev => ({
      ...prev,
      resources: prev.resources.includes(resource)
        ? prev.resources.filter(r => r !== resource)
        : [...prev.resources, resource]
    }))
  }

  const isFormValid = actionPlan.actionType && actionPlan.assignedTo && actionPlan.scheduledDate && actionPlan.description

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-primary" />
            <div>
              <span className="text-lg">Take Action</span>
              <div className="text-sm text-muted-foreground mt-1">
                Create action plan for: {alert.title}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <ScrollArea className="flex-1 max-h-[60vh] p-6">
          <div className="space-y-6">
            {/* Alert Summary */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alert Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Alert ID:</span>
                    <span className="font-mono">{alert.id}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Severity:</span>
                    <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="capitalize">{alert.type}</span>
                  </div>
                  {alert.location && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{alert.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Type Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Action Type *
              </Label>
              <Select value={actionPlan.actionType} onValueChange={(value) => 
                setActionPlan(prev => ({ ...prev, actionType: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select the type of action to take" />
                </SelectTrigger>
                <SelectContent>
                  {getActionOptions().map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority and Assignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Priority Level</Label>
                <Select value={actionPlan.priority} onValueChange={(value) => 
                  setActionPlan(prev => ({ ...prev, priority: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Set priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical (Immediate)</SelectItem>
                    <SelectItem value="high">High (Within 4 hours)</SelectItem>
                    <SelectItem value="medium">Medium (Within 24 hours)</SelectItem>
                    <SelectItem value="low">Low (Within 72 hours)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Assign To *
                </Label>
                <Select value={actionPlan.assignedTo} onValueChange={(value) => 
                  setActionPlan(prev => ({ ...prev, assignedTo: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team or individual" />
                  </SelectTrigger>
                  <SelectContent>
                    {getTeamOptions().map(team => (
                      <SelectItem key={team.value} value={team.value}>
                        {team.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Scheduling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Scheduled Date & Time *
                </Label>
                <Input
                  type="datetime-local"
                  value={actionPlan.scheduledDate}
                  onChange={(e) => setActionPlan(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Estimated Duration
                </Label>
                <Select value={actionPlan.estimatedDuration} onValueChange={(value) => 
                  setActionPlan(prev => ({ ...prev, estimatedDuration: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="2hours">2 hours</SelectItem>
                    <SelectItem value="4hours">4 hours</SelectItem>
                    <SelectItem value="8hours">8 hours (Full day)</SelectItem>
                    <SelectItem value="2days">2 days</SelectItem>
                    <SelectItem value="1week">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Description */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Action Description *
              </Label>
              <Textarea
                placeholder="Describe the specific actions to be taken, steps involved, and any special instructions..."
                value={actionPlan.description}
                onChange={(e) => setActionPlan(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>

            {/* Resources Required */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center">
                <Wrench className="h-4 w-4 mr-2" />
                Resources Required
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {getResourceOptions().map(resource => (
                  <div key={resource} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={resource}
                      checked={actionPlan.resources.includes(resource)}
                      onChange={() => handleResourceToggle(resource)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor={resource} className="text-sm cursor-pointer">
                      {resource}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Outcome */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Expected Outcome
              </Label>
              <Textarea
                placeholder="Describe the expected result after completing this action..."
                value={actionPlan.expectedOutcome}
                onChange={(e) => setActionPlan(prev => ({ ...prev, expectedOutcome: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
        </ScrollArea>

        <Separator />

        <div className="p-6 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              * Required fields must be completed
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!isFormValid || isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Create Action Plan</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
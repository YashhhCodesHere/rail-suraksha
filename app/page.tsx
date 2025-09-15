"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Train, Bell, BarChart3, QrCode, Package, TrendingUp, Settings } from "lucide-react"
import { MetricCards, AdditionalMetrics } from "@/components/dashboard/metric-cards"
import { VendorQualityChart, DefectTrendChart, ZoneRiskMap } from "@/components/dashboard/analytics-charts"
import { PriorityAlerts } from "@/components/dashboard/priority-alerts"
import { QRForm } from "@/components/qr-generation/qr-form"
import { QRPreview } from "@/components/qr-generation/qr-preview"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { AssetTimelineModal } from "@/components/inventory/asset-timeline-modal"
import { PredictiveMaintenanceConsole } from "@/components/analytics/predictive-maintenance"
import { VendorReportCards } from "@/components/analytics/vendor-report-cards"
import { IntegrationStatus } from "@/components/integration/integration-status"
import { NotificationModal } from "@/components/notifications/notification-modal"
import { downloadQRCodeAsPNG, downloadQRCodeAsSVG, validateQRData } from "@/lib/qr-utils"

interface FittingData {
  vendorName: string
  lotNumber: string
  itemType: string
  manufactureDate: string
  supplyDate: string
  warrantyPeriod: string
  specifications: string
  batchId: string
}

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

export default function RailSurakshaApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [fittingData, setFittingData] = useState<FittingData>({
    vendorName: "",
    lotNumber: "",
    itemType: "",
    manufactureDate: "",
    supplyDate: "",
    warrantyPeriod: "24",
    specifications: "",
    batchId: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [tabTransition, setTabTransition] = useState(false)
  
  // Notification state
  const [notifications, setNotifications] = useState<Array<{
    id: number
    title: string
    message: string
    type: "alert" | "warning" | "success" | "info"
    timestamp: Date
    isRead: boolean
    priority: "high" | "medium" | "low"
  }>>([
    {
      id: 1,
      title: "High Risk Alert",
      message: "Batch 23-12-5678 requires immediate inspection",
      type: "alert" as const,
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
      priority: "high" as const
    },
    {
      id: 2,
      title: "Warranty Expiring",
      message: "15 fittings warranty expires in 7 days",
      type: "warning" as const,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      priority: "medium" as const
    },
    {
      id: 3,
      title: "Quality Score Update",
      message: "Vendor performance report generated",
      type: "info" as const,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: true,
      priority: "low" as const
    },
    {
      id: 4,
      title: "System Maintenance",
      message: "Scheduled maintenance completed successfully",
      type: "success" as const,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isRead: true,
      priority: "low" as const
    },
    {
      id: 5,
      title: "New Integration",
      message: "UDM system sync established",
      type: "info" as const,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      priority: "medium" as const
    }
  ])
  
  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleDataChange = (data: FittingData) => {
    setFittingData(data)
    setIsGenerated(false)
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setIsGenerated(true)
  }

  const handleDownload = async () => {
    if (!validateQRData(fittingData)) {
      console.error("Invalid fitting data for QR generation")
      return
    }

    try {
      const filename = `QR_${fittingData.batchId}_${new Date().toISOString().split('T')[0]}.png`
      await downloadQRCodeAsPNG(fittingData, filename, {
        width: 512,
        margin: 4,
        errorCorrectionLevel: 'H'
      })
      console.log("QR code downloaded successfully as PNG")
    } catch (error) {
      console.error("Failed to download QR code:", error)
    }
  }

  const handleEmail = async () => {
    if (!validateQRData(fittingData)) {
      console.error("Invalid fitting data for email")
      return
    }

    // This would typically integrate with an email service
    // For now, we'll generate a downloadable SVG as an example
    try {
      const filename = `QR_Certificate_${fittingData.batchId}.svg`
      await downloadQRCodeAsSVG(fittingData, filename, {
        width: 400,
        margin: 3,
        errorCorrectionLevel: 'H'
      })
      console.log("QR certificate prepared for email (downloaded as SVG)")
    } catch (error) {
      console.error("Failed to prepare email certificate:", error)
    }
  }

  const handlePrint = () => {
    if (!validateQRData(fittingData)) {
      console.error("Invalid fitting data for printing")
      return
    }

    // Open print dialog with the current page
    // In a real implementation, this would format the certificate for printing
    window.print()
    console.log("Opening print dialog for certificate template")
  }

  const handleViewTimeline = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsTimelineModalOpen(true)
  }

  const handleCloseTimeline = () => {
    setIsTimelineModalOpen(false)
    setSelectedItem(null)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (newTab: string) => {
    setTabTransition(true)
    setTimeout(() => {
      setActiveTab(newTab)
      setTabTransition(false)
    }, 150)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/5 rounded-full animate-float animate-delay-200"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary/3 rounded-full animate-float animate-delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-accent/4 rounded-full animate-float animate-delay-300"></div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 hover-glow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-4 ${isLoaded ? "animate-slide-in-left" : "opacity-0"}`}>
              <div className="flex items-center space-x-2">
                <Train className="h-8 w-8 text-primary animate-pulse-glow animate-rotate-slow" />
                <h1 className="text-2xl font-bold text-foreground animate-shimmer">RailSuraksha</h1>
              </div>
              <Badge variant="secondary" className="animate-bounce-in animate-delay-300 hover-lift">
                AI-Powered Railway Analytics
              </Badge>
            </div>
            <nav className={`flex items-center space-x-6 ${isLoaded ? "animate-slide-in-right" : "opacity-0"}`}>
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                onClick={() => handleTabChange("dashboard")}
                className="transition-all duration-300 hover:scale-105 hover-lift animate-fade-in-up animate-delay-100"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "qr-generation" ? "default" : "ghost"}
                onClick={() => handleTabChange("qr-generation")}
                className="transition-all duration-300 hover:scale-105 hover-lift animate-fade-in-up animate-delay-200"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR
              </Button>
              <Button
                variant={activeTab === "inventory" ? "default" : "ghost"}
                onClick={() => handleTabChange("inventory")}
                className="transition-all duration-300 hover:scale-105 hover-lift animate-fade-in-up animate-delay-300"
              >
                <Package className="h-4 w-4 mr-2" />
                Inventory
              </Button>
              <Button
                variant={activeTab === "analytics" ? "default" : "ghost"}
                onClick={() => handleTabChange("analytics")}
                className="transition-all duration-300 hover:scale-105 hover-lift animate-fade-in-up animate-delay-500"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button
                variant={activeTab === "integration" ? "default" : "ghost"}
                onClick={() => handleTabChange("integration")}
                className="transition-all duration-300 hover:scale-105 hover-lift animate-fade-in-up animate-delay-500"
              >
                <Settings className="h-4 w-4 mr-2" />
                Integration
              </Button>
              
              {/* Notification Modal */}
              <NotificationModal
                notifications={notifications}
                unreadCount={unreadCount}
                onMarkAsRead={(id) => {
                  setNotifications(prev => 
                    prev.map(notification => 
                      notification.id === id 
                        ? { ...notification, isRead: true }
                        : notification
                    )
                  )
                }}
                onMarkAllAsRead={() => {
                  setNotifications(prev => 
                    prev.map(notification => ({ ...notification, isRead: true }))
                  )
                }}
                onRemoveNotification={(id) => {
                  setNotifications(prev => 
                    prev.filter(notification => notification.id !== id)
                  )
                }}
              />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Dashboard Tab */}
          <TabsContent
            value="dashboard"
            className={`space-y-8 ${tabTransition ? "opacity-0" : "animate-slide-up-fade"}`}
          >
            <div className="bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 rounded-lg p-6 animate-scale-in border border-primary/20 hover-glow animate-shimmer">
              <div className="flex items-center justify-between">
                <div className="animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Railway Operations Dashboard</h2>
                  <p className="text-muted-foreground text-lg">
                    Monitoring <span className="text-primary font-semibold animate-pulse">4.2M fittings</span> across{" "}
                    <span className="text-primary font-semibold animate-pulse animate-delay-200">12 zones</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2 animate-slide-in-right animate-delay-300">
                  <div className="h-6 w-6 text-green-500 animate-pulse" />
                  <span className="text-sm text-green-500 font-medium">All Systems Operational</span>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up animate-delay-200">
              <MetricCards />
            </div>

            <div className="animate-fade-in-up animate-delay-300">
              <AdditionalMetrics />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-slide-in-left animate-delay-500">
                <VendorQualityChart />
              </div>
              <div className="animate-slide-in-right animate-delay-500">
                <DefectTrendChart />
              </div>
            </div>

            <div className="animate-scale-in animate-delay-500">
              <ZoneRiskMap />
            </div>

            <div className="animate-slide-up-fade animate-delay-500">
              <PriorityAlerts />
            </div>
          </TabsContent>

          <TabsContent
            value="qr-generation"
            className={`space-y-8 ${tabTransition ? "opacity-0" : "animate-slide-up-fade"}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-slide-in-left">
                <QRForm onDataChange={handleDataChange} onGenerate={handleGenerate} isGenerating={isGenerating} />
              </div>
              <div className="animate-slide-in-right animate-delay-200">
                <QRPreview
                  data={fittingData}
                  isGenerated={isGenerated}
                  onDownload={handleDownload}
                  onEmail={handleEmail}
                  onPrint={handlePrint}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="inventory"
            className={`space-y-8 ${tabTransition ? "opacity-0" : "animate-slide-up-fade"}`}
          >
            <div className="animate-scale-in">
              <InventoryTable onViewTimeline={handleViewTimeline} />
            </div>
          </TabsContent>

          <TabsContent
            value="analytics"
            className={`space-y-8 ${tabTransition ? "opacity-0" : "animate-slide-up-fade"}`}
          >
            <div className="animate-fade-in-up">
              <PredictiveMaintenanceConsole />
            </div>
            <div className="animate-fade-in-up animate-delay-300">
              <VendorReportCards />
            </div>
          </TabsContent>

          <TabsContent
            value="integration"
            className={`space-y-8 ${tabTransition ? "opacity-0" : "animate-slide-up-fade"}`}
          >
            <div className="animate-scale-in">
              <IntegrationStatus />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Asset Timeline Modal */}
      <AssetTimelineModal item={selectedItem} isOpen={isTimelineModalOpen} onClose={handleCloseTimeline} />
    </div>
  )
}

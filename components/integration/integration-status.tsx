"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Globe, Database, Zap, Clock, Activity } from "lucide-react"

interface IntegrationSystem {
  id: string
  name: string
  description: string
  url: string
  status: "connected" | "warning" | "error" | "maintenance"
  lastSync: string
  responseTime: number
  uptime: number
  dataPoints: number
  errorCount: number
  version: string
}

const integrationSystems: IntegrationSystem[] = [
  {
    id: "udm",
    name: "UDM (ireps.gov.in)",
    description: "Unified Data Management System for Railway Procurement",
    url: "https://ireps.gov.in",
    status: "connected",
    lastSync: "2024-12-14T10:30:00Z",
    responseTime: 245,
    uptime: 99.8,
    dataPoints: 1250000,
    errorCount: 2,
    version: "v2.4.1",
  },
  {
    id: "tms",
    name: "TMS (irecept.gov.in)",
    description: "Track Management System for Asset Monitoring",
    url: "https://irecept.gov.in",
    status: "warning",
    lastSync: "2024-12-14T09:45:00Z",
    responseTime: 1200,
    uptime: 97.2,
    dataPoints: 890000,
    errorCount: 15,
    version: "v1.8.3",
  },
  {
    id: "ntes",
    name: "NTES",
    description: "National Train Enquiry System Integration",
    url: "https://enquiry.indianrail.gov.in",
    status: "connected",
    lastSync: "2024-12-14T10:25:00Z",
    responseTime: 180,
    uptime: 99.5,
    dataPoints: 2100000,
    errorCount: 1,
    version: "v3.1.0",
  },
  {
    id: "fois",
    name: "FOIS",
    description: "Freight Operations Information System",
    url: "https://fois.indianrail.gov.in",
    status: "error",
    lastSync: "2024-12-14T08:15:00Z",
    responseTime: 0,
    uptime: 85.3,
    dataPoints: 450000,
    errorCount: 45,
    version: "v2.1.2",
  },
  {
    id: "cris",
    name: "CRIS Portal",
    description: "Centre for Railway Information Systems",
    url: "https://cris.indianrail.gov.in",
    status: "maintenance",
    lastSync: "2024-12-14T06:00:00Z",
    responseTime: 0,
    uptime: 92.1,
    dataPoints: 3200000,
    errorCount: 0,
    version: "v4.2.0",
  },
]

function getStatusIcon(status: IntegrationSystem["status"]) {
  switch (status) {
    case "connected":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    case "error":
      return <XCircle className="h-5 w-5 text-red-500" />
    case "maintenance":
      return <RefreshCw className="h-5 w-5 text-blue-500" />
    default:
      return <XCircle className="h-5 w-5 text-gray-500" />
  }
}

function getStatusBadge(status: IntegrationSystem["status"]) {
  switch (status) {
    case "connected":
      return <Badge className="bg-green-500">Connected</Badge>
    case "warning":
      return <Badge className="bg-yellow-500">Warning</Badge>
    case "error":
      return <Badge variant="destructive">Error</Badge>
    case "maintenance":
      return <Badge className="bg-blue-500">Maintenance</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function getResponseTimeColor(responseTime: number) {
  if (responseTime === 0) return "text-gray-500"
  if (responseTime < 300) return "text-green-500"
  if (responseTime < 1000) return "text-yellow-500"
  return "text-red-500"
}

export function IntegrationStatus() {
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastRefresh(new Date())
    setIsRefreshing(false)
  }

  const connectedSystems = integrationSystems.filter((s) => s.status === "connected").length
  const totalSystems = integrationSystems.length
  const overallHealth = (connectedSystems / totalSystems) * 100

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="animate-fade-in-up">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>Integration Status Dashboard</span>
              </CardTitle>
              <CardDescription>Live operational status of integrated government railway systems</CardDescription>
            </div>
            <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" size="sm">
              {isRefreshing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {connectedSystems}/{totalSystems}
              </div>
              <p className="text-sm text-muted-foreground">Systems Online</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{overallHealth.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Overall Health</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {integrationSystems.reduce((sum, s) => sum + s.dataPoints, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Data Points</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">{lastRefresh.toLocaleTimeString()}</div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrationSystems.map((system, index) => (
          <Card
            key={system.id}
            className="animate-slide-in-right hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(system.status)}
                  <div>
                    <CardTitle className="text-lg">{system.name}</CardTitle>
                    <CardDescription>{system.description}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(system.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Connection Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">URL</p>
                  <p className="font-mono text-xs truncate">{system.url}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Version</p>
                  <p className="font-mono">{system.version}</p>
                </div>
              </div>

              <Separator />

              {/* Performance Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Response Time</span>
                  </div>
                  <span className={`text-sm font-medium ${getResponseTimeColor(system.responseTime)}`}>
                    {system.responseTime === 0 ? "N/A" : `${system.responseTime}ms`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Uptime</span>
                  </div>
                  <span className="text-sm font-medium">{system.uptime}%</span>
                </div>
                <Progress value={system.uptime} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Data Points</span>
                  </div>
                  <span className="text-sm font-medium">{system.dataPoints.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Error Count (24h)</span>
                  </div>
                  <span
                    className={`text-sm font-medium ${system.errorCount > 10 ? "text-red-500" : system.errorCount > 0 ? "text-yellow-500" : "text-green-500"}`}
                  >
                    {system.errorCount}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Last Sync</span>
                  </div>
                  <span className="text-sm font-medium">{new Date(system.lastSync).toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Test Connection
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Logs
                </Button>
                {system.status === "error" && (
                  <Button size="sm" className="flex-1">
                    Reconnect
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health Timeline */}
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle>System Health Timeline</CardTitle>
          <CardDescription>24-hour status history for all integrated systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrationSystems.map((system) => (
              <div key={system.id} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium truncate">{system.name}</div>
                <div className="flex-1 flex space-x-1">
                  {Array.from({ length: 24 }).map((_, hour) => {
                    const isCurrentHour = hour === new Date().getHours()
                    const status = Math.random() > 0.1 ? "up" : "down"
                    return (
                      <div
                        key={hour}
                        className={`h-8 flex-1 rounded-sm ${isCurrentHour ? "ring-2 ring-primary" : ""} ${
                          status === "up" ? "bg-green-500" : "bg-red-500"
                        }`}
                        title={`${hour}:00 - ${status === "up" ? "Online" : "Offline"}`}
                      />
                    )
                  })}
                </div>
                <div className="w-16 text-sm text-right">{system.uptime}%</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-4">
            <span>24 hours ago</span>
            <span>Now</span>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints Status */}
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle>API Endpoints Health Check</CardTitle>
          <CardDescription>Real-time status of critical API endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { endpoint: "/api/v1/fittings", status: "healthy", responseTime: 120 },
              { endpoint: "/api/v1/vendors", status: "healthy", responseTime: 95 },
              { endpoint: "/api/v1/analytics", status: "degraded", responseTime: 850 },
              { endpoint: "/api/v1/sync/udm", status: "healthy", responseTime: 245 },
              { endpoint: "/api/v1/sync/tms", status: "unhealthy", responseTime: 0 },
              { endpoint: "/api/v1/reports", status: "healthy", responseTime: 180 },
            ].map((api, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      api.status === "healthy"
                        ? "bg-green-500"
                        : api.status === "degraded"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="font-mono text-sm">{api.endpoint}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={
                      api.status === "healthy" ? "default" : api.status === "degraded" ? "secondary" : "destructive"
                    }
                  >
                    {api.status}
                  </Badge>
                  <span className={`text-sm ${getResponseTimeColor(api.responseTime)}`}>
                    {api.responseTime === 0 ? "Timeout" : `${api.responseTime}ms`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

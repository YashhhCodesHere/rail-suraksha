"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Shield, AlertTriangle, QrCode, Activity, Users, MapPin } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  description?: string
  delay?: number
}

function MetricCard({ title, value, change, trend, icon, description, delay = 0 }: MetricCardProps) {
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-yellow-500"
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Activity

  return (
    <Card
      className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
        <div className="flex items-center space-x-2">
          <TrendIcon className={`h-4 w-4 ${trendColor}`} />
          <p className={`text-xs font-medium ${trendColor}`}>{change}</p>
        </div>
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </CardContent>
    </Card>
  )
}

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="System Health"
        value="98.6%"
        change="+2.1% from last month"
        trend="up"
        icon={<Activity className="h-5 w-5 text-green-500" />}
        description="All systems operational"
        delay={0}
      />
      <MetricCard
        title="Warranty Coverage"
        value="84%"
        change="3.2M fittings covered"
        trend="up"
        icon={<Shield className="h-5 w-5 text-blue-500" />}
        description="Active warranty protection"
        delay={100}
      />
      <MetricCard
        title="Predicted Risk"
        value="3.8%"
        change="159K fittings flagged"
        trend="neutral"
        icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
        description="AI risk assessment"
        delay={200}
      />
      <MetricCard
        title="Scan Activity (7d)"
        value="12,457"
        change="+8.2% from last week"
        trend="up"
        icon={<QrCode className="h-5 w-5 text-primary" />}
        description="QR code scans"
        delay={300}
      />
    </div>
  )
}

export function AdditionalMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <MetricCard
        title="Active Vendors"
        value="247"
        change="+12 new this month"
        trend="up"
        icon={<Users className="h-5 w-5 text-purple-500" />}
        description="Certified suppliers"
        delay={400}
      />
      <MetricCard
        title="Railway Zones"
        value="12"
        change="100% coverage"
        trend="neutral"
        icon={<MapPin className="h-5 w-5 text-cyan-500" />}
        description="Pan-India monitoring"
        delay={500}
      />
      <MetricCard
        title="Avg Response Time"
        value="2.3s"
        change="-0.4s improvement"
        trend="up"
        icon={<Activity className="h-5 w-5 text-orange-500" />}
        description="System performance"
        delay={600}
      />
    </div>
  )
}

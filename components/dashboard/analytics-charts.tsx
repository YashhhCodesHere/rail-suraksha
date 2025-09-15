"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const vendorData = [
  { name: "Bharat Heavy Electricals", score: 96.8, defects: 12, color: "#10b981" },
  { name: "Tata Steel Limited", score: 94.2, defects: 18, color: "#3b82f6" },
  { name: "JSW Steel Limited", score: 91.7, defects: 25, color: "#f59e0b" },
  { name: "SAIL Bhilai", score: 89.3, defects: 32, color: "#ef4444" },
  { name: "Jindal Steel", score: 87.1, defects: 41, color: "#8b5cf6" },
]

const defectTrendData = [
  { month: "Jul", defects: 2.8, target: 3.0 },
  { month: "Aug", defects: 3.2, target: 3.0 },
  { month: "Sep", defects: 2.9, target: 3.0 },
  { month: "Oct", defects: 3.4, target: 3.0 },
  { month: "Nov", defects: 3.1, target: 3.0 },
  { month: "Dec", defects: 2.7, target: 3.0 },
]

const zoneRiskData = [
  { name: "Northern", value: 342, risk: 4.2, color: "#ef4444" },
  { name: "Western", value: 298, risk: 3.8, color: "#f59e0b" },
  { name: "Eastern", value: 267, risk: 3.1, color: "#10b981" },
  { name: "Southern", value: 289, risk: 2.9, color: "#3b82f6" },
  { name: "Central", value: 234, risk: 3.5, color: "#8b5cf6" },
  { name: "South Central", value: 198, risk: 2.8, color: "#06b6d4" },
]

export function VendorQualityChart() {
  return (
    <Card className="animate-slide-in-right">
      <CardHeader>
        <CardTitle>Top Vendors by Quality Score</CardTitle>
        <CardDescription>Performance ranking based on defect rates and delivery metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vendorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.02 240)" />
            <XAxis dataKey="name" stroke="oklch(0.7 0 0)" fontSize={12} angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="oklch(0.7 0 0)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.12 0.02 240)",
                border: "1px solid oklch(0.25 0.02 240)",
                borderRadius: "8px",
                color: "oklch(0.98 0 0)",
              }}
            />
            <Bar dataKey="score" fill="oklch(0.7 0.25 25)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function DefectTrendChart() {
  return (
    <Card className="animate-slide-in-right">
      <CardHeader>
        <CardTitle>Defect Rate Trend</CardTitle>
        <CardDescription>Monthly defect percentage vs target threshold</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={defectTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Line
              type="monotone"
              dataKey="defects"
              stroke="oklch(0.7 0.25 25)"
              strokeWidth={3}
              dot={{ fill: "oklch(0.7 0.25 25)", strokeWidth: 2, r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="oklch(0.6 0.25 15)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ZoneRiskMap() {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle>Zone-wise Risk Distribution</CardTitle>
        <CardDescription>Risk levels and fitting counts across railway zones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {zoneRiskData.map((zone, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border-l-4 hover:bg-muted/50 transition-colors duration-300"
                style={{ borderLeftColor: zone.color }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{zone.name} Railway</p>
                    <Badge variant={zone.risk > 4 ? "destructive" : zone.risk > 3.5 ? "secondary" : "default"}>
                      {zone.risk}% Risk
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{zone.value}K total fittings</p>
                  <Progress value={zone.risk * 10} className="h-2" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={zoneRiskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {zoneRiskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.12 0.02 240)",
                    border: "1px solid oklch(0.25 0.02 240)",
                    borderRadius: "8px",
                    color: "oklch(0.98 0 0)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

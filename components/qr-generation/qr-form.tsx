"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { QrCode } from "lucide-react"

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

interface QRFormProps {
  onDataChange: (data: FittingData) => void
  onGenerate: () => void
  isGenerating: boolean
}

const itemTypes = [
  "Rail Joint",
  "Fish Plate",
  "Rail Bolt",
  "Rail Spike",
  "Tie Plate",
  "Rail Pad",
  "Rail Anchor",
  "Switch Point",
  "Crossing Frog",
  "Guard Rail",
]

const vendors = [
  "Bharat Heavy Electricals Ltd",
  "Tata Steel Limited",
  "JSW Steel Limited",
  "SAIL Bhilai Steel Plant",
  "Jindal Steel & Power",
  "Rashtriya Ispat Nigam Limited",
  "Steel Authority of India",
  "Essar Steel Limited",
]

export function QRForm({ onDataChange, onGenerate, isGenerating }: QRFormProps) {
  const [formData, setFormData] = useState<FittingData>({
    vendorName: "",
    lotNumber: "",
    itemType: "",
    manufactureDate: "",
    supplyDate: "",
    warrantyPeriod: "24",
    specifications: "",
    batchId: "",
  })

  const handleInputChange = (field: keyof FittingData, value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onDataChange(newData)
  }

  const generateBatchId = () => {
    const year = new Date().getFullYear().toString().slice(-2)
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0")
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    const batchId = `${year}-${month}-${random}`
    handleInputChange("batchId", batchId)
  }

  const isFormValid =
    formData.vendorName &&
    formData.lotNumber &&
    formData.itemType &&
    formData.manufactureDate &&
    formData.supplyDate &&
    formData.batchId

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <QrCode className="h-5 w-5 text-primary" />
          <span>Create New Fitting Certificate</span>
        </CardTitle>
        <CardDescription>Generate QR codes and digital certificates for railway track fittings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vendor Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Vendor Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor Name</Label>
              <Select value={formData.vendorName} onValueChange={(value) => handleInputChange("vendorName", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor} value={vendor}>
                      {vendor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lotNumber">Lot Number</Label>
              <Input
                id="lotNumber"
                placeholder="e.g., LOT-2024-001"
                value={formData.lotNumber}
                onChange={(e) => handleInputChange("lotNumber", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Product Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemType">Item Type</Label>
              <Select value={formData.itemType} onValueChange={(value) => handleInputChange("itemType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  {itemTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchId">Batch ID</Label>
              <div className="flex space-x-2">
                <Input
                  id="batchId"
                  placeholder="Auto-generated"
                  value={formData.batchId}
                  onChange={(e) => handleInputChange("batchId", e.target.value)}
                />
                <Button type="button" variant="outline" onClick={generateBatchId}>
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Date Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Date Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manufactureDate">Manufacture Date</Label>
              <Input
                id="manufactureDate"
                type="date"
                value={formData.manufactureDate}
                onChange={(e) => handleInputChange("manufactureDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplyDate">Supply Date</Label>
              <Input
                id="supplyDate"
                type="date"
                value={formData.supplyDate}
                onChange={(e) => handleInputChange("supplyDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="warrantyPeriod">Warranty Period (Months)</Label>
              <Select
                value={formData.warrantyPeriod}
                onValueChange={(value) => handleInputChange("warrantyPeriod", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 Months</SelectItem>
                  <SelectItem value="24">24 Months</SelectItem>
                  <SelectItem value="36">36 Months</SelectItem>
                  <SelectItem value="48">48 Months</SelectItem>
                  <SelectItem value="60">60 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-2">
          <Label htmlFor="specifications">Technical Specifications</Label>
          <Textarea
            id="specifications"
            placeholder="Enter technical specifications, material grade, dimensions, etc."
            value={formData.specifications}
            onChange={(e) => handleInputChange("specifications", e.target.value)}
            rows={3}
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onGenerate}
            disabled={!isFormValid || isGenerating}
            size="lg"
            className="w-full md:w-auto animate-pulse-glow"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Certificate
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

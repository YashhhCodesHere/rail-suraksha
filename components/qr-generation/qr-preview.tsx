"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, Printer, Eye, CheckCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { generateQRCode, validateQRData } from "@/lib/qr-utils"

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

interface QRPreviewProps {
  data: FittingData
  isGenerated: boolean
  onDownload: () => void
  onEmail: () => void
  onPrint: () => void
}

export function QRPreview({ data, isGenerated, onDownload, onEmail, onPrint }: QRPreviewProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null)
  const [isGeneratingQR, setIsGeneratingQR] = useState(false)
  const [qrError, setQrError] = useState<string | null>(null)

  const calculateWarrantyExpiry = () => {
    if (!data.supplyDate || !data.warrantyPeriod) return "N/A"
    const supplyDate = new Date(data.supplyDate)
    const expiryDate = new Date(supplyDate.setMonth(supplyDate.getMonth() + Number.parseInt(data.warrantyPeriod)))
    return expiryDate.toLocaleDateString()
  }

  // Generate QR code when data changes and is valid
  useEffect(() => {
    const generateQR = async () => {
      if (!validateQRData(data) || !data.batchId) {
        setQrCodeDataUrl(null)
        setQrError(null)
        return
      }

      setIsGeneratingQR(true)
      setQrError(null)

      try {
        const dataUrl = await generateQRCode(data, {
          width: 200,
          margin: 2,
          errorCorrectionLevel: 'M'
        })
        setQrCodeDataUrl(dataUrl)
      } catch (error) {
        console.error('Failed to generate QR code:', error)
        setQrError('Failed to generate QR code')
        setQrCodeDataUrl(null)
      } finally {
        setIsGeneratingQR(false)
      }
    }

    generateQR()
  }, [data])

  const generateQRData = () => {
    return JSON.stringify({
      id: data.batchId,
      vendor: data.vendorName,
      lot: data.lotNumber,
      type: data.itemType,
      mfgDate: data.manufactureDate,
      supplyDate: data.supplyDate,
      warranty: data.warrantyPeriod,
      specs: data.specifications,
    })
  }

  return (
    <Card className="animate-slide-in-right">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-primary" />
          <span>Live Certificate Preview</span>
          {isGenerated && (
            <Badge variant="default" className="ml-auto animate-pulse">
              <CheckCircle className="h-3 w-3 mr-1" />
              Generated
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Real-time preview of the digital certificate and QR code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Certificate Preview */}
        <div className="certificate-print bg-gradient-to-br from-card to-muted/50 p-6 rounded-lg border-2 border-primary/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary mb-2">RailSuraksha</h2>
            <p className="text-sm text-muted-foreground">Digital Railway Fitting Certificate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Certificate Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Certificate Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Batch ID:</span>
                    <span className="font-mono">{data.batchId || "Not generated"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vendor:</span>
                    <span>{data.vendorName || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lot Number:</span>
                    <span>{data.lotNumber || "Not entered"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Item Type:</span>
                    <span>{data.itemType || "Not selected"}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-foreground mb-3">Date Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manufactured:</span>
                    <span>
                      {data.manufactureDate ? new Date(data.manufactureDate).toLocaleDateString() : "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Supplied:</span>
                    <span>{data.supplyDate ? new Date(data.supplyDate).toLocaleDateString() : "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warranty:</span>
                    <span>{data.warrantyPeriod} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expires:</span>
                    <span>{calculateWarrantyExpiry()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                {isGeneratingQR ? (
                  <div className="w-32 h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-xs text-muted-foreground">Generating...</p>
                    </div>
                  </div>
                ) : qrError ? (
                  <div className="w-32 h-32 bg-red-50 rounded-lg flex items-center justify-center border-2 border-red-200">
                    <p className="text-xs text-red-600 text-center px-2">{qrError}</p>
                  </div>
                ) : qrCodeDataUrl ? (
                  <div className="w-32 h-32 rounded-lg overflow-hidden">
                    <img 
                      src={qrCodeDataUrl} 
                      alt="QR Code for fitting certificate" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-xs text-muted-foreground text-center">
                      {validateQRData(data) ? "QR Code will appear here" : "Complete form to generate QR"}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {qrCodeDataUrl ? "Scan to verify authenticity" : "Fill form to generate QR code"}
              </p>
            </div>
          </div>

          {/* Specifications */}
          {data.specifications && (
            <div className="mt-6">
              <h3 className="font-semibold text-foreground mb-2">Technical Specifications</h3>
              <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">{data.specifications}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isGenerated && (
          <div className="flex flex-col sm:flex-row gap-3 no-print">
            <Button onClick={onDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={onEmail} variant="outline" className="flex-1 bg-transparent">
              <Mail className="h-4 w-4 mr-2" />
              Email Certificate
            </Button>
            <Button onClick={onPrint} variant="outline" className="flex-1 bg-transparent">
              <Printer className="h-4 w-4 mr-2" />
              Print Template
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

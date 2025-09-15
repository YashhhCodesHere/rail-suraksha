import QRCode from 'qrcode'

export interface QRCodeOptions {
  width?: number
  margin?: number
  color?: {
    dark?: string
    light?: string
  }
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
}

export interface FittingData {
  vendorName: string
  lotNumber: string
  itemType: string
  manufactureDate: string
  supplyDate: string
  warrantyPeriod: string
  specifications: string
  batchId: string
}

/**
 * Generates QR code data URL from fitting data
 * @param data - The fitting data to encode
 * @param options - QR code generation options
 * @returns Promise<string> - Data URL of the generated QR code
 */
export async function generateQRCode(
  data: FittingData,
  options: QRCodeOptions = {}
): Promise<string> {
  try {
    // Create a structured data object for the QR code
    const qrData = {
      id: data.batchId,
      vendor: data.vendorName,
      lot: data.lotNumber,
      type: data.itemType,
      mfgDate: data.manufactureDate,
      supplyDate: data.supplyDate,
      warranty: data.warrantyPeriod,
      specs: data.specifications,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }

    // Convert to JSON string
    const qrString = JSON.stringify(qrData)

    // Default QR code options
    const defaultOptions: QRCode.QRCodeToDataURLOptions = {
      width: options.width || 256,
      margin: options.margin || 2,
      color: {
        dark: options.color?.dark || '#000000',
        light: options.color?.light || '#FFFFFF'
      },
      errorCorrectionLevel: options.errorCorrectionLevel || 'M'
    }

    // Generate QR code as data URL
    const dataUrl = await QRCode.toDataURL(qrString, defaultOptions)
    return dataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}

/**
 * Generates QR code as SVG string
 * @param data - The fitting data to encode
 * @param options - QR code generation options
 * @returns Promise<string> - SVG string of the generated QR code
 */
export async function generateQRCodeSVG(
  data: FittingData,
  options: QRCodeOptions = {}
): Promise<string> {
  try {
    const qrData = {
      id: data.batchId,
      vendor: data.vendorName,
      lot: data.lotNumber,
      type: data.itemType,
      mfgDate: data.manufactureDate,
      supplyDate: data.supplyDate,
      warranty: data.warrantyPeriod,
      specs: data.specifications,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }

    const qrString = JSON.stringify(qrData)

    const defaultOptions: QRCode.QRCodeToStringOptions = {
      type: 'svg',
      width: options.width || 256,
      margin: options.margin || 2,
      color: {
        dark: options.color?.dark || '#000000',
        light: options.color?.light || '#FFFFFF'
      },
      errorCorrectionLevel: options.errorCorrectionLevel || 'M'
    }

    const svgString = await QRCode.toString(qrString, defaultOptions)
    return svgString
  } catch (error) {
    console.error('Error generating QR code SVG:', error)
    throw new Error('Failed to generate QR code SVG')
  }
}

/**
 * Downloads QR code as PNG image
 * @param data - The fitting data to encode
 * @param filename - The filename for the download (optional, will be auto-generated if not provided)
 * @param options - QR code generation options
 */
export async function downloadQRCodeAsPNG(
  data: FittingData,
  filename?: string,
  options: QRCodeOptions = {}
): Promise<void> {
  try {
    const dataUrl = await generateQRCode(data, options)
    
    // Generate filename if not provided
    const downloadFilename = filename || `QR_${data.batchId || 'certificate'}_${new Date().toISOString().split('T')[0]}.png`
    
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = downloadFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading QR code:', error)
    throw new Error('Failed to download QR code')
  }
}

/**
 * Downloads QR code as SVG image
 * @param data - The fitting data to encode
 * @param filename - The filename for the download
 * @param options - QR code generation options
 */
export async function downloadQRCodeAsSVG(
  data: FittingData,
  filename: string = 'qr-code.svg',
  options: QRCodeOptions = {}
): Promise<void> {
  try {
    const svgString = await generateQRCodeSVG(data, options)
    
    // Create blob and download
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading QR code SVG:', error)
    throw new Error('Failed to download QR code SVG')
  }
}

/**
 * Validates QR code data
 * @param data - The fitting data to validate
 * @returns boolean - Whether the data is valid for QR generation
 */
export function validateQRData(data: FittingData): boolean {
  const requiredFields: (keyof FittingData)[] = [
    'vendorName',
    'lotNumber',
    'itemType',
    'manufactureDate',
    'supplyDate',
    'batchId'
  ]

  return requiredFields.every(field => data[field] && data[field].trim() !== '')
}

/**
 * Parses QR code data back to FittingData format
 * @param qrString - The QR code content string
 * @returns Parsed fitting data or null if invalid
 */
export function parseQRData(qrString: string): Partial<FittingData> | null {
  try {
    const parsed = JSON.parse(qrString)
    
    return {
      vendorName: parsed.vendor || '',
      lotNumber: parsed.lot || '',
      itemType: parsed.type || '',
      manufactureDate: parsed.mfgDate || '',
      supplyDate: parsed.supplyDate || '',
      warrantyPeriod: parsed.warranty || '',
      specifications: parsed.specs || '',
      batchId: parsed.id || ''
    }
  } catch (error) {
    console.error('Error parsing QR data:', error)
    return null
  }
}
// Export utility functions for inventory data

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

/**
 * Convert array of objects to CSV format
 */
function arrayToCSV(data: any[]): string {
  if (data.length === 0) return ''

  const headers = Object.keys(data[0])
  const csvHeaders = headers.join(',')
  
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header]
      // Escape quotes and wrap in quotes if contains comma, newline, or quote
      if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }).join(',')
  )

  return [csvHeaders, ...csvRows].join('\n')
}

/**
 * Download file with given content and filename
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Format inventory data for export (clean up field names and values)
 */
function formatInventoryForExport(data: InventoryItem[]) {
  return data.map(item => ({
    'Batch ID': item.batchId,
    'Vendor': item.vendor,
    'Item Type': item.itemType,
    'Zone': item.zone,
    'Location': item.location,
    'Manufacture Date': new Date(item.manufactureDate).toLocaleDateString(),
    'Supply Date': new Date(item.supplyDate).toLocaleDateString(),
    'Warranty Status': item.warrantyStatus.charAt(0).toUpperCase() + item.warrantyStatus.slice(1),
    'Risk Level': item.riskLevel.charAt(0).toUpperCase() + item.riskLevel.slice(1),
    'Status': item.status.charAt(0).toUpperCase() + item.status.slice(1),
    'Last Scanned': new Date(item.lastScanned).toLocaleDateString(),
  }))
}

/**
 * Export inventory data as CSV
 */
export function exportAsCSV(data: InventoryItem[], filename?: string) {
  const formattedData = formatInventoryForExport(data)
  const csv = arrayToCSV(formattedData)
  const defaultFilename = `inventory_export_${new Date().toISOString().split('T')[0]}.csv`
  
  downloadFile(csv, filename || defaultFilename, 'text/csv;charset=utf-8;')
}

/**
 * Export inventory data as JSON
 */
export function exportAsJSON(data: InventoryItem[], filename?: string) {
  const formattedData = formatInventoryForExport(data)
  const json = JSON.stringify(formattedData, null, 2)
  const defaultFilename = `inventory_export_${new Date().toISOString().split('T')[0]}.json`
  
  downloadFile(json, filename || defaultFilename, 'application/json;charset=utf-8;')
}

/**
 * Export inventory data as Excel-compatible CSV (with UTF-8 BOM)
 */
export function exportAsExcel(data: InventoryItem[], filename?: string) {
  const formattedData = formatInventoryForExport(data)
  const csv = arrayToCSV(formattedData)
  // Add UTF-8 BOM for proper Excel compatibility
  const csvWithBOM = '\uFEFF' + csv
  const defaultFilename = `inventory_export_${new Date().toISOString().split('T')[0]}.csv`
  
  downloadFile(csvWithBOM, filename || defaultFilename, 'text/csv;charset=utf-8;')
}

/**
 * Export filtered inventory data with metadata
 */
export function exportWithMetadata(
  data: InventoryItem[], 
  filters: {
    searchTerm?: string
    zoneFilter?: string
    vendorFilter?: string
    warrantyFilter?: string
    riskFilter?: string
  },
  format: 'csv' | 'json' | 'excel' = 'csv'
) {
  const exportData = {
    exportDate: new Date().toISOString(),
    totalRecords: data.length,
    appliedFilters: filters,
    data: formatInventoryForExport(data)
  }

  const timestamp = new Date().toISOString().split('T')[0]
  const filename = `railsuraksha_inventory_${timestamp}`

  switch (format) {
    case 'json':
      downloadFile(
        JSON.stringify(exportData, null, 2),
        `${filename}.json`,
        'application/json;charset=utf-8;'
      )
      break
    case 'excel':
      // For Excel, just export the data without metadata
      exportAsExcel(data, `${filename}.csv`)
      break
    case 'csv':
    default:
      exportAsCSV(data, `${filename}.csv`)
      break
  }
}
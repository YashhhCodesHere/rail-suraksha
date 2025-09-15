"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Eye, Download, MapPin, Calendar, AlertTriangle, FileText, FileSpreadsheet, FileJson, ChevronDown } from "lucide-react"

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

const mockInventoryData: InventoryItem[] = [
  {
    id: "FIT-001",
    batchId: "24-01-1234",
    vendor: "Tata Steel Limited",
    itemType: "Rail Joint",
    zone: "Northern Railway",
    location: "Section A, Track 1",
    manufactureDate: "2024-01-15",
    supplyDate: "2024-02-01",
    warrantyStatus: "active",
    riskLevel: "low",
    lastScanned: "2024-12-10",
    status: "active",
  },
  {
    id: "FIT-002",
    batchId: "24-01-1235",
    vendor: "JSW Steel Limited",
    itemType: "Fish Plate",
    zone: "Western Railway",
    location: "Section B, Track 2",
    manufactureDate: "2024-01-20",
    supplyDate: "2024-02-05",
    warrantyStatus: "expiring",
    riskLevel: "medium",
    lastScanned: "2024-12-08",
    status: "active",
  },
  {
    id: "FIT-003",
    batchId: "23-12-5678",
    vendor: "Bharat Heavy Electricals",
    itemType: "Rail Bolt",
    zone: "Eastern Railway",
    location: "Section C, Track 1",
    manufactureDate: "2023-12-10",
    supplyDate: "2023-12-25",
    warrantyStatus: "active",
    riskLevel: "high",
    lastScanned: "2024-12-09",
    status: "maintenance",
  },
  {
    id: "FIT-004",
    batchId: "24-02-9876",
    vendor: "SAIL Bhilai",
    itemType: "Tie Plate",
    zone: "Southern Railway",
    location: "Section D, Track 3",
    manufactureDate: "2024-02-01",
    supplyDate: "2024-02-15",
    warrantyStatus: "active",
    riskLevel: "low",
    lastScanned: "2024-12-11",
    status: "active",
  },
  {
    id: "FIT-005",
    batchId: "23-11-4321",
    vendor: "Jindal Steel",
    itemType: "Rail Spike",
    zone: "Central Railway",
    location: "Section E, Track 2",
    manufactureDate: "2023-11-15",
    supplyDate: "2023-11-30",
    warrantyStatus: "expired",
    riskLevel: "medium",
    lastScanned: "2024-12-07",
    status: "retired",
  },
]

interface InventoryTableProps {
  onViewTimeline: (item: InventoryItem) => void
}

export function InventoryTable({ onViewTimeline }: InventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [zoneFilter, setZoneFilter] = useState("all")
  const [vendorFilter, setVendorFilter] = useState("all")
  const [warrantyFilter, setWarrantyFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")

  const filteredData = mockInventoryData.filter((item) => {
    const matchesSearch =
      item.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesZone = zoneFilter === "all" || item.zone === zoneFilter
    const matchesVendor = vendorFilter === "all" || item.vendor === vendorFilter
    const matchesWarranty = warrantyFilter === "all" || item.warrantyStatus === warrantyFilter
    const matchesRisk = riskFilter === "all" || item.riskLevel === riskFilter

    return matchesSearch && matchesZone && matchesVendor && matchesWarranty && matchesRisk
  })

  const getWarrantyBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        )
      case "expiring":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Expiring
          </Badge>
        )
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "low":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            High
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "maintenance":
        return <Badge variant="secondary">Maintenance</Badge>
      case "retired":
        return <Badge variant="outline">Retired</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleExport = (format: 'csv' | 'json' | 'excel') => {
    console.log('Export button clicked with format:', format);
    console.log('Filtered data length:', filteredData.length);
    
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      
      if (format === 'csv') {
        // Simple CSV export
        const headers = ['Batch ID', 'Vendor', 'Item Type', 'Zone', 'Location', 'Warranty Status', 'Risk Level', 'Status'];
        const csvData = [
          headers.join(','),
          ...filteredData.map(item => [
            item.batchId,
            item.vendor,
            item.itemType,
            item.zone,
            item.location,
            item.warrantyStatus,
            item.riskLevel,
            item.status
          ].join(','))
        ].join('\n');
        
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `inventory_export_${timestamp}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        console.log('CSV export completed');
        
      } else if (format === 'excel') {
        // Excel-compatible CSV with BOM
        const headers = ['Batch ID', 'Vendor', 'Item Type', 'Zone', 'Location', 'Warranty Status', 'Risk Level', 'Status'];
        const csvData = [
          headers.join(','),
          ...filteredData.map(item => [
            item.batchId,
            item.vendor,
            item.itemType,
            item.zone,
            item.location,
            item.warrantyStatus,
            item.riskLevel,
            item.status
          ].join(','))
        ].join('\n');
        
        // Add UTF-8 BOM for Excel compatibility
        const csvWithBOM = '\uFEFF' + csvData;
        const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `inventory_export_excel_${timestamp}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        console.log('Excel export completed');
        
      } else if (format === 'json') {
        // JSON export with metadata
        const exportData = {
          exportDate: new Date().toISOString(),
          totalRecords: filteredData.length,
          appliedFilters: {
            searchTerm: searchTerm || null,
            zoneFilter: zoneFilter !== "all" ? zoneFilter : null,
            vendorFilter: vendorFilter !== "all" ? vendorFilter : null,
            warrantyFilter: warrantyFilter !== "all" ? warrantyFilter : null,
            riskFilter: riskFilter !== "all" ? riskFilter : null,
          },
          data: filteredData.map(item => ({
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
        };
        
        const jsonString = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `inventory_export_${timestamp}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        console.log('JSON export completed');
      }
      
      console.log(`Successfully exported ${filteredData.length} records as ${format.toUpperCase()}`)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-primary" />
          <span>Inventory & Tracking Portal</span>
        </CardTitle>
        <CardDescription>Interactive searchable table with advanced filters for railway track fittings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by batch ID, vendor, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={zoneFilter} onValueChange={setZoneFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Zones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="Northern Railway">Northern Railway</SelectItem>
              <SelectItem value="Western Railway">Western Railway</SelectItem>
              <SelectItem value="Eastern Railway">Eastern Railway</SelectItem>
              <SelectItem value="Southern Railway">Southern Railway</SelectItem>
              <SelectItem value="Central Railway">Central Railway</SelectItem>
            </SelectContent>
          </Select>

          <Select value={vendorFilter} onValueChange={setVendorFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Vendors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendors</SelectItem>
              <SelectItem value="Tata Steel Limited">Tata Steel Limited</SelectItem>
              <SelectItem value="JSW Steel Limited">JSW Steel Limited</SelectItem>
              <SelectItem value="Bharat Heavy Electricals">Bharat Heavy Electricals</SelectItem>
              <SelectItem value="SAIL Bhilai">SAIL Bhilai</SelectItem>
              <SelectItem value="Jindal Steel">Jindal Steel</SelectItem>
            </SelectContent>
          </Select>

          <Select value={warrantyFilter} onValueChange={setWarrantyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Warranty Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warranty</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expiring">Expiring</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>

          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {mockInventoryData.length} fittings
          </p>
          <div className="flex gap-2">
            {/* Simple test button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                alert('Button clicked!');
                handleExport('csv');
              }}
              className="hover:bg-primary/5"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hover:bg-primary/5">
                  <Download className="h-4 w-4 mr-2" />
                  More Formats
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onSelect={() => {
                    console.log('Excel export selected');
                    handleExport('excel');
                  }}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export for Excel
                  <span className="ml-auto text-xs text-muted-foreground">
                    {filteredData.length} records
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={() => {
                    console.log('JSON export selected');
                    handleExport('json');
                  }}
                >
                  <FileJson className="h-4 w-4 mr-2" />
                  Export as JSON
                  <span className="ml-auto text-xs text-muted-foreground">
                    With metadata
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Batch ID</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Item Type</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Warranty</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Scanned</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-mono font-medium">{item.batchId}</TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>{item.itemType}</TableCell>
                  <TableCell>{item.zone}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{item.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getWarrantyBadge(item.warrantyStatus)}</TableCell>
                  <TableCell>{getRiskBadge(item.riskLevel)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{new Date(item.lastScanned).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewTimeline(item)}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Timeline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No fittings found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

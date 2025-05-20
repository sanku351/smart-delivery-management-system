"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getOrderFilters, orders } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Filter, Package } from "lucide-react"
import type { Order } from "@/lib/types"
import { OrderDetails } from "@/components/order-details"
import { formatCurrency } from "@/lib/utils"

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filters, setFilters] = useState(getOrderFilters())
  const [searchTerm, setSearchTerm] = useState("")

  // Apply filters and search
  const filteredOrders = orders.filter((order) => {
    // Filter by search term
    if (
      searchTerm &&
      !order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // We're not actually filtering by status or area in this demo
    // but in a real app, you would add those filters here

    return true
  })

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleCloseDetails = () => {
    setSelectedOrder(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "assigned":
        return "bg-blue-500"
      case "picked":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="Orders" description="Manage and track all delivery orders" className="mb-0" />
      </div>

      {selectedOrder ? (
        <OrderDetails order={selectedOrder} onClose={handleCloseDetails} />
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Input
                      id="search"
                      placeholder="Order # or customer"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                    <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {filters.status.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">Area</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="area">
                      <SelectValue placeholder="All Areas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      {filters.areas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Input id="date" type="date" defaultValue={filters.date} className="pl-8" />
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order List</CardTitle>
              <CardDescription>Showing {filteredOrders.length} orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled For</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                          {order.orderNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{order.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.area}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(order.status)}`} />
                          <Badge variant="outline">
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{order.scheduledFor}</TableCell>
                      <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

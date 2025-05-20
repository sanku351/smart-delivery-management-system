// import "sonner/dist/sonner.css"
import { Toaster, toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Order } from "@/lib/types"
import { ArrowLeft, MapPin, Package, Phone, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { partners } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface OrderDetailsProps {
  order: Order
  onClose: () => void
}

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
  const [status, setStatus] = useState<Order["status"]>(order.status)
  const [assignedTo, setAssignedTo] = useState<string>(order.assignedTo || "")

  const availablePartners = partners.filter(
    (p) => p.status === "active" && p.currentLoad < 3 && p.areas.includes(order.area)
  )

  const assignedPartner = partners.find((p) => p._id === assignedTo)

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as Order["status"])
  }

  const handleAssignOrder = () => {
    if (!assignedTo) {
      toast.error("Please select a delivery partner")
      return
    }

    toast.success(`Order ${order.orderNumber} has been assigned to ${assignedPartner?.name}`)
    // TODO: API call to assign order
    setStatus("assigned")
  }

  const handleUpdateStatus = () => {
    toast(`Order ${order.orderNumber} status changed to ${status}`, {
      icon: "🔄",
    })
    // TODO: API call to update status
  }

  return (
    <>
      {/* Sonner Toaster - include once in your app root */}
      <Toaster position="top-right" />

      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onClose} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <h2 className="text-2xl font-bold">Order {order.orderNumber}</h2>
          <Badge className="ml-4" variant="outline">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>
                Created on {new Date(order.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium flex items-center mb-2">
                      <User className="h-4 w-4 mr-2" />
                      Customer Information
                    </h3>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="flex items-center text-muted-foreground">
                        <Phone className="h-3 w-3 mr-1" />
                        {order.customer.phone}
                      </p>
                      <p className="flex items-center text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {order.customer.address}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center mb-2">
                      <Package className="h-4 w-4 mr-2" />
                      Delivery Information
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-muted-foreground">Area:</span> {order.area}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Scheduled for:</span> {order.scheduledFor}
                      </p>
                      {assignedPartner && (
                        <p>
                          <span className="text-muted-foreground">Assigned to:</span> {assignedPartner.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <p>Total Amount</p>
                  <p>{formatCurrency(order.totalAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {status === "pending" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Assign to Partner</h3>
                    <Select value={assignedTo} onValueChange={setAssignedTo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a partner" />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePartners.length > 0 ? (
                          availablePartners.map((partner) => (
                            <SelectItem key={partner._id} value={partner._id!}>
                              {partner.name} ({partner.currentLoad}/3)
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            No available partners
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAssignOrder} className="w-full">
                    Assign Order
                  </Button>
                </div>
              )}

              {status !== "pending" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Update Status</h3>
                    <Select value={status} onValueChange={handleStatusChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="picked">Picked</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleUpdateStatus} className="w-full">
                    Update Status
                  </Button>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Other Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    Print Invoice
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Customer
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full">
                Cancel Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}

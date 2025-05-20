// import "sonner/dist/sonner.css"
import { Toaster, toast } from "sonner"
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { DeliveryPartner } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface PartnerFormProps {
  partner: DeliveryPartner | null
  onClose: () => void
}

const areas = ["Downtown", "Midtown", "Uptown", "Westside", "Eastside", "Southside"]

export function PartnerForm({ partner, onClose }: PartnerFormProps) {
  const [formData, setFormData] = useState<Partial<DeliveryPartner>>(
    partner || {
      name: "",
      email: "",
      phone: "",
      status: "active",
      currentLoad: 0,
      areas: [],
      shift: { start: "09:00", end: "17:00" },
      metrics: { rating: 5.0, completedOrders: 0, cancelledOrders: 0 },
    }
  )

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleShiftChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      shift: { ...prev.shift!, [field]: value },
    }))
  }

  const handleAreaToggle = (area: string) => {
    setFormData((prev) => {
      const current = prev.areas || []
      const updated = current.includes(area)
        ? current.filter((a) => a !== area)
        : [...current, area]
      return { ...prev, areas: updated }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting partner data:", formData)

    toast.success(
      partner ? `${formData.name} updated successfully.` : `${formData.name} added successfully.`
    )
    onClose()
  }

  return (
    <>
      <Toaster position="top-right" />
      <Card>
        <CardHeader>
          <CardTitle>{partner ? "Edit Partner" : "Add New Partner"}</CardTitle>
          <CardDescription>
            {partner ? "Update the delivery partner's information" : "Fill in details to add a new partner"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val) => handleChange("status", val)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shift-start">Shift Start</Label>
                <Input
                  id="shift-start"
                  type="time"
                  value={formData.shift?.start}
                  onChange={(e) => handleShiftChange("start", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift-end">Shift End</Label>
                <Input
                  id="shift-end"
                  type="time"
                  value={formData.shift?.end}
                  onChange={(e) => handleShiftChange("end", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Service Areas</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {areas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={`area-${area}`}
                      checked={formData.areas?.includes(area)}
                      onCheckedChange={() => handleAreaToggle(area)}
                    />
                    <Label htmlFor={`area-${area}`} className="font-normal">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {partner ? "Update Partner" : "Add Partner"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}

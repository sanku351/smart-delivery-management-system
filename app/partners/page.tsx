"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { getPartnerMetrics, partners } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Plus, Star, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PartnerForm } from "@/components/partner-form"
import type { DeliveryPartner } from "@/lib/types"

export default function PartnersPage() {
  const [showForm, setShowForm] = useState(false)
  const [editPartner, setEditPartner] = useState<DeliveryPartner | null>(null)
  const metrics = getPartnerMetrics()

  const handleAddPartner = () => {
    setEditPartner(null)
    setShowForm(true)
  }

  const handleEditPartner = (partner: DeliveryPartner) => {
    setEditPartner(partner)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditPartner(null)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="Delivery Partners" description="Manage your delivery partners" className="mb-0" />
        <Button onClick={handleAddPartner}>
          <Plus className="mr-2 h-4 w-4" /> Add Partner
        </Button>
      </div>

      {showForm ? (
        <PartnerForm partner={editPartner} onClose={handleCloseForm} />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Active Partners"
              value={metrics.totalActive}
              description="Currently available for delivery"
              icon={<Users className="h-4 w-4" />}
            />
            <StatCard
              title="Average Rating"
              value={metrics.avgRating}
              description="Based on customer feedback"
              icon={<Star className="h-4 w-4" />}
            />
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Top Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {metrics.topAreas.map((area) => (
                    <Badge key={area} variant="secondary">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Partner List</CardTitle>
              <CardDescription>View and manage all delivery partners</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Areas</TableHead>
                    <TableHead>Current Load</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{partner.name}</p>
                          <p className="text-sm text-muted-foreground">{partner.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={partner.status === "active" ? "default" : "secondary"}>{partner.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {partner.areas.map((area) => (
                            <Badge key={area} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-16 bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(partner.currentLoad / 3) * 100}%` }}
                            />
                          </div>
                          <span className="ml-2 text-sm">{partner.currentLoad}/3</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{partner.metrics.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {partner.shift.start} - {partner.shift.end}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditPartner(partner)}>
                          Edit
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

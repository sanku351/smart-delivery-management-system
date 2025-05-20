"use client"

// import "sonner/dist/sonner.css"
import { Toaster, toast } from "sonner"
import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import {
  assignmentMetrics,
  assignments,
  getActiveAssignments,
  getPartnerAvailability,
  orders,
  partners,
} from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, AlertTriangle, CheckCircle, Clock, Package, Truck, Users } from "lucide-react"
import { AssignmentAlgorithm } from "@/components/assignment-algorithm"

export default function AssignmentsPage() {
  const [showAlgorithm, setShowAlgorithm] = useState(false)
  const activeAssignments = getActiveAssignments()
  const partnerStats = getPartnerAvailability()

  const handleRunAssignment = () => {
    setShowAlgorithm(true)
  }

  const handleCloseAlgorithm = () => {
    setShowAlgorithm(false)
    toast.success("Smart assignment algorithm executed successfully.")
  }

  return (
    <>
      {/* Sonner Toaster - include once in app root */}
      <Toaster position="top-right" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <PageHeader title="Assignment Dashboard" description="Monitor and manage order assignments" className="mb-0" />
          <Button onClick={handleRunAssignment}>Run Smart Assignment</Button>
        </div>

        {showAlgorithm ? (
          <AssignmentAlgorithm onClose={handleCloseAlgorithm} />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              <StatCard
                title="Total Assigned"
                value={assignmentMetrics.totalAssigned}
                description="Orders assigned today"
                icon={<Package className="h-4 w-4" />}
              />
              <StatCard
                title="Success Rate"
                value={`${assignmentMetrics.successRate}%`}
                description="Assignment success rate"
                icon={<CheckCircle className="h-4 w-4" />}
                trend={{ value: 5, isPositive: true }}
              />
              <StatCard
                title="Average Time"
                value={`${assignmentMetrics.averageTime} min`}
                description="From assignment to pickup"
                icon={<Clock className="h-4 w-4" />}
              />
              <StatCard
                title="Partner Availability"
                value={`${partnerStats.available}/${partners.length}`}
                description={`${partnerStats.busy} busy, ${partnerStats.offline} offline`}
                icon={<Users className="h-4 w-4" />}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Assignments</CardTitle>
                  <CardDescription>Currently active order assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Partner</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeAssignments.length > 0 ? (
                        activeAssignments.map((assignment) => {
                          const order = orders.find((o) => o._id === assignment.orderId)
                          const partner = partners.find((p) => p._id === assignment.partnerId)

                          return (
                            <TableRow key={`${assignment.orderId}-${assignment.partnerId}`}>
                              <TableCell className="font-medium">{order?.orderNumber}</TableCell>
                              <TableCell>{partner?.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{order?.status}</Badge>
                              </TableCell>
                              <TableCell>{assignment.timestamp.toLocaleTimeString()}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">Track</Button>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-4">
                            No active assignments
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assignment Metrics</CardTitle>
                  <CardDescription>Performance analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Activity className="h-4 w-4 mr-2" />
                        Assignment Performance
                      </h3>
                      <div className="h-4 bg-secondary rounded-full">
                        <div
                          className="h-4 bg-primary rounded-full"
                          style={{ width: `${assignmentMetrics.successRate}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Failure Reasons
                      </h3>
                      <div className="space-y-2">
                        {assignmentMetrics.failureReasons.map((reason) => (
                          <div key={reason.reason} className="flex justify-between items-center">
                            <span className="text-sm">{reason.reason}</span>
                            <Badge variant="outline">{reason.count}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Partner Load Distribution
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {[0, 1, 2, 3].map((load) => {
                          const count = partners.filter((p) => p.currentLoad === load).length
                          return (
                            <div key={load} className="text-center">
                              <div className="text-sm font-medium">{load}/3</div>
                              <div className="text-xs text-muted-foreground">{count} partners</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Assignment History</CardTitle>
                <CardDescription>Recent order assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => {
                      const order = orders.find((o) => o._id === assignment.orderId)
                      const partner = partners.find((p) => p._id === assignment.partnerId)

                      return (
                        <TableRow key={`${assignment.orderId}-${assignment.partnerId}`}>
                          <TableCell className="font-medium">{order?.orderNumber}</TableCell>
                          <TableCell>{partner?.name}</TableCell>
                          <TableCell>{assignment.timestamp.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={assignment.status === "success" ? "default" : "destructive"}>
                              {assignment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{assignment.reason || "-"}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  )
}
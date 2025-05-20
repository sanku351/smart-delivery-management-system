import { BarChart3, Package, Truck, Users } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getOrdersByStatus, getPartnerAvailability, getRecentAssignments, orders, partners } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { DashboardMap } from "@/components/dashboard-map"
import { DashboardChart } from "@/components/dashboard-chart"

export default function Dashboard() {
  const orderStats = getOrdersByStatus()
  const partnerStats = getPartnerAvailability()
  const recentAssignments = getRecentAssignments()

  return (
    <div className="p-6">
      <PageHeader title="Dashboard" description="Overview of your delivery operations" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Orders"
          value={orderStats.pending + orderStats.assigned + orderStats.picked}
          description="Total orders in progress"
          icon={<Package className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Available Partners"
          value={partnerStats.available}
          description={`${partnerStats.busy} partners busy`}
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Delivered Today"
          value={orderStats.delivered}
          description="Total completed deliveries"
          icon={<Truck className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Assignment Success"
          value="85%"
          description="Last 24 hours"
          icon={<BarChart3 className="h-4 w-4" />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Active Orders Map</CardTitle>
            <CardDescription>Real-time view of orders in progress</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <DashboardMap />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Delivery Performance</CardTitle>
            <CardDescription>Orders by status over time</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
            <CardDescription>Latest order assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssignments.map((assignment) => {
                const order = orders.find((o) => o._id === assignment.orderId)
                const partner = partners.find((p) => p._id === assignment.partnerId)

                return (
                  <div
                    key={`${assignment.orderId}-${assignment.partnerId}`}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{order?.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{partner?.name}</p>
                    </div>
                    <div className="flex items-center">
                      <Badge variant={assignment.status === "success" ? "default" : "destructive"}>
                        {assignment.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground ml-2">{assignment.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Partner Availability</CardTitle>
            <CardDescription>Current status of delivery partners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partners.slice(0, 5).map((partner) => (
                <div key={partner._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">{partner.areas.join(", ")}</p>
                  </div>
                  <div className="flex items-center">
                    <Badge variant={partner.status === "active" ? "default" : "secondary"}>{partner.status}</Badge>
                    {partner.status === "active" && (
                      <p className="text-xs text-muted-foreground ml-2">Load: {partner.currentLoad}/3</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

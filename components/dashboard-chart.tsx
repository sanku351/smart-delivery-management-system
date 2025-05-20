"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Mon", pending: 4, assigned: 3, picked: 2, delivered: 8 },
  { name: "Tue", pending: 3, assigned: 2, picked: 3, delivered: 10 },
  { name: "Wed", pending: 5, assigned: 4, picked: 3, delivered: 12 },
  { name: "Thu", pending: 6, assigned: 3, picked: 4, delivered: 15 },
  { name: "Fri", pending: 8, assigned: 5, picked: 6, delivered: 18 },
  { name: "Sat", pending: 10, assigned: 7, picked: 5, delivered: 20 },
  { name: "Sun", pending: 7, assigned: 4, picked: 3, delivered: 15 },
]

export function DashboardChart() {
  return (
    <ChartContainer
      config={{
        pending: {
          label: "Pending",
          color: "hsl(var(--chart-1))",
        },
        assigned: {
          label: "Assigned",
          color: "hsl(var(--chart-2))",
        },
        picked: {
          label: "Picked",
          color: "hsl(var(--chart-3))",
        },
        delivered: {
          label: "Delivered",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[300px]"
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
        <Bar dataKey="assigned" fill="var(--color-assigned)" radius={4} />
        <Bar dataKey="picked" fill="var(--color-picked)" radius={4} />
        <Bar dataKey="delivered" fill="var(--color-delivered)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

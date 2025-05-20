import { NextRequest, NextResponse } from "next/server"
import { orders, partners } from "@/lib/data"

// PUT /api/orders/[id]/status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()

    if (!body.status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const { status } = body

    // Validate status
    if (!["pending", "assigned", "picked", "delivered"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const orderIndex = orders.findIndex((o) => o._id === id)

    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const partnerId = orders[orderIndex].assignedTo

    // Update order status
    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date(),
    }

    // If order is delivered, update partner's load and metrics
    if (status === "delivered" && partnerId) {
      const partnerIndex = partners.findIndex((p) => p._id === partnerId)

      if (partnerIndex !== -1) {
        partners[partnerIndex] = {
          ...partners[partnerIndex],
          currentLoad: Math.max(0, partners[partnerIndex].currentLoad - 1),
          metrics: {
            ...partners[partnerIndex].metrics,
            completedOrders: partners[partnerIndex].metrics.completedOrders + 1,
          },
        }
      }
    }

    return NextResponse.json({
      success: true,
      order: orders[orderIndex],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}

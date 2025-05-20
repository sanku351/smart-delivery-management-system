import { NextResponse } from "next/server"
import { orders, partners } from "@/lib/data"
import type { Assignment } from "@/lib/types"

// POST /api/assignments/run
export async function POST() {
  try {
    // Get pending orders
    const pendingOrders = orders.filter((o) => o.status === "pending")

    // Get available partners
    const availablePartners = partners.filter((p) => p.status === "active" && p.currentLoad < 3)

    const assignments: Assignment[] = []

    // For each pending order
    for (const order of pendingOrders) {
      // Find partners that cover this area
      const eligiblePartners = availablePartners.filter((p) => p.areas.includes(order.area) && p.currentLoad < 3)

      if (eligiblePartners.length === 0) {
        assignments.push({
          orderId: order._id,
          partnerId: "", // No partner found
          timestamp: new Date(),
          status: "failed",
          reason: "No available partners for this area",
        })
        continue
      }

      // Score partners based on current load, rating, and completed orders
      const scoredPartners = eligiblePartners.map((partner) => {
        // Lower load is better
        const loadScore = (3 - partner.currentLoad) * 10

        // Higher rating is better
        const ratingScore = partner.metrics.rating * 5

        // More completed orders is better (experience)
        const experienceScore = Math.min(partner.metrics.completedOrders / 10, 10)

        // Lower cancelled orders is better
        const reliabilityScore = 10 - Math.min(partner.metrics.cancelledOrders, 10)

        const totalScore = loadScore + ratingScore + experienceScore + reliabilityScore

        return {
          partner,
          score: totalScore,
        }
      })

      // Sort by score (highest first)
      scoredPartners.sort((a, b) => b.score - a.score)

      // Select the best partner
      const bestMatch = scoredPartners[0]

      // Assign order to partner
      const partnerIndex = partners.findIndex((p) => p._id === bestMatch.partner._id)
      const orderIndex = orders.findIndex((o) => o._id === order._id)

      // Update partner's load
      partners[partnerIndex].currentLoad += 1

      // Update order status
      orders[orderIndex].status = "assigned"
      orders[orderIndex].assignedTo = bestMatch.partner._id
      orders[orderIndex].updatedAt = new Date()

      // Record assignment
      assignments.push({
        orderId: order._id,
        partnerId: bestMatch.partner._id!,
        timestamp: new Date(),
        status: "success",
      })
    }

    return NextResponse.json({
      success: true,
      assignments,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to run assignment algorithm" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import type { DeliveryPartner } from "@/lib/types"
import { partners } from "@/lib/data"

// GET /api/partners
export async function GET() {
  return NextResponse.json(partners)
}

// POST /api/partners
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would save to a database
    const newPartner: DeliveryPartner = {
      _id: `p${partners.length + 1}`,
      ...body,
    }

    // Add to in-memory array (for demo purposes)
    partners.push(newPartner)

    return NextResponse.json(newPartner, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 })
  }
}

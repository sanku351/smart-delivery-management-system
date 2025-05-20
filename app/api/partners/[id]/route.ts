import { NextResponse } from "next/server"
import { partners } from "@/lib/data"

// GET /api/partners/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const partner = partners.find((p) => p._id === id)

  if (!partner) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 })
  }

  return NextResponse.json(partner)
}

// PUT /api/partners/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    const partnerIndex = partners.findIndex((p) => p._id === id)

    if (partnerIndex === -1) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 })
    }

    // Update partner (in a real app, you would update in database)
    partners[partnerIndex] = {
      ...partners[partnerIndex],
      ...body,
      _id: id, // Ensure ID doesn't change
    }

    return NextResponse.json(partners[partnerIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 })
  }
}

// DELETE /api/partners/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const partnerIndex = partners.findIndex((p) => p._id === id)

  if (partnerIndex === -1) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 })
  }

  // Remove partner (in a real app, you would delete from database)
  partners.splice(partnerIndex, 1)

  return NextResponse.json({ success: true })
}

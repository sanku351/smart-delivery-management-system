import { NextResponse } from "next/server"
import { assignmentMetrics } from "@/lib/data"

// GET /api/assignments/metrics
export async function GET() {
  return NextResponse.json(assignmentMetrics)
}

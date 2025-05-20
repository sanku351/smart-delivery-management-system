"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { orders, partners } from "@/lib/data"
import type { DeliveryPartner, Order } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Loader2 } from "lucide-react"

interface AssignmentAlgorithmProps {
  onClose: () => void
}

interface AssignmentResult {
  order: Order
  partner: DeliveryPartner | null
  score: number
  reason?: string
}

export function AssignmentAlgorithm({ onClose }: AssignmentAlgorithmProps) {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<AssignmentResult[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const pendingOrders = orders.filter((o) => o.status === "pending")
  const availablePartners = partners.filter((p) => p.status === "active" && p.currentLoad < 3)

  useEffect(() => {
    // Simulate algorithm execution
    const timer1 = setTimeout(() => {
      setStep(2)
      setProgress(30)
    }, 1500)

    const timer2 = setTimeout(() => {
      setStep(3)
      setProgress(60)

      // Generate assignment results
      const newResults = pendingOrders.map((order) => {
        // Find partners that cover this area
        const eligiblePartners = availablePartners.filter((p) => p.areas.includes(order.area))

        if (eligiblePartners.length === 0) {
          return {
            order,
            partner: null,
            score: 0,
            reason: "No partners available for this area",
          }
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

        return {
          order,
          partner: bestMatch.partner,
          score: bestMatch.score,
        }
      })

      setResults(newResults)
    }, 3000)

    const timer3 = setTimeout(() => {
      setStep(4)
      setProgress(100)
      setIsComplete(true)
    }, 4500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Assignment Algorithm</CardTitle>
        <CardDescription>
          Optimizing order assignments based on partner availability, load, and performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            {step >= 1 ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            )}
            <div>
              <p className="font-medium">Step 1: Identifying pending orders</p>
              <p className="text-sm text-muted-foreground">Found {pendingOrders.length} pending orders</p>
            </div>
          </div>

          <div className="flex items-center">
            {step >= 2 ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            )}
            <div>
              <p className="font-medium">Step 2: Evaluating partner availability</p>
              <p className="text-sm text-muted-foreground">Found {availablePartners.length} available partners</p>
            </div>
          </div>

          <div className="flex items-center">
            {step >= 3 ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            )}
            <div>
              <p className="font-medium">Step 3: Calculating optimal assignments</p>
              <p className="text-sm text-muted-foreground">Considering load, rating, and performance</p>
            </div>
          </div>

          <div className="flex items-center">
            {step >= 4 ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            )}
            <div>
              <p className="font-medium">Step 4: Finalizing assignments</p>
              <p className="text-sm text-muted-foreground">Applying assignments to orders</p>
            </div>
          </div>
        </div>

        {isComplete && (
          <div className="space-y-4 mt-6">
            <h3 className="font-medium">Assignment Results</h3>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{result.order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">{result.order.area}</p>
                  </div>
                  <div className="text-right">
                    {result.partner ? (
                      <>
                        <p className="font-medium">{result.partner.name}</p>
                        <p className="text-sm text-muted-foreground">Score: {result.score.toFixed(1)}</p>
                      </>
                    ) : (
                      <Badge variant="destructive">No match</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onClose} className="w-full" disabled={!isComplete}>
          {isComplete ? "Apply Assignments" : "Processing..."}
        </Button>
      </CardFooter>
    </Card>
  )
}

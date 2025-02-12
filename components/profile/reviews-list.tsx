import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import type { Review } from "@/types/profile"

interface ReviewsListProps {
  reviews: Review[]
  totalSales: number
}

export function ReviewsList({ reviews = [], totalSales = 0 }: ReviewsListProps) {
  // Ensure reviews is an array and has a filter method
  const safeReviews = Array.isArray(reviews) ? reviews : []

  const positiveReviews = safeReviews.filter((review) => review.rating === "positive")
  const negativeReviews = safeReviews.filter((review) => review.rating === "negative")
  const totalAmount = safeReviews.reduce((acc, review) => acc + (review.amount || 0), 0)

  const positivePercentage =
    safeReviews.length > 0 ? ((positiveReviews.length / safeReviews.length) * 100).toFixed(1) : "0.0"

  if (safeReviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reviews (0)</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">No reviews yet</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Reviews ({positiveReviews.length} positive, {negativeReviews.length} negative)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between rounded-lg bg-muted p-4">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-green-500" />
            <span className="font-medium">{positivePercentage}% Positive</span>
          </div>
          <div>Total Sales: ${totalAmount.toLocaleString()}</div>
        </div>
        <div className="space-y-4">
          {safeReviews.map((review) => (
            <div key={review.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
              {review.rating === "positive" ? (
                <ThumbsUp className="h-5 w-5 text-green-500" />
              ) : (
                <ThumbsDown className="h-5 w-5 text-red-500" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{review.reviewer}</span>
                  <span className="text-sm text-muted-foreground">${review.amount?.toLocaleString() || "0"}</span>
                </div>
                <p className="mt-1 text-sm">{review.comment}</p>
                <time className="mt-1 block text-xs text-muted-foreground">{review.date}</time>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


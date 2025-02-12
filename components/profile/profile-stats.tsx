import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingCart, ThumbsUp, Calendar } from "lucide-react"
import type { UserProfile } from "@/types/profile"

interface ProfileStatsProps {
  profile: UserProfile
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  // Ensure reviews exists and has a filter method before using it
  const reviews = profile.reviews || []
  const positiveReviews = reviews.filter((r) => r.rating === "positive").length
  const reviewPercentage = reviews.length > 0 ? (positiveReviews / reviews.length) * 100 : 0

  const formatDate = (date: string) => {
    if (!date) return "N/A"
    try {
      const monthsAgo = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 30))
      return monthsAgo === 0 ? "This month" : `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }

  return (
    <Card className="border-0 bg-slate-900">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <div className="rounded-md bg-yellow-500/20 p-2">
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="font-medium">{profile.rating?.toFixed(1) || "0.0"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="rounded-md bg-green-500/20 p-2">
              <ShoppingCart className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="font-medium">{profile.totalSales || 0}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="rounded-md bg-blue-500/20 p-2">
              <ThumbsUp className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Positive Reviews</p>
              <p className="font-medium">{reviewPercentage.toFixed(1)}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="rounded-md bg-purple-500/20 p-2">
              <Calendar className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">{formatDate(profile.registrationDate)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


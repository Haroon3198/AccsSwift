export interface Review {
  id: string
  reviewer: string
  amount: number
  rating: "positive" | "negative"
  comment: string
  date: string
}

export interface UserProfile {
  username: string
  avatar?: string
  bio: string
  rating: number
  registrationDate: string
  totalSales: number
  badges: string[]
  reviews: Review[]
}


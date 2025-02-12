export interface Listing {
  id: string
  title: string
  description: string
  price: number
  category: string
  views: number
  likes: number
  images: string[] // Changed from 'image' to 'images' array
  userId: string
  createdAt: string
  updatedAt: string
  monthlyIncome?: number
  monthlyExpense?: number
  promotion?: string
  support?: string
  incomeDetails?: string
  displayLink?: boolean
  allowComments?: boolean
  removeContacts?: boolean
}

export type CreateListingInput = Omit<Listing, "id" | "createdAt" | "updatedAt" | "userId" | "views" | "likes">
export type UpdateListingInput = Partial<CreateListingInput>


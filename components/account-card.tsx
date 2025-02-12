import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AccountCardProps {
  title: string
  subscribers: string
  niche: string
  engagement: string
  accountAge: string
  price: string
  avatar: string
}

export function AccountCard({ title, subscribers, niche, engagement, accountAge, price, avatar }: AccountCardProps) {
  return (
    <Card className="overflow-hidden bg-slate-800/50">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <img src={avatar || "/placeholder.svg"} alt={title} className="h-12 w-12 rounded-full" />
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{subscribers} subscribers</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Niche:</span>
            <span className="text-sm text-green-500">{niche}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Engagement:</span>
            <span className="text-sm text-green-500">{engagement}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Account Age:</span>
            <span className="text-sm text-white">{accountAge}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Price:</span>
            <span className="text-sm text-green-500">${price}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-800 p-4">
        <Button variant="link" className="w-full text-blue-400">
          READ MORE
        </Button>
      </CardFooter>
    </Card>
  )
}


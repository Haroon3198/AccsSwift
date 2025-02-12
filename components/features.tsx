import { ShoppingCart, DollarSign, BarChart2, Truck } from "lucide-react"

export function Features() {
  return (
    <div className="bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="flex items-center space-x-4 rounded-lg bg-slate-800/50 p-4">
            <ShoppingCart className="h-6 w-6 text-green-500" />
            <span className="text-sm text-white">Buy Instagram Account</span>
          </div>
          <div className="flex items-center space-x-4 rounded-lg bg-slate-800/50 p-4">
            <DollarSign className="h-6 w-6 text-green-500" />
            <span className="text-sm text-white">Sell Instagram Account</span>
          </div>
          <div className="flex items-center space-x-4 rounded-lg bg-slate-800/50 p-4">
            <BarChart2 className="h-6 w-6 text-green-500" />
            <span className="text-sm text-white">Transactions</span>
          </div>
          <div className="flex items-center space-x-4 rounded-lg bg-slate-800/50 p-4">
            <Truck className="h-6 w-6 text-green-500" />
            <span className="text-sm text-white">Delivery</span>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-gray-400">
          We claim Social Tradia has the safest transactions when it comes to buy Instagram account. We use several
          trusted payment gateways and back it up with solid contracts to protect both the buyer and the seller. You
          might want to consider claiming your Instagram account purchase as your marketing costs for the tax return.
          You are in good hands with our platform!
        </p>
      </div>
    </div>
  )
}


import { Trophy, Target, Calendar, TrendingUp } from 'lucide-react'

interface StatsPanelProps {
  stats: {
    completed: number
    remaining: number
    totalSolves: number
    needsReview: number
    completionRate: number
  }
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const statCards = [
    {
      icon: Trophy,
      label: 'Completed',
      value: stats.completed,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Target,
      label: 'Remaining',
      value: stats.remaining,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: TrendingUp,
      label: 'Total Solves',
      value: stats.totalSolves,
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Calendar,
      label: 'Need Review',
      value: stats.needsReview,
      color: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 animate-slide-up">
      {statCards.map((card, index) => (
        <div
          key={card.label}
          className="glass-effect rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`bg-gradient-to-r ${card.color} p-3 rounded-full w-fit mx-auto mb-4`}>
            <card.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              {card.value}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {card.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
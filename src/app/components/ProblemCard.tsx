import { CheckCircle, Clock, StickyNote, Plus } from 'lucide-react'
import { type Problem, type ProblemStats } from '../data/leetcodeData'

interface ProblemCardProps {
  problem: Problem
  stats: ProblemStats
  onMarkSolved: (problemKey: string) => void
  onOpenNoteModal: (problemKey: string) => void
}

export function ProblemCard({ problem, stats, onMarkSolved, onOpenNoteModal }: ProblemCardProps) {
  const problemKey = `${problem.number}-${problem.title}`
  const isCompleted = stats.solveCount > 0
  const needsReview = stats.solveCount > 0 && stats.solveCount < 3

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    hard: 'bg-red-100 text-red-800 border-red-200'
  }

  const cardClasses = `
    bg-white rounded-xl p-5 border-2 transition-all duration-300 hover:shadow-lg hover:scale-105
    ${isCompleted ? 'border-green-200 bg-green-50' : needsReview ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200'}
  `

  return (
    <div className={cardClasses}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-blue-600">#{problem.number}</span>
            {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
            {needsReview && <Clock className="w-4 h-4 text-yellow-500" />}
          </div>
          <h3 className="font-semibold text-gray-800 leading-tight mb-2">
            {problem.title}
          </h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
            {stats.solveCount}x solved
          </span>
          {stats.notes && (
            <StickyNote className="w-4 h-4 text-gray-500" />
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onMarkSolved(problemKey)}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-200"
            title="Mark as solved"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenNoteModal(problemKey)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
            title="Add/edit notes"
          >
            <StickyNote className="w-4 h-4" />
          </button>
        </div>
      </div>

      {stats.notes && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {stats.notes.length > 100 ? `${stats.notes.substring(0, 100)}...` : stats.notes}
          </p>
        </div>
      )}

      {stats.lastSolved && (
        <div className="mt-2 text-xs text-gray-500">
          Last solved: {new Date(stats.lastSolved).toLocaleDateString()}
        </div>
      )}
    </div>
  )
}
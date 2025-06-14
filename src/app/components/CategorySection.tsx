import { ProblemCard } from './ProblemCard'
import { type Problem, type ProblemStats, type Filters } from '../data/leetcodeData'

interface CategorySectionProps {
  categoryName: string
  problems: Problem[]
  problemStats: Record<string, ProblemStats>
  filters: Filters
  onMarkSolved: (problemKey: string) => void
  onOpenNoteModal: (problemKey: string) => void
}

export function CategorySection({
  categoryName,
  problems,
  problemStats,
  filters,
  onMarkSolved,
  onOpenNoteModal
}: CategorySectionProps) {
  const filteredProblems = problems.filter(problem => {
    const key = `${problem.number}-${problem.title}`
    const stats = problemStats[key] || { solveCount: 0 }
    const isCompleted = stats.solveCount > 0
    const needsReview = stats.solveCount > 0 && stats.solveCount < 3

    // Apply filters
    if (filters.category !== 'all' && filters.category !== categoryName) return false
    if (filters.status === 'completed' && !isCompleted) return false
    if (filters.status === 'not-completed' && isCompleted) return false
    if (filters.status === 'needs-review' && !needsReview) return false
    if (filters.difficulty !== 'all' && filters.difficulty !== problem.difficulty) return false

    return true
  })

  if (filteredProblems.length === 0) return null

  const completedCount = filteredProblems.filter(p => {
    const key = `${p.number}-${p.title}`
    return (problemStats[key]?.solveCount || 0) > 0
  }).length

  const progressPercent = (completedCount / filteredProblems.length) * 100

  return (
    <div className="glass-effect rounded-2xl p-6 shadow-lg animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">{categoryName}</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium">
            {completedCount}/{filteredProblems.length} completed
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 flex items-center justify-center"
              style={{ width: `${progressPercent}%` }}
            >
              {progressPercent > 20 && (
                <span className="text-xs text-white font-bold">
                  {Math.round(progressPercent)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProblems.map(problem => (
          <ProblemCard
            key={`${problem.number}-${problem.title}`}
            problem={problem}
            stats={problemStats[`${problem.number}-${problem.title}`] || { solveCount: 0, notes: '', lastSolved: null }}
            onMarkSolved={onMarkSolved}
            onOpenNoteModal={onOpenNoteModal}
          />
        ))}
      </div>
    </div>
  )
}
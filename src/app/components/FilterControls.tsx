import { Filter } from 'lucide-react'
import { type Filters } from '../data/leetcodeData'

interface FilterControlsProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function FilterControls({ filters, onFiltersChange }: FilterControlsProps) {
  const categories = [
    'Array / String', 'Two Pointers', 'Sliding Window', 'Prefix Sum',
    'Hash Map / Set', 'Stack', 'Queue', 'Linked List', 'Binary Tree - DFS',
    'Binary Tree - BFS', 'Binary Search Tree', 'Graphs - DFS', 'Graphs - BFS',
    'Heap / Priority Queue', 'Binary Search', 'Backtracking', 'DP - 1D',
    'DP - Multidimensional', 'Bit Manipulation', 'Trie', 'Intervals', 'Monotonic Stack'
  ]

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2 text-gray-600">
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filters:</span>
      </div>
      
      <select
        value={filters.category}
        onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
        className="px-3 py-2 bg-white/90 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
        className="px-3 py-2 bg-white/90 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="not-completed">Not Completed</option>
        <option value="needs-review">Needs Review</option>
      </select>

      <select
        value={filters.difficulty}
        onChange={(e) => onFiltersChange({ ...filters, difficulty: e.target.value })}
        className="px-3 py-2 bg-white/90 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  )
}
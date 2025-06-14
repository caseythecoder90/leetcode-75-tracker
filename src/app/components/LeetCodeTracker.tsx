'use client'

import { useState, useEffect } from 'react'
import { StatsPanel } from './StatsPanel'
import { FilterControls } from './FilterControls'
import { CategorySection } from './CategorySection'
import { NoteModal } from './NoteModal'
import { leetcodeData, type Problem, type ProblemStats, type Filters } from '../data/leetcodeData'
import { 
  Download,
  Upload,
  Shuffle
} from 'lucide-react'

export function LeetCodeTracker() {
  const [problemStats, setProblemStats] = useState<Record<string, ProblemStats>>({})
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    status: 'all',
    difficulty: 'all'
  })
  const [noteModal, setNoteModal] = useState<{
    isOpen: boolean
    problemKey: string
    currentNotes: string
  }>({
    isOpen: false,
    problemKey: '',
    currentNotes: ''
  })

  // Initialize and load data
  useEffect(() => {
    initializeProblemStats()
  }, [])

  // Save to localStorage whenever problemStats changes
  useEffect(() => {
    if (Object.keys(problemStats).length > 0) {
      localStorage.setItem('leetcode75-progress', JSON.stringify(problemStats))
    }
  }, [problemStats])

  const initializeProblemStats = () => {
    const initialStats: Record<string, ProblemStats> = {}
    
    Object.values(leetcodeData).flat().forEach(problem => {
      const key = `${problem.number}-${problem.title}`
      initialStats[key] = {
        solveCount: 0,
        notes: '',
        lastSolved: null
      }
    })

    // Load from localStorage
    const saved = localStorage.getItem('leetcode75-progress')
    if (saved) {
      try {
        const savedStats = JSON.parse(saved)
        Object.keys(initialStats).forEach(key => {
          if (savedStats[key]) {
            initialStats[key] = { ...initialStats[key], ...savedStats[key] }
          }
        })
      } catch (error) {
        console.error('Error loading saved progress:', error)
      }
    }

    setProblemStats(initialStats)
  }

  const markSolved = (problemKey: string) => {
    setProblemStats(prev => ({
      ...prev,
      [problemKey]: {
        ...prev[problemKey],
        solveCount: (prev[problemKey]?.solveCount || 0) + 1,
        lastSolved: new Date().toISOString()
      }
    }))
  }

  const saveNote = (problemKey: string, notes: string) => {
    setProblemStats(prev => ({
      ...prev,
      [problemKey]: {
        ...prev[problemKey],
        notes
      }
    }))
  }

  const openNoteModal = (problemKey: string) => {
    setNoteModal({
      isOpen: true,
      problemKey,
      currentNotes: problemStats[problemKey]?.notes || ''
    })
  }

  const closeNoteModal = () => {
    setNoteModal({ isOpen: false, problemKey: '', currentNotes: '' })
  }

  const pickRandomProblem = () => {
    const allProblems: Array<Problem & { category: string; weight: number }> = []
    
    Object.entries(leetcodeData).forEach(([category, problems]) => {
      problems.forEach(problem => {
        const key = `${problem.number}-${problem.title}`
        const stats = problemStats[key]
        const solveCount = stats?.solveCount || 0
        
        let weight = 1
        if (solveCount === 0) weight = 5
        else if (solveCount < 3) weight = 3
        else if (solveCount < 5) weight = 2
        
        allProblems.push({ ...problem, category, weight })
      })
    })

    // Weighted random selection
    const weightedProblems: typeof allProblems = []
    allProblems.forEach(problem => {
      for (let i = 0; i < problem.weight; i++) {
        weightedProblems.push(problem)
      }
    })

    const randomProblem = weightedProblems[Math.floor(Math.random() * weightedProblems.length)]
    
    alert(`🎯 Random Problem Selected!\n\n#${randomProblem.number}: ${randomProblem.title}\nCategory: ${randomProblem.category}\nDifficulty: ${randomProblem.difficulty.toUpperCase()}\n\nGood luck! 🚀`)
  }

  const exportProgress = () => {
    const exportData = {
      problemStats,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leetcode75-progress-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target?.result as string)
        if (importData.problemStats) {
          setProblemStats(importData.problemStats)
          alert('Progress imported successfully! 🎉')
        } else {
          alert('Invalid file format. Please select a valid export file.')
        }
      } catch (error) {
        alert('Error importing file. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  // Calculate statistics
  const calculateStats = () => {
    let completed = 0
    let totalSolves = 0
    let needsReview = 0
    const totalProblems = Object.values(leetcodeData).flat().length

    Object.values(problemStats).forEach(stats => {
      if (stats.solveCount > 0) completed++
      totalSolves += stats.solveCount
      if (stats.solveCount > 0 && stats.solveCount < 3) needsReview++
    })

    return {
      completed,
      remaining: totalProblems - completed,
      totalSolves,
      needsReview,
      completionRate: Math.round((completed / totalProblems) * 100)
    }
  }

  const stats = calculateStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
            🚀 LeetCode 75 Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Master coding interviews one problem at a time
          </p>
        </div>

        {/* Stats Panel */}
        <StatsPanel stats={stats} />

        {/* Action Bar */}
        <div className="glass-effect rounded-2xl p-6 mb-8 shadow-lg animate-slide-up">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <FilterControls filters={filters} onFiltersChange={setFilters} />
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={pickRandomProblem}
                className="btn-primary flex items-center gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Random Problem
              </button>
              
              <button
                onClick={exportProgress}
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              
              <label className="btn-secondary flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={importProgress}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {Object.entries(leetcodeData).map(([categoryName, problems]) => (
            <CategorySection
              key={categoryName}
              categoryName={categoryName}
              problems={problems}
              problemStats={problemStats}
              filters={filters}
              onMarkSolved={markSolved}
              onOpenNoteModal={openNoteModal}
            />
          ))}
        </div>

        {/* Note Modal */}
        <NoteModal
          isOpen={noteModal.isOpen}
          problemKey={noteModal.problemKey}
          currentNotes={noteModal.currentNotes}
          onSave={saveNote}
          onClose={closeNoteModal}
        />
      </div>
    </div>
  )
}
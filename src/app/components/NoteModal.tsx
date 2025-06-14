import { useState, useEffect } from 'react'
import { X, Save } from 'lucide-react'

interface NoteModalProps {
  isOpen: boolean
  problemKey: string
  currentNotes: string
  onSave: (problemKey: string, notes: string) => void
  onClose: () => void
}

export function NoteModal({ isOpen, problemKey, currentNotes, onSave, onClose }: NoteModalProps) {
  const [notes, setNotes] = useState('')

  useEffect(() => {
    setNotes(currentNotes)
  }, [currentNotes, isOpen])

  const handleSave = () => {
    onSave(problemKey, notes)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Add Notes
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes for Problem #{problemKey.split('-')[0]}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add your solution approach, time complexity, tips, or any other notes..."
            className="flex-1 min-h-[200px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
          <p className="text-xs text-gray-500 mt-2">
            Tip: Use Ctrl+Enter (Cmd+Enter on Mac) to save quickly
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Notes
          </button>
        </div>
      </div>
    </div>
  )
}

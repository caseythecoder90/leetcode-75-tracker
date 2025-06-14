'use client'

import { useState } from 'react'
import { Upload, Play, Code } from 'lucide-react'

interface WelcomeScreenProps {
  onStart: (importData?: Record<string, any>) => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleFileImport = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target?.result as string)
        if (importData.problemStats) {
          onStart(importData.problemStats)
        } else {
          alert('Invalid file format')
        }
      } catch {
        alert('Error reading file')
      }
    }
    reader.readAsText(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/json') {
      handleFileImport(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileImport(file)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
              <Code className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">
            LeetCode 75 Tracker
          </h1>
          <p className="text-xl text-gray-800 mb-8">
            Track your coding journey with detailed progress analytics
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Start Fresh */}
          <div className="glass-effect p-8 rounded-2xl shadow-xl animate-slide-up">
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Play className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Start Fresh
              </h3>
              <p className="text-gray-600 mb-6">
                Begin your LeetCode 75 journey from scratch with a clean slate
              </p>
              <button
                onClick={() => onStart()}
                className="btn-primary w-full"
              >
                Start New Journey
              </button>
            </div>
          </div>

          {/* Import Progress */}
          <div className="glass-effect p-8 rounded-2xl shadow-xl animate-slide-up">
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Import Progress
              </h3>
              <p className="text-gray-600 mb-6">
                Continue where you left off by importing your previous data
              </p>
              
              <div
                className={`border-2 border-dashed rounded-xl p-6 transition-all duration-200 mb-4 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400'
                }`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Drop your JSON file here or click to browse
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="btn-secondary mt-3 cursor-pointer inline-block"
                >
                  Choose File
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 animate-fade-in">
          <p className="text-gray-500 text-sm">
            Your progress is automatically saved and can be exported anytime
          </p>
        </div>
      </div>
    </div>
  )
}

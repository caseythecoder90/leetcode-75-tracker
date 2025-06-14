'use client'

import { useState, useEffect } from 'react'
import { LeetCodeTracker } from './components/LeetCodeTracker'
import { WelcomeScreen } from './components/WelcomeScreen'
export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [hasExistingData, setHasExistingData] = useState(false)

  useEffect(() => {
    // Check if user has existing progress
    const existingData = localStorage.getItem('leetcode75-progress')
    if (existingData) {
      setHasExistingData(true)
      setShowWelcome(false)
    }
  }, [])

  const handleStart = (importData?: Record<string, unknown>) => {
    if (importData) {
      localStorage.setItem('leetcode75-progress', JSON.stringify(importData))
    }
    setShowWelcome(false)
  }

  if (showWelcome && !hasExistingData) {
    return <WelcomeScreen onStart={handleStart} />
  }

  return <LeetCodeTracker />
}
'use client'

import { useState } from 'react'

export const SimpleCounter = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="my-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
      <h3 className="mb-4 text-xl font-bold">Interactive Counter Test</h3>
      <div className="text-center">
        <div className="mb-4 text-4xl font-bold text-blue-600 dark:text-blue-400">{count}</div>
        <button
          onClick={() => setCount(count + 1)}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Click me!
        </button>
      </div>
    </div>
  )
}

export const MotivationalCounter = () => {
  const [daysClean, setDaysClean] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const incrementDay = () => {
    setDaysClean((prev) => prev + 1)
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 2000)
  }

  const resetCounter = () => {
    setDaysClean(0)
  }

  return (
    <div className="my-12 rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 dark:border-purple-800 dark:from-purple-900/20 dark:to-indigo-900/20">
      <h3 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
        Your Progress Tracker
      </h3>

      <div className="mb-6 text-center">
        <div
          className={`mb-4 text-6xl font-bold transition-all duration-500 ${showCelebration ? 'scale-125 text-yellow-500' : 'text-purple-600 dark:text-purple-400'}`}
        >
          {daysClean}
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          {daysClean === 0 ? 'Ready to start?' : `Day${daysClean !== 1 ? 's' : ''} of strength`}
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={incrementDay}
          className="transform rounded-lg bg-purple-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-purple-600"
        >
          ✅ Add a Day
        </button>

        <button
          onClick={resetCounter}
          className="transform rounded-lg bg-gray-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-600"
        >
          🔄 Reset
        </button>
      </div>

      {showCelebration && (
        <div className="mt-4 animate-bounce text-center text-2xl">🎉 Another day stronger! 🎉</div>
      )}
    </div>
  )
}

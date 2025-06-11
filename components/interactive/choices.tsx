'use client'

import { useState } from 'react'

export const InteractiveChoice = () => {
  const [currentChoice, setCurrentChoice] = useState('')
  const [showResult, setShowResult] = useState(false)

  const handleChoice = (choice: string) => {
    setCurrentChoice(choice)
    setShowResult(true)
  }

  return (
    <div className="my-12 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:border-blue-800 dark:from-blue-900/20 dark:to-purple-900/20">
      <h3 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
        The Choice is Yours
      </h3>

      <div className="mb-8 text-center">
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          When temptation strikes, what will you choose?
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => handleChoice('resist')}
            className="transform rounded-lg bg-green-500 px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-lg"
          >
            💪 Resist & Grow Stronger
          </button>

          <button
            onClick={() => handleChoice('give-in')}
            className="transform rounded-lg bg-red-500 px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600 hover:shadow-lg"
          >
            😔 Give In to Temptation
          </button>
        </div>
      </div>

      {showResult && (
        <div
          className={`translate-y-0 transform rounded-lg p-6 text-center opacity-100 transition-all duration-1000 ${
            currentChoice === 'resist'
              ? 'border border-green-300 bg-green-100 dark:border-green-700 dark:bg-green-900/30'
              : 'border border-red-300 bg-red-100 dark:border-red-700 dark:bg-red-900/30'
          }`}
        >
          {currentChoice === 'resist' ? (
            <div>
              <h4 className="mb-2 text-xl font-bold text-green-800 dark:text-green-200">
                🎉 Excellent Choice!
              </h4>
              <p className="text-green-700 dark:text-green-300">
                Every time you resist, you're building mental strength. You're writing a better
                story for your future self.
              </p>
            </div>
          ) : (
            <div>
              <h4 className="mb-2 text-xl font-bold text-red-800 dark:text-red-200">
                ⚠️ Remember Your Goal
              </h4>
              <p className="text-red-700 dark:text-red-300">
                It's okay to stumble, but remember: every moment is a new chance to choose
                differently. You have the power to change the trajectory.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

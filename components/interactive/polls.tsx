'use client'

import { useState } from 'react'

export const QuickPoll = () => {
  const [votes, setVotes] = useState({ yes: 0, no: 0 })
  const [hasVoted, setHasVoted] = useState(false)

  const vote = (choice: 'yes' | 'no') => {
    if (!hasVoted) {
      setVotes((prev) => ({ ...prev, [choice]: prev[choice] + 1 }))
      setHasVoted(true)
    }
  }

  const total = votes.yes + votes.no
  const yesPercent = total > 0 ? Math.round((votes.yes / total) * 100) : 0
  const noPercent = total > 0 ? Math.round((votes.no / total) * 100) : 0

  return (
    <div className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-200">Quick Poll</h3>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Do you find interactive blog posts more engaging than regular text?
      </p>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => vote('yes')}
          disabled={hasVoted}
          className="flex-1 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Yes ({votes.yes})
        </button>
        <button
          onClick={() => vote('no')}
          disabled={hasVoted}
          className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          No ({votes.no})
        </button>
      </div>

      {hasVoted && total > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">Results:</div>
          <div className="flex h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
            <div
              className="bg-green-500 transition-all duration-500"
              style={{ width: `${yesPercent}%` }}
            />
            <div
              className="bg-red-500 transition-all duration-500"
              style={{ width: `${noPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Yes: {yesPercent}%</span>
            <span>No: {noPercent}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

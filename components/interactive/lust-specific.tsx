'use client'

import { useState, useEffect } from 'react'

// Example: Components specific to the LUST post or similar motivational content
export const LustAbbreviation = ({
  letters,
  meaning,
  quote,
  color = 'red',
}: {
  letters: string[]
  meaning: string[]
  quote: string
  color?: string
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [letterIndex, setLetterIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible && letterIndex < letters.length) {
      const timer = setTimeout(() => {
        setLetterIndex((prev) => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible, letterIndex, letters.length])

  return (
    <div
      className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} my-8 border-l-4 p-6 border-${color}-500 bg-gradient-to-r from-${color}-50 to-transparent dark:from-${color}-900/20 dark:to-transparent`}
    >
      <div className="mb-4 text-6xl font-bold tracking-wider">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-500 ${
              index < letterIndex
                ? `text-${color}-600 dark:text-${color}-400 scale-110 transform`
                : 'text-gray-300 dark:text-gray-600'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
              textShadow: index < letterIndex ? `0 0 20px rgba(220, 38, 38, 0.5)` : 'none',
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="mb-4 space-y-2">
        {meaning.map((word, index) => (
          <div
            key={index}
            className={`text-xl font-semibold transition-all duration-700 ${
              letterIndex > index
                ? `text-${color}-700 dark:text-${color}-300 translate-x-0 transform opacity-100`
                : 'translate-x-4 transform opacity-0'
            }`}
            style={{ transitionDelay: `${(index + letters.length) * 150}ms` }}
          >
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {word.charAt(0)}
            </span>
            <span className="text-lg">{word.slice(1)}</span>
          </div>
        ))}
      </div>

      <blockquote
        className={`text-lg font-medium italic transition-all duration-1000 ${
          letterIndex >= letters.length
            ? `text-${color}-800 dark:text-${color}-200 translate-y-0 transform opacity-100`
            : 'translate-y-4 transform opacity-0'
        }`}
        style={{ transitionDelay: `${(letters.length + meaning.length) * 150}ms` }}
      >
        "{quote}"
      </blockquote>
    </div>
  )
}

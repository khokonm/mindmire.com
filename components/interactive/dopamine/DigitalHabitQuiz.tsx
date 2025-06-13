'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Question {
  id: number
  text: string
  options: {
    value: number
    text: string
  }[]
}

interface Recommendation {
  score: number
  title: string
  description: string
  tips: string[]
}

const STORAGE_KEY = 'digital-habit-quiz-data'

const questions: Question[] = [
  {
    id: 1,
    text: 'How often do you check your phone within the first hour of waking up?',
    options: [
      { value: 1, text: 'Never' },
      { value: 2, text: 'Once or twice' },
      { value: 3, text: 'Several times' },
      { value: 4, text: 'Constantly' },
    ],
  },
  {
    id: 2,
    text: 'How long do you typically spend scrolling through social media in one session?',
    options: [
      { value: 1, text: 'Less than 5 minutes' },
      { value: 2, text: '5-15 minutes' },
      { value: 3, text: '15-30 minutes' },
      { value: 4, text: 'More than 30 minutes' },
    ],
  },
  {
    id: 3,
    text: 'How often do you feel anxious when you can\'t check your phone?',
    options: [
      { value: 1, text: 'Never' },
      { value: 2, text: 'Rarely' },
      { value: 3, text: 'Sometimes' },
      { value: 4, text: 'Often' },
    ],
  },
  {
    id: 4,
    text: 'How often do you use your phone during meals?',
    options: [
      { value: 1, text: 'Never' },
      { value: 2, text: 'Rarely' },
      { value: 3, text: 'Sometimes' },
      { value: 4, text: 'Always' },
    ],
  },
  {
    id: 5,
    text: 'How often do you stay up late because of your phone?',
    options: [
      { value: 1, text: 'Never' },
      { value: 2, text: 'Rarely' },
      { value: 3, text: 'Sometimes' },
      { value: 4, text: 'Often' },
    ],
  },
]

const recommendations: Recommendation[] = [
  {
    score: 5,
    title: 'Digital Minimalist',
    description: 'You have a healthy relationship with technology!',
    tips: [
      'Keep up your mindful tech usage',
      'Share your digital wellbeing practices with others',
      'Consider digital minimalism as a lifestyle choice',
    ],
  },
  {
    score: 10,
    title: 'Balanced User',
    description: 'You have a good balance, but there\'s room for improvement.',
    tips: [
      'Set specific times for checking social media',
      'Try a digital detox weekend',
      'Use app timers to monitor usage',
    ],
  },
  {
    score: 15,
    title: 'Digital Explorer',
    description: 'You might be spending too much time on digital devices.',
    tips: [
      'Turn off non-essential notifications',
      'Create tech-free zones in your home',
      'Practice the 20-20-20 rule (every 20 minutes, look 20 feet away for 20 seconds)',
    ],
  },
  {
    score: 20,
    title: 'Digital Dependent',
    description: 'Your digital habits might be affecting your wellbeing.',
    tips: [
      'Consider a complete digital detox',
      'Seek professional help if needed',
      'Replace digital activities with analog alternatives',
      'Set strict boundaries for device usage',
    ],
  },
]

export const DigitalHabitQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [lastQuizDate, setLastQuizDate] = useState<Date | null>(null)

  // Load saved quiz data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const { answers: savedAnswers, lastQuizDate: savedDate } = JSON.parse(savedData)
        setAnswers(savedAnswers)
        setLastQuizDate(new Date(savedDate))
        setShowResults(true)
      } catch (error) {
        console.error('Error loading saved quiz data:', error)
      }
    }
  }, [])

  // Save quiz data whenever answers change
  useEffect(() => {
    if (answers.length > 0) {
      const quizData = {
        answers,
        lastQuizDate: new Date().toISOString()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quizData))
    }
  }, [answers])

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      setLastQuizDate(new Date())
    }
  }

  const getRecommendation = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0)
    return recommendations.find((rec) => totalScore <= rec.score) || recommendations[recommendations.length - 1]
  }

  const resetQuiz = () => {
    if (window.confirm('Are you sure you want to reset your quiz results? This cannot be undone.')) {
      setCurrentQuestion(0)
      setAnswers([])
      setShowResults(false)
      setLastQuizDate(null)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  if (showResults) {
    const recommendation = getRecommendation()
    return (
      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Your Digital Habit Profile</h3>
            <button
              onClick={resetQuiz}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Reset Quiz
            </button>
          </div>
          
          {lastQuizDate && (
            <p className="text-sm text-gray-500">
              Last taken: {lastQuizDate.toLocaleDateString()}
            </p>
          )}
          
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-2">{recommendation.title}</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {recommendation.description}
            </p>
            
            <div className="space-y-2">
              <h5 className="font-medium">Recommendations:</h5>
              <ul className="list-disc list-inside space-y-1">
                {recommendation.tips.map((tip, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-300">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Digital Habits Quiz</h3>
      
      <div className="space-y-4">
        <div className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <p className="text-lg font-medium">
            {questions[currentQuestion].text}
          </p>

          <div className="space-y-2">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-3 text-left bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                {option.text}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
'use client'

import { useState, useEffect, useRef } from 'react'

// Component to demonstrate task expansion over time
export const TaskExpansionDemo = () => {
  const [timeAllotted, setTimeAllotted] = useState(60) // minutes
  const [taskComplexity, setTaskComplexity] = useState(1)
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [phase, setPhase] = useState('planning')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const phases = {
    planning: { name: 'Planning & Procrastination', color: 'bg-yellow-400', duration: 0.6 },
    execution: { name: 'Actual Work', color: 'bg-blue-500', duration: 0.25 },
    perfecting: { name: 'Perfecting & Polishing', color: 'bg-green-500', duration: 0.15 }
  }

  const getTaskDescription = (complexity: number) => {
    const tasks = {
      1: 'Write a simple email',
      2: 'Create a presentation',
      3: 'Design a complex report',
      4: 'Build a complete project',
      5: 'Launch a new product'
    }
    return tasks[complexity] || 'Complex task'
  }

  const resetDemo = () => {
    setIsRunning(false)
    setCurrentTime(0)
    setPhase('planning')
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const startDemo = () => {
    setIsRunning(true)
    setCurrentTime(0)
    setPhase('planning')
    
    intervalRef.current = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1
        const progress = newTime / timeAllotted
        
        if (progress <= phases.planning.duration) {
          setPhase('planning')
        } else if (progress <= phases.planning.duration + phases.execution.duration) {
          setPhase('execution')
        } else {
          setPhase('perfecting')
        }
        
        if (newTime >= timeAllotted) {
          setIsRunning(false)
          return timeAllotted
        }
        return newTime
      })
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Reset simulation when parameters change
  useEffect(() => {
    resetDemo()
  }, [timeAllotted, taskComplexity])

  const progress = (currentTime / timeAllotted) * 100

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
        🕐 Parkinson's Law in Action
      </h3>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time Allocated: {timeAllotted} minutes
          </label>
          <input
            type="range"
            min="30"
            max="240"
            value={timeAllotted}
            onChange={(e) => setTimeAllotted(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            disabled={isRunning}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Task: {getTaskDescription(taskComplexity)}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={taskComplexity}
            onChange={(e) => setTaskComplexity(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Phase: {phases[phase].name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentTime}/{timeAllotted} minutes
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700">
          <div 
            className={`h-6 rounded-full transition-all duration-300 ${phases[phase].color}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={startDemo}
          disabled={isRunning}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? 'Running...' : 'Start Demo'}
        </button>
        
        <button
          onClick={resetDemo}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
        <p>Notice how the work expands to fill the time allocated, regardless of task complexity!</p>
      </div>
    </div>
  )
}

// Interactive comparison of different time allocations
export const TimeAllocationComparison = () => {
  const scenarios = [
    { name: 'Rushed (1 hour)', time: 60, efficiency: 85, stress: 80, quality: 70 },
    { name: 'Comfortable (4 hours)', time: 240, efficiency: 60, stress: 30, quality: 80 },
    { name: 'Abundant (8 hours)', time: 480, efficiency: 25, stress: 10, quality: 75 }
  ]

  const getBarColor = (value: number, metric: string) => {
    if (metric === 'stress') {
      return value > 60 ? 'bg-red-500' : value > 30 ? 'bg-yellow-500' : 'bg-green-500'
    }
    return value > 70 ? 'bg-green-500' : value > 40 ? 'bg-yellow-500' : 'bg-red-500'
  }

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
        ⚖️ Time vs. Performance Analysis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((scenario, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
              {scenario.name}
            </h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Efficiency</span>
                  <span className="font-medium">{scenario.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                  <div 
                    className={`h-2 rounded-full ${getBarColor(scenario.efficiency, 'efficiency')}`}
                    style={{ width: `${scenario.efficiency}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Stress Level</span>
                  <span className="font-medium">{scenario.stress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                  <div 
                    className={`h-2 rounded-full ${getBarColor(scenario.stress, 'stress')}`}
                    style={{ width: `${scenario.stress}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Quality</span>
                  <span className="font-medium">{scenario.quality}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                  <div 
                    className={`h-2 rounded-full ${getBarColor(scenario.quality, 'quality')}`}
                    style={{ width: `${scenario.quality}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Key Insight:</strong> Notice how efficiency drops dramatically as time increases, 
          while quality improvements are marginal. The sweet spot is often tighter deadlines 
          with adequate buffer time.
        </p>
      </div>
    </div>
  )
}

// Interactive deadline calculator
export const DeadlineOptimizer = () => {
  const [taskType, setTaskType] = useState('email')
  const [currentTime, setCurrentTime] = useState(120) // minutes
  const [optimalTime, setOptimalTime] = useState(60)
  
  const taskTypes = {
    email: { name: 'Email/Message', baseTime: 15, multiplier: 1 },
    presentation: { name: 'Presentation', baseTime: 60, multiplier: 1.5 },
    report: { name: 'Report/Document', baseTime: 120, multiplier: 2 },
    project: { name: 'Small Project', baseTime: 480, multiplier: 3 },
    research: { name: 'Research Task', baseTime: 240, multiplier: 2.5 }
  }

  useEffect(() => {
    const task = taskTypes[taskType]
    const optimal = Math.ceil(task.baseTime * task.multiplier)
    setOptimalTime(optimal)
  }, [taskType])

  const efficiency = Math.min(100, Math.max(10, 100 - (currentTime - optimalTime) / optimalTime * 50))
  const wastedTime = Math.max(0, currentTime - optimalTime)
  const timePercentage = (wastedTime / currentTime) * 100

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
        🎯 Deadline Optimizer
      </h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Task Type
        </label>
        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {Object.entries(taskTypes).map(([key, task]) => (
            <option key={key} value={key}>{task.name}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Time Allocated: {currentTime} minutes
        </label>
        <input
          type="range"
          min={optimalTime}
          max={optimalTime * 4}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {optimalTime}min
          </div>
          <div className="text-sm text-green-800 dark:text-green-200">Optimal Time</div>
        </div>
        
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {efficiency.toFixed(0)}%
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">Efficiency</div>
        </div>
        
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {wastedTime}min
          </div>
          <div className="text-sm text-red-800 dark:text-red-200">Wasted Time</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Time Utilization</span>
          <span className="font-medium">{(100 - timePercentage).toFixed(1)}% productive</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
          <div className="h-4 bg-green-500 rounded-full" style={{ width: `${100 - timePercentage}%` }} />
        </div>
      </div>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Recommendation:</strong> {
            currentTime > optimalTime * 1.5 
              ? "Consider reducing the deadline to improve focus and efficiency."
              : currentTime < optimalTime 
                ? "This deadline might be too tight and could compromise quality."
                : "This is a well-balanced deadline that maximizes efficiency without sacrificing quality."
          }
        </p>
      </div>
    </div>
  )
}

// Real-world examples selector
export const RealWorldExamples = () => {
  const [selectedExample, setSelectedExample] = useState(0)
  
  const examples = [
    {
      title: "The Student's Essay",
      scenario: "A student has 2 weeks to write a 5-page essay",
      without: "Spends 13 days planning, researching extensively, and procrastinating. Writes the entire essay in the last day, staying up all night.",
      with: "Sets artificial deadline of 1 week. Completes research in 2 days, outlines in 1 day, writes in 3 days, and uses remaining time for editing.",
      lesson: "Shorter deadlines force prioritization and eliminate perfectionism paralysis."
    },
    {
      title: "The Meeting Trap",
      scenario: "A team needs to make a decision about project direction",
      without: "Schedules 2-hour meeting. Spends 1.5 hours on tangents, small talk, and rehashing known information. Makes decision in final 30 minutes.",
      with: "Schedules 30-minute meeting with clear agenda. Arrives with pre-work done. Makes decision efficiently with focused discussion.",
      lesson: "Shorter meetings force preparation and focus on essential decisions."
    },
    {
      title: "The Home Renovation",
      scenario: "Homeowner has 3 months to renovate kitchen before hosting holiday dinner",
      without: "Spends 2 months researching perfect materials, comparing endless options, and planning every detail. Rushes through actual work in final month.",
      with: "Sets phases: 1 month planning, 1.5 months execution, 0.5 months buffer. Sticks to 'good enough' materials and focuses on completion.",
      lesson: "Defined phases with shorter deadlines prevent analysis paralysis and ensure timely completion."
    },
    {
      title: "The Software Feature",
      scenario: "Developer needs to build a new feature for the product",
      without: "Given 1 month. Spends 3 weeks architecting the 'perfect' solution, considering every edge case. Implements basic version in final week.",
      with: "Given 1 week. Builds MVP version in 4 days, gets user feedback, iterates based on real usage patterns rather than theoretical concerns.",
      lesson: "Tight deadlines force focus on core functionality and real user needs over theoretical perfection."
    }
  ]

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
        🌍 Real-World Examples
      </h3>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setSelectedExample(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedExample === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
            Scenario
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {examples[selectedExample].scenario}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 className="font-semibold text-lg mb-2 text-red-800 dark:text-red-200">
              ❌ Without Parkinson's Law Awareness
            </h4>
            <p className="text-red-700 dark:text-red-300 text-sm">
              {examples[selectedExample].without}
            </p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-semibold text-lg mb-2 text-green-800 dark:text-green-200">
              ✅ With Parkinson's Law Awareness
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              {examples[selectedExample].with}
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-lg mb-2 text-blue-800 dark:text-blue-200">
            💡 Key Lesson
          </h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            {examples[selectedExample].lesson}
          </p>
        </div>
      </div>
    </div>
  )
}

// Quiz component to test understanding
export const ParkinsonsLawQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const questions = [
    {
      question: "What is Parkinson's Law?",
      options: [
        "Work expands to fill the time available for its completion",
        "The more time you have, the better quality work you produce",
        "Complex tasks always take longer than simple tasks",
        "Deadlines should always be set as far in advance as possible"
      ],
      correct: 0,
      explanation: "Parkinson's Law states that work expands to fill the time available for its completion, regardless of the actual complexity of the task."
    },
    {
      question: "Which scenario best demonstrates Parkinson's Law?",
      options: [
        "A complex project takes 6 months to complete",
        "A 10-minute task takes 2 hours when given 2 hours to complete it",
        "A team works overtime to meet a tight deadline",
        "A simple task is completed quickly when there's a lot of work to do"
      ],
      correct: 1,
      explanation: "When given 2 hours for a 10-minute task, people typically use the full 2 hours through overthinking, perfectionism, and procrastination."
    },
    {
      question: "What's the best way to combat Parkinson's Law?",
      options: [
        "Always give yourself plenty of time",
        "Work without any deadlines",
        "Set shorter, more realistic deadlines",
        "Only work on complex tasks"
      ],
      correct: 2,
      explanation: "Setting shorter, more realistic deadlines forces focus and eliminates time-wasting behaviors like overthinking and procrastination."
    },
    {
      question: "Why do shorter deadlines often lead to better efficiency?",
      options: [
        "They cause more stress, which improves performance",
        "They force prioritization and eliminate non-essential activities",
        "They make tasks seem less important",
        "They reduce the quality of work"
      ],
      correct: 1,
      explanation: "Shorter deadlines force you to focus on what's truly essential and eliminate time-wasting activities like excessive research or perfectionism."
    }
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100
    return (
      <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
          🎯 Quiz Complete!
        </h3>
        
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {score}/{questions.length}
          </div>
          <div className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {percentage}% Correct
          </div>
          
          <div className={`text-lg font-semibold ${
            percentage >= 75 ? 'text-green-600 dark:text-green-400' : 
            percentage >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 
            'text-red-600 dark:text-red-400'
          }`}>
            {percentage >= 75 ? '🎉 Excellent! You understand Parkinson\'s Law well!' :
             percentage >= 50 ? '👍 Good job! You have a solid grasp of the concept.' :
             '📚 Keep learning! Review the content and try again.'}
          </div>
        </div>
        
        <button
          onClick={resetQuiz}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
        >
          Take Quiz Again
        </button>
      </div>
    )
  }

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
        🧠 Test Your Understanding
      </h3>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>Score: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div 
            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {questions[currentQuestion].question}
        </h4>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                showResult
                  ? index === questions[currentQuestion].correct
                    ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-500 dark:text-green-200'
                    : index === selectedAnswer && index !== questions[currentQuestion].correct
                      ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/20 dark:border-red-500 dark:text-red-200'
                      : 'bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400'
                  : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      {showResult && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>Explanation:</strong> {questions[currentQuestion].explanation}
          </p>
        </div>
      )}
      
      {showResult && (
        <button
          onClick={nextQuestion}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  )
} 
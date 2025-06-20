'use client'

import { useState, useEffect, useMemo } from 'react'

// Component to demonstrate happiness baseline over time
export const HappinessBaselineTracker = () => {
  const [events, setEvents] = useState([
    { type: 'baseline', happiness: 5, week: 0, label: 'Normal Life' },
  ])
  const [selectedEvent, setSelectedEvent] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const eventTypes = useMemo(
    () => ({
      promotion: { impact: +3, duration: 4, label: 'Got a promotion!' },
      lottery: { impact: +4, duration: 6, label: 'Won $10,000!' },
      newcar: { impact: +2, duration: 3, label: 'Bought dream car' },
      vacation: { impact: +2, duration: 2, label: 'Amazing vacation' },
      breakup: { impact: -3, duration: 8, label: 'Bad breakup' },
      jobLoss: { impact: -4, duration: 10, label: 'Lost job' },
      injury: { impact: -2, duration: 6, label: 'Got injured' },
    }),
    []
  )

  const addEvent = (eventType: string) => {
    if (!eventType || isAnimating) return

    setIsAnimating(true)
    const event = eventTypes[eventType]
    const lastWeek = events[events.length - 1]?.week || 0
    const newWeek = lastWeek + 1

    // Add initial impact
    const newEvents = [...events]
    newEvents.push({
      type: eventType,
      happiness: 5 + event.impact,
      week: newWeek,
      label: event.label,
    })

    // Add gradual return to baseline
    for (let i = 1; i <= event.duration; i++) {
      const progress = i / event.duration
      const remainingImpact = event.impact * (1 - progress)
      newEvents.push({
        type: 'adaptation',
        happiness: 5 + remainingImpact,
        week: newWeek + i,
        label: i === event.duration ? 'Back to normal' : 'Adapting...',
      })
    }

    setEvents(newEvents)
    setSelectedEvent('')

    setTimeout(() => setIsAnimating(false), 1000)
  }

  const resetChart = () => {
    setEvents([{ type: 'baseline', happiness: 5, week: 0, label: 'Normal Life' }])
  }

  const maxWeek = Math.max(...events.map((e) => e.week)) || 20
  const chartWidth = Math.max(400, maxWeek * 20)

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
        📈 Your Happiness Over Time
      </h3>

      <div className="mb-6">
        <label
          htmlFor="event-selector"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Add a life event:
        </label>
        <div className="flex flex-wrap gap-2">
          <select
            id="event-selector"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Choose an event...</option>
            <optgroup label="Positive Events">
              <option value="promotion">Got a promotion</option>
              <option value="lottery">Won money</option>
              <option value="newcar">Bought dream car</option>
              <option value="vacation">Amazing vacation</option>
            </optgroup>
            <optgroup label="Negative Events">
              <option value="breakup">Bad breakup</option>
              <option value="jobLoss">Lost job</option>
              <option value="injury">Got injured</option>
            </optgroup>
          </select>

          <button
            onClick={() => addEvent(selectedEvent)}
            disabled={!selectedEvent || isAnimating}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            Add Event
          </button>

          <button
            onClick={resetChart}
            className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mb-4 overflow-x-auto">
        <svg
          width={chartWidth}
          height="300"
          className="rounded-lg border bg-gray-50 dark:bg-gray-700"
        >
          {/* Grid lines */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((line) => (
            <line
              key={line}
              x1="40"
              y1={40 + (line - 1) * 30}
              x2={chartWidth - 20}
              y2={40 + (line - 1) * 30}
              stroke="#e5e7eb"
              strokeDasharray="2,2"
            />
          ))}

          {/* Baseline line */}
          <line
            x1="40"
            y1="190"
            x2={chartWidth - 20}
            y2="190"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <text x="45" y="185" className="fill-red-500 text-xs">
            Baseline (5)
          </text>

          {/* Y-axis labels */}
          {[1, 3, 5, 7, 9].map((val) => (
            <text key={val} x="20" y={40 + (10 - val) * 30} className="fill-gray-600 text-xs">
              {val}
            </text>
          ))}

          {/* Data line */}
          {events.length > 1 && (
            <path
              d={events
                .map(
                  (event, i) =>
                    `${i === 0 ? 'M' : 'L'} ${50 + event.week * 20} ${40 + (10 - event.happiness) * 30}`
                )
                .join(' ')}
              stroke="#3b82f6"
              strokeWidth="3"
              fill="none"
            />
          )}

          {/* Data points */}
          {events.map((event, i) => (
            <g key={i}>
              <circle
                cx={50 + event.week * 20}
                cy={40 + (10 - event.happiness) * 30}
                r="4"
                fill={
                  event.type === 'baseline'
                    ? '#ef4444'
                    : event.happiness > 5
                      ? '#10b981'
                      : '#f59e0b'
                }
                stroke="white"
                strokeWidth="2"
              />
              {i === events.length - 1 && (
                <text
                  x={50 + event.week * 20}
                  y={25 + (10 - event.happiness) * 30}
                  className="fill-gray-700 text-xs dark:fill-gray-300"
                  textAnchor="middle"
                >
                  {event.label}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Notice:</strong> No matter how good or bad the event, your happiness always drifts
          back toward your baseline. This is hedonic adaptation in action!
        </p>
      </div>
    </div>
  )
}

// Lifestyle inflation calculator
export const LifestyleInflationCalculator = () => {
  const [income, setIncome] = useState(50000)
  const [years, setYears] = useState(1)
  const [lifestyle, setLifestyle] = useState('normal')

  const lifestyleMultipliers = useMemo(
    () => ({
      frugal: 0.6,
      normal: 0.8,
      comfortable: 1.0,
      luxury: 1.3,
    }),
    []
  )

  const calculateHappiness = (
    currentIncome: number,
    baseIncome: number,
    lifestyleLevel: string
  ) => {
    const incomeBoost = Math.log(currentIncome / baseIncome) * 20
    const adaptationPenalty =
      ((currentIncome - baseIncome) / baseIncome) * lifestyleMultipliers[lifestyleLevel] * 30
    const finalHappiness = Math.max(1, Math.min(10, 5 + incomeBoost - adaptationPenalty))
    return finalHappiness
  }

  const scenarios: { year: number; income: number; happiness: number; expenses: number }[] = []
  const baseIncome = 50000

  for (let year = 0; year <= years; year++) {
    const currentIncome = baseIncome + (income - baseIncome) * (year / years)
    const happiness = calculateHappiness(currentIncome, baseIncome, lifestyle)
    scenarios.push({
      year,
      income: currentIncome,
      happiness,
      expenses: currentIncome * lifestyleMultipliers[lifestyle],
    })
  }

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
        💰 Lifestyle Inflation Calculator
      </h3>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="income-slider"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Target Income: ${income.toLocaleString()}
          </label>
          <input
            id="income-slider"
            type="range"
            min="50000"
            max="200000"
            step="10000"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="years-slider"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Time Period: {years} year{years !== 1 ? 's' : ''}
          </label>
          <input
            id="years-slider"
            type="range"
            min="1"
            max="10"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="lifestyle-select"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Lifestyle Level
          </label>
          <select
            id="lifestyle-select"
            value={lifestyle}
            onChange={(e) => setLifestyle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="frugal">Frugal (Save 40%)</option>
            <option value="normal">Normal (Save 20%)</option>
            <option value="comfortable">Comfortable (Break even)</option>
            <option value="luxury">Luxury (Spend 130%)</option>
          </select>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${scenarios[scenarios.length - 1].income.toLocaleString()}
          </div>
          <div className="text-sm text-green-800 dark:text-green-200">Final Income</div>
        </div>

        <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {scenarios[scenarios.length - 1].happiness.toFixed(1)}/10
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">Happiness Level</div>
        </div>

        <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-900/20">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            ${scenarios[scenarios.length - 1].expenses.toLocaleString()}
          </div>
          <div className="text-sm text-purple-800 dark:text-purple-200">Annual Expenses</div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Happiness vs Income Over Time
        </h4>
        <div className="grid grid-cols-7 gap-2">
          {scenarios.slice(0, 7).map((scenario, i) => (
            <div key={i} className="text-center">
              <div className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                Year {scenario.year}
              </div>
              <div
                className="mx-auto w-4 rounded-full bg-blue-500"
                style={{ height: `${scenario.happiness * 10}px` }}
                title={`Happiness: ${scenario.happiness.toFixed(1)}/10`}
              />
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                ${Math.round(scenario.income / 1000)}k
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Key Insight:</strong>{' '}
          {lifestyle === 'luxury'
            ? 'High lifestyle inflation can actually decrease happiness despite higher income!'
            : lifestyle === 'frugal'
              ? 'Maintaining a modest lifestyle preserves the happiness boost from income increases.'
              : 'Moderate lifestyle inflation allows some enjoyment while maintaining most happiness gains.'}
        </p>
      </div>
    </div>
  )
}

// Gratitude vs hedonic adaptation comparison
export const GratitudePracticeSimulator = () => {
  const [practiceType, setPracticeType] = useState('none')
  const [duration, setDuration] = useState(30)
  const [day, setDay] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const practices = useMemo(
    () => ({
      none: { name: 'No Practice', boost: 0, maintenance: 0 },
      gratitude: { name: 'Daily Gratitude', boost: 1, maintenance: 0.8 },
      mindfulness: { name: 'Mindfulness', boost: 0.7, maintenance: 0.9 },
      exercise: { name: 'Regular Exercise', boost: 1.2, maintenance: 0.7 },
      social: { name: 'Social Connection', boost: 1.5, maintenance: 0.6 },
    }),
    []
  )

  const runSimulation = () => {
    setIsRunning(true)
    setDay(0)

    const interval = setInterval(() => {
      setDay((prev) => {
        if (prev >= duration - 1) {
          setIsRunning(false)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 100)
  }

  const resetSimulation = () => {
    setDay(0)
    setIsRunning(false)
  }

  const calculateHappiness = (currentDay: number) => {
    const practice = practices[practiceType]
    const baselineDecay = Math.max(4, 6 - currentDay * 0.05) // Natural hedonic adaptation

    if (practiceType === 'none') {
      return baselineDecay
    }

    const practiceBoost = practice.boost * (1 - Math.exp(-currentDay / 10))
    const maintenanceEffect = practice.maintenance * practiceBoost
    return Math.min(8, baselineDecay + maintenanceEffect)
  }

  const happinessData = Array.from({ length: duration }, (_, i) => ({
    day: i,
    happiness: calculateHappiness(i),
    withoutPractice: Math.max(4, 6 - i * 0.05),
  }))

  const currentHappiness = calculateHappiness(day)
  const currentWithoutPractice = Math.max(4, 6 - day * 0.05)

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
        🧘 Gratitude vs Hedonic Adaptation
      </h3>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="practice-select"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Happiness Practice
          </label>
          <select
            id="practice-select"
            value={practiceType}
            onChange={(e) => setPracticeType(e.target.value)}
            disabled={isRunning}
            className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {Object.entries(practices).map(([key, practice]) => (
              <option key={key} value={key}>
                {practice.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="duration-slider"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Simulation Length: {duration} days
          </label>
          <input
            id="duration-slider"
            type="range"
            min="30"
            max="365"
            step="30"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            disabled={isRunning}
            className="w-full"
          />
        </div>
      </div>

      <div className="mb-6 flex justify-center gap-4">
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600 disabled:opacity-50"
        >
          {isRunning ? 'Running...' : 'Start Simulation'}
        </button>

        <button
          onClick={resetSimulation}
          className="rounded-lg bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {currentHappiness.toFixed(1)}/8
          </div>
          <div className="text-sm text-green-800 dark:text-green-200">
            With {practices[practiceType].name}
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {currentWithoutPractice.toFixed(1)}/8
          </div>
          <div className="text-sm text-red-800 dark:text-red-200">Without Practice</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          Day {day} of {duration}
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-100"
            style={{ width: `${(day / duration) * 100}%` }}
          />
        </div>
      </div>

      {day > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Happiness Over Time
          </h4>
          <svg width="100%" height="200" className="rounded-lg border bg-gray-50 dark:bg-gray-700">
            {/* Grid lines */}
            {[4, 5, 6, 7, 8].map((line) => (
              <line
                key={line}
                x1="40"
                y1={40 + (8 - line) * 30}
                x2="90%"
                y2={40 + (8 - line) * 30}
                stroke="#e5e7eb"
                strokeDasharray="2,2"
              />
            ))}

            {/* Without practice line */}
            <path
              d={happinessData
                .slice(0, day + 1)
                .map(
                  (point, i) =>
                    `${i === 0 ? 'M' : 'L'} ${50 + (i / duration) * 300} ${40 + (8 - point.withoutPractice) * 30}`
                )
                .join(' ')}
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
            />

            {/* With practice line */}
            <path
              d={happinessData
                .slice(0, day + 1)
                .map(
                  (point, i) =>
                    `${i === 0 ? 'M' : 'L'} ${50 + (i / duration) * 300} ${40 + (8 - point.happiness) * 30}`
                )
                .join(' ')}
              stroke="#10b981"
              strokeWidth="3"
              fill="none"
            />

            {/* Y-axis labels */}
            {[4, 5, 6, 7, 8].map((val) => (
              <text key={val} x="20" y={45 + (8 - val) * 30} className="fill-gray-600 text-xs">
                {val}
              </text>
            ))}

            {/* Legend */}
            <g>
              <line x1="50" y1="180" x2="70" y2="180" stroke="#ef4444" strokeWidth="2" />
              <text x="75" y="185" className="fill-gray-600 text-xs">
                Without Practice
              </text>
              <line x1="200" y1="180" x2="220" y2="180" stroke="#10b981" strokeWidth="3" />
              <text x="225" y="185" className="fill-gray-600 text-xs">
                With Practice
              </text>
            </g>
          </svg>
        </div>
      )}

      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Key Finding:</strong> Regular happiness practices help maintain higher baseline
          happiness and slow hedonic adaptation. {practices[practiceType].name}{' '}
          {practiceType !== 'none'
            ? 'shows sustained benefits over time!'
            : 'demonstrates natural happiness decline.'}
        </p>
      </div>
    </div>
  )
}

// Quiz about hedonic adaptation
export const HedonicAdaptationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const questions = [
    {
      question: 'What is hedonic adaptation?',
      options: [
        'The tendency to return to a baseline level of happiness despite positive or negative events',
        'The ability to adapt to any environment and be happy',
        'A method for increasing happiness permanently',
        'The preference for certain types of pleasure over others',
      ],
      correct: 0,
      explanation:
        'Hedonic adaptation is our tendency to return to a relatively stable level of happiness despite major positive or negative life changes.',
    },
    {
      question: 'Which scenario best demonstrates hedonic adaptation?',
      options: [
        'Someone who exercises regularly stays happy',
        'A lottery winner returns to their previous happiness level after a year',
        'People in warm climates are always happier',
        'Rich people are always happier than poor people',
      ],
      correct: 1,
      explanation:
        'Lottery winners typically experience an initial boost in happiness but return to their baseline within about a year, demonstrating hedonic adaptation.',
    },
    {
      question: "What's the best way to combat hedonic adaptation?",
      options: [
        'Buy more expensive things',
        'Focus on experiences rather than material goods',
        'Avoid all negative experiences',
        'Only pursue major life changes',
      ],
      correct: 1,
      explanation:
        'Research shows that experiences provide longer-lasting happiness than material purchases because we adapt less quickly to memories and experiences.',
    },
    {
      question: 'Which practice is most effective at maintaining higher baseline happiness?',
      options: [
        'Buying new things regularly',
        'Avoiding all challenges',
        'Regular gratitude practice',
        'Seeking bigger and bigger thrills',
      ],
      correct: 2,
      explanation:
        'Gratitude practice helps maintain awareness of positive aspects of life and slows adaptation to good things we already have.',
    },
    {
      question: 'What happens with lifestyle inflation?',
      options: [
        'Higher income always leads to proportionally higher happiness',
        'People adapt to higher living standards and need more to feel the same happiness',
        'Expensive lifestyles guarantee long-term satisfaction',
        'Income has no relationship to happiness',
      ],
      correct: 1,
      explanation:
        'As we earn more and spend more, we adapt to higher living standards, requiring even more income to achieve the same happiness boost.',
    },
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

        <div className="mb-6 text-center">
          <div className="mb-2 text-6xl font-bold text-blue-600 dark:text-blue-400">
            {score}/{questions.length}
          </div>
          <div className="mb-4 text-xl text-gray-600 dark:text-gray-400">{percentage}% Correct</div>

          <div
            className={`text-lg font-semibold ${
              percentage >= 80
                ? 'text-green-600 dark:text-green-400'
                : percentage >= 60
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-red-600 dark:text-red-400'
            }`}
          >
            {percentage >= 80
              ? '🎉 Excellent! You understand hedonic adaptation well!'
              : percentage >= 60
                ? '👍 Good job! You have a solid grasp of the concept.'
                : '📚 Keep learning! Review the content and try again.'}
          </div>
        </div>

        <button
          onClick={resetQuiz}
          className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
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
        <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>
            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
          {questions[currentQuestion].question}
        </h4>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full rounded-lg border p-3 text-left transition-all ${
                showResult
                  ? index === questions[currentQuestion].correct
                    ? 'border-green-500 bg-green-100 text-green-800 dark:border-green-500 dark:bg-green-900/20 dark:text-green-200'
                    : index === selectedAnswer && index !== questions[currentQuestion].correct
                      ? 'border-red-500 bg-red-100 text-red-800 dark:border-red-500 dark:bg-red-900/20 dark:text-red-200'
                      : 'border-gray-300 bg-gray-100 text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Explanation:</strong> {questions[currentQuestion].explanation}
          </p>
        </div>
      )}

      {showResult && (
        <button
          onClick={nextQuestion}
          className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  )
}

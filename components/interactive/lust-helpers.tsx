'use client'

import { useState, useEffect } from 'react'

export const EmergencyToolkit = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const tools = [
    {
      id: 'cold-shower',
      title: '❄️ Cold Shower',
      description: 'Take a cold shower immediately. The shock will reset your system.',
      action: 'Do 50 push-ups or jumping jacks right now',
    },
    {
      id: 'call-someone',
      title: '📞 Call Someone',
      description: 'Call a trusted friend, family member, or mentor.',
      action: 'Pick up your phone and call someone you trust',
    },
    {
      id: 'go-outside',
      title: '🚶 Go Outside',
      description: 'Leave your current environment immediately.',
      action: 'Put on shoes and go for a 10-minute walk',
    },
    {
      id: 'breathe',
      title: '🫁 Breathe',
      description: 'Focus on controlled breathing to regain control.',
      action: 'Take 10 deep breaths: 4 seconds in, 4 seconds hold, 4 seconds out',
    },
  ]

  return (
    <div className="my-8 rounded-lg border-2 border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
      <div className="text-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="transform rounded-lg bg-red-600 px-8 py-4 text-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-lg"
        >
          🚨 EMERGENCY TOOLKIT 🚨
        </button>
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">
          Click when you need immediate help
        </p>
      </div>

      {isOpen && (
        <div className="mt-6 space-y-4">
          <h3 className="text-center text-xl font-bold text-red-800 dark:text-red-200">
            Choose Your Emergency Action:
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className="rounded-lg border border-red-300 bg-white p-4 text-left transition-all hover:bg-red-100 dark:border-red-700 dark:bg-red-900/50 dark:hover:bg-red-800/50"
              >
                <div className="text-lg font-bold text-red-800 dark:text-red-200">
                  {tool.title}
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">{tool.description}</div>
              </button>
            ))}
          </div>

          {selectedTool && (
            <div className="mt-6 rounded-lg bg-red-100 p-4 dark:bg-red-800/50">
              <h4 className="font-bold text-red-800 dark:text-red-200">
                ACTION REQUIRED RIGHT NOW:
              </h4>
              <p className="text-red-700 dark:text-red-300">
                {tools.find((t) => t.id === selectedTool)?.action}
              </p>
              <button
                onClick={() => setSelectedTool(null)}
                className="mt-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                ✅ Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export const ReflectionExercise = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const [isComplete, setIsComplete] = useState(false)

  const questions = [
    'What triggered this feeling? (boredom, stress, loneliness, etc.)',
    'What am I really seeking? (connection, validation, escape, etc.)',
    'What positive action can I take instead right now?',
  ]

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentStep] = answer
    setAnswers(newAnswers)
  }

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setAnswers(['', '', ''])
    setIsComplete(false)
  }

  if (isComplete) {
    return (
      <div className="my-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
        <h3 className="mb-4 text-xl font-bold text-blue-800 dark:text-blue-200">
          🎉 Reflection Complete
        </h3>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="rounded bg-white p-3 dark:bg-blue-900/50">
              <p className="font-semibold text-blue-700 dark:text-blue-300">{question}</p>
              <p className="text-blue-600 dark:text-blue-400">"{answers[index]}"</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="mb-4 text-blue-700 dark:text-blue-300">
            Now go take that positive action you identified!
          </p>
          <button
            onClick={reset}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Start New Reflection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="my-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
      <h3 className="mb-4 text-xl font-bold text-blue-800 dark:text-blue-200">
        💭 Self-Reflection Exercise
      </h3>
      <div className="mb-4">
        <div className="mb-2 flex justify-between text-sm text-blue-600 dark:text-blue-400">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="h-2 rounded-full bg-blue-200 dark:bg-blue-800">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h4 className="mb-4 text-lg font-semibold text-blue-800 dark:text-blue-200">
        {questions[currentStep]}
      </h4>

      <textarea
        value={answers[currentStep]}
        onChange={(e) => handleAnswer(e.target.value)}
        placeholder="Take your time and be honest with yourself..."
        className="mb-4 w-full rounded-lg border border-blue-300 p-3 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-100"
        rows={3}
      />

      <button
        onClick={nextStep}
        disabled={!answers[currentStep].trim()}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {currentStep < questions.length - 1 ? 'Next Question' : 'Complete Reflection'}
      </button>
    </div>
  )
}

export const HabitReplacement = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const alternatives = {
    physical: [
      '💪 Do 20 push-ups or squats',
      '🏃 Go for a run or walk',
      '🧘 Practice yoga or stretching',
      '🥊 Hit a punching bag or do shadowboxing',
      '🚿 Take a cold shower',
    ],
    creative: [
      '🎨 Draw, paint, or sketch something',
      '✍️ Write in a journal or start a story',
      '🎵 Play an instrument or create music',
      '📷 Take photos or edit existing ones',
      '🧩 Do a puzzle or brain teaser',
    ],
    social: [
      '📞 Call a friend or family member',
      '💬 Text someone you care about',
      '🤝 Help someone with a task',
      '👥 Join an online community or forum',
      '📝 Write a letter or email',
    ],
    productive: [
      '📚 Read a book or learn something new',
      '🧹 Clean and organize your space',
      '💼 Work on a personal project',
      '📋 Plan your goals for the week',
      '🍳 Cook a healthy meal',
    ],
  }

  return (
    <div className="my-8 rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
      <h3 className="mb-4 text-xl font-bold text-green-800 dark:text-green-200">
        🔄 Habit Replacement Tool
      </h3>
      <p className="mb-6 text-green-700 dark:text-green-300">
        When urges hit, redirect that energy into something positive:
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(alternatives).map(([category, items]) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(selectedCategory === category ? null : category)
            }
            className="rounded-lg border border-green-300 bg-white p-4 text-left transition-all hover:bg-green-100 dark:border-green-700 dark:bg-green-900/50 dark:hover:bg-green-800/50"
          >
            <div className="text-lg font-bold capitalize text-green-800 dark:text-green-200">
              {category} Activities
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              {items.length} options available
            </div>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-6 rounded-lg bg-green-100 p-4 dark:bg-green-800/50">
          <h4 className="mb-3 font-bold capitalize text-green-800 dark:text-green-200">
            {selectedCategory} Alternatives:
          </h4>
          <div className="space-y-2">
            {alternatives[selectedCategory as keyof typeof alternatives].map((item, index) => (
              <div
                key={index}
                className="rounded bg-white p-2 text-green-700 dark:bg-green-900/50 dark:text-green-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [count, setCount] = useState(4)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          if (phase === 'inhale') {
            setPhase('hold')
            return 4
          } else if (phase === 'hold') {
            setPhase('exhale')
            return 4
          } else {
            setPhase('inhale')
            setCycle((c) => c + 1)
            return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, phase])

  const start = () => {
    setIsActive(true)
    setCycle(0)
    setPhase('inhale')
    setCount(4)
  }

  const stop = () => {
    setIsActive(false)
    setCount(4)
    setPhase('inhale')
  }

  return (
    <div className="my-8 rounded-lg border border-purple-200 bg-purple-50 p-6 text-center dark:border-purple-800 dark:bg-purple-900/20">
      <h3 className="mb-4 text-xl font-bold text-purple-800 dark:text-purple-200">
        🫁 4-4-4 Breathing Exercise
      </h3>
      <p className="mb-6 text-purple-700 dark:text-purple-300">
        Use this when you feel overwhelmed or need to reset your mind
      </p>

      <div className="mb-6">
        <div
          className={`mx-auto h-32 w-32 rounded-full border-4 transition-all duration-1000 ${
            isActive
              ? phase === 'inhale'
                ? 'scale-110 border-blue-500 bg-blue-100 dark:bg-blue-900/50'
                : phase === 'hold'
                  ? 'scale-110 border-yellow-500 bg-yellow-100 dark:bg-yellow-900/50'
                  : 'scale-90 border-green-500 bg-green-100 dark:bg-green-900/50'
              : 'border-purple-300 bg-purple-100 dark:bg-purple-900/50'
          } flex items-center justify-center`}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">
              {count}
            </div>
            <div className="text-sm uppercase text-purple-600 dark:text-purple-400">
              {phase}
            </div>
          </div>
        </div>
      </div>

      {cycle > 0 && (
        <p className="mb-4 text-purple-700 dark:text-purple-300">
          Completed cycles: {cycle}
        </p>
      )}

      <div className="space-x-4">
        {!isActive ? (
          <button
            onClick={start}
            className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
          >
            Start Breathing
          </button>
        ) : (
          <button
            onClick={stop}
            className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  )
} 
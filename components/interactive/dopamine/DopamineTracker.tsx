'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface DopamineTrigger {
  id: string
  type: string
  intensity: number
  notes?: string
  timestamp: number
}

interface Trigger {
  id: string
  type: string
  intensity: number
  notes?: string
  timestamp: number
}

const STORAGE_KEY = 'dopamine-tracker-data'

export const DopamineTracker = () => {
  const [triggers, setTriggers] = useState<DopamineTrigger[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dopamineTriggers');
      return saved ? (JSON.parse(saved) as DopamineTrigger[]) : [];
    }
    return [];
  })
  const [isTracking, setIsTracking] = useState(false)
  const [selectedType, setSelectedType] = useState<DopamineTrigger['type']>('notification')
  const [intensity, setIntensity] = useState(5)
  const [notes, setNotes] = useState('')

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Convert string dates back to Date objects
        const triggersWithDates = parsedData.map((trigger: any) => ({
          ...trigger,
          timestamp: new Date(trigger.timestamp),
        }))
        setTriggers(triggersWithDates)
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever triggers change
  useEffect(() => {
    if (triggers.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(triggers))
    }
  }, [triggers])

  const startTracking = () => {
    setIsTracking(true)
  }

  const stopTracking = () => {
    setIsTracking(false)
  }

  const addTrigger = (trigger: Omit<Trigger, 'id'>) => {
    const newTrigger: Trigger = {
      ...trigger,
      id: Math.random().toString(36).substr(2, 9),
    }
    setTriggers([...triggers, newTrigger])
    setNotes('')
  }

  const deleteTrigger = (id: string) => {
    const updatedTriggers = triggers.filter((trigger) => trigger.id !== id)
    setTriggers(updatedTriggers)
    if (updatedTriggers.length === 0) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTriggers))
    }
  }

  const resetTracking = () => {
    if (
      window.confirm('Are you sure you want to delete all tracking data? This cannot be undone.')
    ) {
      setTriggers([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const getTypeEmoji = (type: DopamineTrigger['type']) => {
    switch (type) {
      case 'notification':
        return '🔔'
      case 'scroll':
        return '📜'
      case 'like':
        return '❤️'
      case 'message':
        return '💬'
      default:
        return '❓'
    }
  }

  const getAverageIntensity = () => {
    if (triggers.length === 0) return 0
    const sum = triggers.reduce((acc, trigger) => acc + trigger.intensity, 0)
    return (sum / triggers.length).toFixed(1)
  }

  return (
    <div className="my-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Track Your Dopamine Triggers</h3>
        {triggers.length > 0 && (
          <button onClick={resetTracking} className="text-sm text-red-600 hover:text-red-700">
            Reset All Data
          </button>
        )}
      </div>

      {!isTracking ? (
        <div className="text-center">
          <p className="mb-4">
            Ready to understand your digital habits? Start tracking your dopamine triggers for the
            next 24 hours.
          </p>
          <button
            onClick={startTracking}
            className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Start Tracking
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Add New Trigger</h4>
            <button onClick={stopTracking} className="text-sm text-red-600 hover:text-red-700">
              Stop Tracking
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="trigger-type" className="mb-1 block text-sm font-medium">
                Trigger Type
              </label>
              <select
                id="trigger-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as DopamineTrigger['type'])}
                className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="notification">Notification</option>
                <option value="scroll">Endless Scroll</option>
                <option value="like">Like/Comment</option>
                <option value="message">New Message</option>
              </select>
            </div>

            <div>
              <label htmlFor="trigger-intensity" className="mb-1 block text-sm font-medium">
                Intensity (1-10)
              </label>
              <input
                id="trigger-intensity"
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center">{intensity}</div>
            </div>
          </div>

          <div>
            <label htmlFor="trigger-notes" className="mb-1 block text-sm font-medium">
              Notes (optional)
            </label>
            <textarea
              id="trigger-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700"
              rows={2}
              placeholder="What were you doing? How did you feel?"
            />
          </div>

          <button
            onClick={() =>
              addTrigger({ type: selectedType, intensity, notes, timestamp: Date.now() })
            }
            className="w-full rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Add Trigger
          </button>
        </div>
      )}

      {triggers.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-2 font-semibold">Your Triggers</h4>
          <div className="space-y-2">
            {triggers.map((trigger) => (
              <motion.div
                key={trigger.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded bg-white p-3 shadow-sm dark:bg-gray-700"
              >
                <button
                  onClick={() => deleteTrigger(trigger.id)}
                  className="absolute top-2 right-2 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
                >
                  ×
                </button>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">
                      {getTypeEmoji(trigger.type as DopamineTrigger['type'])}
                    </span>
                    <span className="capitalize">{trigger.type}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(trigger.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                {trigger.notes && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{trigger.notes}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-4 rounded bg-gray-100 p-3 dark:bg-gray-700">
            <h5 className="mb-2 font-semibold">Insights</h5>
            <p>Average Trigger Intensity: {getAverageIntensity()}/10</p>
            <p>Total Triggers: {triggers.length}</p>
            <p>
              Most Common: {getTypeEmoji(triggers[0]?.type as DopamineTrigger['type'])}{' '}
              {triggers[0]?.type}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

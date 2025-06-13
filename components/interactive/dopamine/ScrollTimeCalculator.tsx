'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ScrollSession {
  id: string
  platform: string
  startTime: number
  endTime: number
}

const STORAGE_KEY = 'scroll-time-data'

export const ScrollTimeCalculator = () => {
  const [sessions, setSessions] = useState<ScrollSession[]>([])
  const [isTracking, setIsTracking] = useState(false)
  const [currentSession, setCurrentSession] = useState<ScrollSession | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'facebook', name: 'Facebook', icon: '👥' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'youtube', name: 'YouTube', icon: '🎥' },
    { id: 'reddit', name: 'Reddit', icon: '📱' },
  ]

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Convert string dates back to Date objects
        const sessionsWithDates = parsedData.map((session: any) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: new Date(session.endTime)
        }))
        setSessions(sessionsWithDates)
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
    }
  }, [sessions])

  const startTracking = () => {
    const newSession: ScrollSession = {
      id: Math.random().toString(36).substr(2, 9),
      startTime: new Date().getTime(),
      endTime: new Date().getTime(),
      platform: selectedPlatform,
    }
    setCurrentSession(newSession)
    setIsTracking(true)
  }

  const stopTracking = () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        endTime: new Date().getTime(),
      }
      setSessions([...sessions, updatedSession])
      setCurrentSession(null)
      setIsTracking(false)
    }
  }

  const deleteSession = (id: string) => {
    const updatedSessions = sessions.filter(session => session.id !== id)
    setSessions(updatedSessions)
    if (updatedSessions.length === 0) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions))
    }
  }

  const resetTracking = () => {
    if (window.confirm('Are you sure you want to delete all tracking data? This cannot be undone.')) {
      setSessions([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const getDuration = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime()
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  const getTotalTime = () => {
    return sessions.reduce((total, session) => {
      const diff = session.endTime - session.startTime
      return total + diff
    }, 0)
  }

  const formatTotalTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }

  const getPlatformIcon = (platformId: string) => {
    return platforms.find(p => p.id === platformId)?.icon || '📱'
  }

  const addSession = (session: Omit<ScrollSession, 'id'>) => {
    const newSession: ScrollSession = {
      ...session,
      id: Math.random().toString(36).substr(2, 9),
    }
    setSessions([...sessions, newSession])
  }

  const removeSession = (session: ScrollSession) => {
    setSessions(sessions.filter((s) => s.id !== session.id))
  }

  return (
    <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Scroll Time Tracker</h2>
        <button
          onClick={resetTracking}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Reset Data
        </button>
      </div>

      {!isTracking ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.id}>
                  {platform.icon} {platform.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={startTracking}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Start Tracking
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Currently Tracking</p>
            <p className="text-2xl mb-4">
              {getPlatformIcon(selectedPlatform)} {platforms.find(p => p.id === selectedPlatform)?.name}
            </p>
            <button
              onClick={stopTracking}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Stop Tracking
            </button>
          </div>
        </div>
      )}

      {sessions.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Your Scroll Sessions</h4>
          <div className="space-y-2">
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-white dark:bg-gray-700 rounded shadow-sm relative group"
              >
                <button
                  onClick={() => deleteSession(session.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getPlatformIcon(session.platform)}</span>
                    <span className="capitalize">
                      {platforms.find(p => p.id === session.platform)?.name}
                    </span>
                  </div>
                  <div className="text-sm">
                    {getDuration(new Date(session.startTime), new Date(session.endTime))}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(session.startTime).toLocaleTimeString()} - {new Date(session.endTime).toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
            <h5 className="font-semibold mb-2">Total Scroll Time</h5>
            <p className="text-xl">{formatTotalTime(getTotalTime())}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Across {sessions.length} session{sessions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 
"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { translations } from "@/lib/translations"

interface DogActivity {
  message: string
  icon: string
}

export function DogSchedule({ onClose }: { onClose: () => void }) {
  const [currentActivity, setCurrentActivity] = useState<DogActivity>({ message: "", icon: "🐕" })
  const animationRef = useRef<number>(0)
  const iconRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Get the current activity based on time
    const getActivityForTime = (hour: number): DogActivity => {
      if (hour >= 5 && hour < 9) {
        return { message: translations.morningWalk, icon: "🐕‍🦺" }
      } else if (hour >= 9 && hour < 12) {
        return { message: translations.preLunchNap, icon: "💤" }
      } else if (hour >= 12 && hour < 14) {
        return { message: translations.lunchTime, icon: "🍖" }
      } else if (hour >= 14 && hour < 17) {
        return { message: translations.trainingSession, icon: "🦮" }
      } else if (hour >= 17 && hour < 19) {
        return { message: translations.dinnerPrep, icon: "🍽️" }
      } else if (hour >= 19 && hour < 22) {
        return { message: translations.eveningCuddle, icon: "🐶" }
      } else {
        return { message: translations.nightRest, icon: "😴" }
      }
    }

    const now = new Date()
    const currentHour = now.getHours()
    setCurrentActivity(getActivityForTime(currentHour))

    // Simple animation for the icon
    const animateIcon = () => {
      if (iconRef.current) {
        iconRef.current.style.transform = `scale(${1 + Math.sin(Date.now() / 500) * 0.1})`
      }
      animationRef.current = requestAnimationFrame(animateIcon)
    }

    animationRef.current = requestAnimationFrame(animateIcon)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-blue-300 rounded shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-2 flex justify-between items-center">
        <h3 className="text-white text-sm font-bold">{translations.dogDailySchedule}</h3>
        <button className="text-white hover:bg-blue-600 rounded-full p-0.5" onClick={onClose}>
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 bg-[#ECE9D8]">
        <div className="text-xs font-bold mb-2">{translations.currentActivity}:</div>

        <div className="bg-white border border-blue-200 p-3 rounded flex items-center">
          <span
            ref={iconRef}
            className="text-2xl mr-3 inline-block transition-transform"
            style={{ transformOrigin: "center" }}
          >
            {currentActivity.icon}
          </span>
          <span className="text-sm">{currentActivity.message}</span>
        </div>

        <div className="mt-3 text-center">
          <div className="text-xs text-gray-500 italic">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </div>
  )
}


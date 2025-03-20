"use client"

import { useRef, useEffect } from "react"

interface DesktopShortcutProps {
  title: string
  icon: string
  onClick: () => void
}

export function DesktopShortcut({ title, icon, onClick }: DesktopShortcutProps) {
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const processingClickRef = useRef<boolean>(false)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }
    }
  }, [])

  const handleClick = () => {
    // Prevent multiple rapid clicks
    if (processingClickRef.current) {
      return
    }

    processingClickRef.current = true
    onClick()

    // Reset processing flag after a delay
    clickTimeoutRef.current = setTimeout(() => {
      processingClickRef.current = false
    }, 300)
  }

  return (
    <div className="w-20 flex flex-col items-center group cursor-pointer" onDoubleClick={handleClick}>
      <div className="text-4xl mb-1">{icon}</div>
      <div className="text-white text-xs text-center font-medium shadow-sm group-hover:text-blue-200">{title}</div>
    </div>
  )
}


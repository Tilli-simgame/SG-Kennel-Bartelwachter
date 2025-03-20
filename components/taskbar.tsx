"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { StartMenu } from "./start-menu"
import { translations } from "@/lib/translations"
import { Weather } from "./weather"
import { DogSchedule } from "./dog-schedule"
import { TaskbarContextMenu } from "./taskbar-context-menu"

interface TaskbarProps {
  windows: any[]
  activeWindowId: string | null
  onWindowSelect: (id: string) => void
  onCreateWindow: (path: string, forceCreate?: boolean) => void
  onClose: (id: string) => void
}

export function Taskbar({ windows, activeWindowId, onWindowSelect, onCreateWindow, onClose }: TaskbarProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [showDogSchedule, setShowDogSchedule] = useState(false)

  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean
    windowId: string
    position: { x: number; y: number }
  } | null>(null)

  // Long press handling
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleContextMenu = (event: React.MouseEvent, windowId: string) => {
    event.preventDefault()
    event.stopPropagation()

    setContextMenu({
      isOpen: true,
      windowId,
      position: { x: event.clientX, y: event.clientY },
    })
  }

  const handleLongPressStart = (event: React.MouseEvent | React.TouchEvent, windowId: string) => {
    // Clear any existing timeout
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current)
    }

    // Get coordinates
    const clientX = "touches" in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX
    const clientY = "touches" in event ? event.touches[0].clientY : (event as React.MouseEvent).clientY

    // Set a new timeout for long press
    longPressTimeoutRef.current = setTimeout(() => {
      console.log("Long press detected")
      setContextMenu({
        isOpen: true,
        windowId,
        position: { x: clientX, y: clientY },
      })
    }, 500) // 500ms for long press
  }

  const handleLongPressEnd = () => {
    // Clear the timeout on mouse up
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current)
      longPressTimeoutRef.current = null
    }
  }

  useEffect(() => {
    console.log("Context menu state:", contextMenu)
  }, [contextMenu])

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)
  }, [])

  const toggleStartMenu = () => {
    setIsStartMenuOpen((prev) => !prev)
  }

  const handleMenuItemClick = (menuId: string) => {
    console.log("Menu item clicked:", menuId)
    // Create a new window with the selected menu item
    onCreateWindow(menuId, true)
    // Close the start menu
    setIsStartMenuOpen(false)
  }

  const handleClockClick = () => {
    setShowDogSchedule((prev) => !prev)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-blue-800 to-blue-600 border-t border-blue-900 flex items-center justify-between px-2 z-50">
      <div className="flex items-center space-x-2">
        {/* Start button */}
        <Button
          onClick={toggleStartMenu}
          className="bg-gradient-to-t from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 text-white font-bold rounded-md h-10 px-4"
        >
          {translations.start}
        </Button>

        {/* Start menu dropdown */}
        {isStartMenuOpen && (
          <StartMenu onMenuItemClick={handleMenuItemClick} onClose={() => setIsStartMenuOpen(false)} />
        )}

        {/* Window buttons */}
        <div className="flex space-x-1">
          {windows
            .filter((w) => !w.isMinimized)
            .map((window) => (
              <button
                key={window.id}
                className={`flex items-center px-3 py-1.5 rounded-sm text-white text-sm ${
                  activeWindowId === window.id ? "bg-blue-500 shadow-inner" : "bg-blue-700 hover:bg-blue-600"
                }`}
                onClick={() => onWindowSelect(window.id)}
                onContextMenu={(e) => handleContextMenu(e, window.id)}
                onMouseDown={(e) => handleLongPressStart(e, window.id)}
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
                onTouchStart={(e) => handleLongPressStart(e, window.id)}
                onTouchEnd={handleLongPressEnd}
                onTouchCancel={handleLongPressEnd}
              >
                <span className="mr-2">{window.icon}</span>
                <span className="truncate max-w-[120px]">{window.title}</span>
              </button>
            ))}
        </div>
      </div>

      {/* System tray */}
      <div className="flex items-center space-x-2 relative">
        <Weather />
        <div
          className="bg-gradient-to-t from-blue-700 to-blue-500 px-3 py-1.5 text-white text-sm rounded-sm cursor-pointer"
          onClick={handleClockClick}
        >
          {currentTime}
        </div>

        {/* Dog Schedule Popup */}
        {showDogSchedule && <DogSchedule onClose={() => setShowDogSchedule(false)} />}
      </div>

      {/* Context Menu */}
      {contextMenu && contextMenu.isOpen && (
        <TaskbarContextMenu
          windowId={contextMenu.windowId}
          position={contextMenu.position}
          onClose={() => setContextMenu(null)}
          onCloseWindow={onClose}
        />
      )}
    </div>
  )
}


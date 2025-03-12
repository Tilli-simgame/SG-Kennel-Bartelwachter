"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { StartMenu } from "./start-menu"

interface TaskbarProps {
  windows: any[]
  activeWindowId: string | null
  onWindowSelect: (id: string) => void
  onCreateWindow: (path: string, forceCreate?: boolean) => void
}

export function Taskbar({ windows, activeWindowId, onWindowSelect, onCreateWindow }: TaskbarProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

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

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-blue-800 to-blue-600 border-t border-blue-900 flex items-center justify-between px-2 z-50">
      <div className="flex items-center space-x-2">
        {/* Start button */}
        <Button
          onClick={toggleStartMenu}
          className="bg-gradient-to-t from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 text-white font-bold rounded-md h-10 px-4"
        >
          Start
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
              >
                <span className="mr-2">{window.icon}</span>
                <span className="truncate max-w-[120px]">{window.title}</span>
              </button>
            ))}
        </div>
      </div>

      {/* System tray */}
      <div className="bg-gradient-to-t from-blue-700 to-blue-500 px-3 py-1.5 text-white text-sm rounded-sm">
        {currentTime}
      </div>
    </div>
  )
}


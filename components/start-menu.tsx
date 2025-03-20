"use client"

import { useRef, useEffect } from "react"
import { kennelStructure } from "@/data/kennel-structure"

interface StartMenuProps {
  onMenuItemClick: (menuId: string) => void
  onClose: () => void
}

export function StartMenu({ onMenuItemClick, onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleMenuItemClick = (key: string) => {
    // Call the passed function with the key
    onMenuItemClick(key)
    // Close the menu
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className="absolute bottom-14 left-2 w-80 bg-white rounded-t-md shadow-lg overflow-hidden border border-blue-900 flex flex-col"
    >
      {/* Header */}
      <div className="bg-gradient-to-t from-blue-700 to-blue-500 p-3 flex items-center">
        <div className="w-10 h-10 rounded-full bg-white overflow-hidden mr-3">
          <img src="https://placedog.net/45/48" alt="User" className="w-full h-full object-cover" />
        </div>
        <span className="text-white font-medium">Visitor</span>
      </div>

      {/* Main menu content */}
      <div className="flex flex-1">
        {/* Left side - favorites */}
        <div className="w-2/5 bg-white p-2 space-y-1">
          <button
            className="w-full text-left p-2 hover:bg-blue-600 hover:text-white rounded flex items-center"
            onClick={() => onMenuItemClick("browserApp")}
          >
            <span className="mr-3 text-lg">🌐</span>
            <div>
              <div className="font-medium text-sm">Internet</div>
              <div className="text-xs text-gray-500 group-hover:text-white">Internet Explorer</div>
            </div>
          </button>

          <button
            className="w-full text-left p-2 hover:bg-blue-600 hover:text-white rounded flex items-center"
            onClick={() => onMenuItemClick("emailApp")}
          >
            <span className="mr-3 text-lg">📧</span>
            <div>
              <div className="font-medium text-sm">E-mail</div>
              <div className="text-xs text-gray-500 group-hover:text-white">Outlook Express</div>
            </div>
          </button>

          <div className="border-t border-gray-300 my-2"></div>

          <button className="w-full text-left p-2 hover:bg-blue-600 hover:text-white rounded flex items-center">
            <span className="mr-3 text-lg">📂</span>
            <span>All Programs</span>
          </button>
        </div>

        {/* Right side - main menu items */}
        <div className="w-3/5 bg-blue-50 p-2 space-y-1">
          {Object.entries(kennelStructure)
            .filter(([key]) => key !== "emailApp" && key !== "browserApp") // Filter out both email and browser
            .map(([key, item]) => (
              <button
                key={key}
                className="w-full text-left p-2 hover:bg-blue-600 hover:text-white rounded flex items-center"
                onClick={() => handleMenuItemClick(key)}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}

          <div className="border-t border-gray-300 my-2"></div>

          <button className="w-full text-left p-2 hover:bg-blue-600 hover:text-white rounded flex items-center">
            <span className="mr-3 text-lg">❓</span>
            <span>Help and Support</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-t from-blue-700 to-blue-500 p-2">
        <button className="flex items-center text-white hover:bg-blue-400 hover:bg-opacity-30 p-1 rounded">
          <span className="mr-2">🔒</span>
          <span>Log Off</span>
        </button>
      </div>
    </div>
  )
}


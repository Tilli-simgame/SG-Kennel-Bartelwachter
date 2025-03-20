"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { translations } from "@/lib/translations"

interface TaskbarContextMenuProps {
  windowId: string
  position: { x: number; y: number }
  onClose: () => void
  onCloseWindow: (id: string) => void
}

export function TaskbarContextMenu({ windowId, position, onClose, onCloseWindow }: TaskbarContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Add event listener with a slight delay to prevent immediate closing
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="fixed z-[100] bg-white border border-gray-300 shadow-md rounded-sm overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 50}px`, // Position above the taskbar
        minWidth: "120px",
      }}
    >
      <div className="py-1">
        <button
          className="w-full text-left px-4 py-1 text-sm hover:bg-blue-600 hover:text-white flex items-center"
          onClick={() => {
            onCloseWindow(windowId)
            onClose()
          }}
        >
          <X className="h-4 w-4 mr-2" />
          {translations.close}
        </button>
      </div>
    </div>
  )
}


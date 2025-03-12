"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Square, X } from "lucide-react"

interface WindowProps {
  id: string
  title: string
  icon: string
  isActive: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  path?: string
  children: React.ReactNode
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onPositionChange: (position: { x: number; y: number }) => void
}

export function Window({
  id,
  title,
  icon,
  isActive,
  isMinimized,
  isMaximized,
  position,
  path,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (isMaximized) return

      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // Constrain to viewport
      const maxX = window.innerWidth - (windowRef.current?.offsetWidth || 0)
      const maxY = window.innerHeight - (windowRef.current?.offsetHeight || 0)

      const constrainedX = Math.max(0, Math.min(newX, maxX))
      const constrainedY = Math.max(0, Math.min(newY, maxY))

      onPositionChange({ x: constrainedX, y: constrainedY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, isMaximized, onPositionChange])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return

    // Only start dragging from the header
    if ((e.target as HTMLElement).closest(".window-header")) {
      setIsDragging(true)
      onFocus()

      const rect = windowRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
  }

  if (isMinimized) {
    return null
  }

  // Add this check in the Window component's render method
  const isPhotoViewer = path?.includes("Photos") && window.type === "file"
  const isAddressBook = path?.includes("contactInfo") || path?.includes("contact")
  const isMessenger = path === "communityHub" || path?.includes("guestBook")

  return (
    <div
      ref={windowRef}
      className={`absolute ${isMaximized ? "inset-0 pt-0" : ""} transition-shadow duration-200 ${
        isActive ? "z-20 shadow-lg" : "z-10 shadow"
      }`}
      style={isMaximized ? { top: 0, left: 0, right: 0, bottom: "3.5rem" } : { top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
    >
      <Card
        className={`border ${isActive ? "border-blue-500" : "border-gray-300"} overflow-hidden ${
          isMaximized
            ? "w-full h-full rounded-none"
            : isPhotoViewer
              ? "w-[800px] h-[600px] rounded-md" // Photo viewer dimensions
              : isAddressBook
                ? "w-[800px] h-[500px] rounded-md" // Address book dimensions
                : isMessenger
                  ? "w-[800px] h-[600px] rounded-md" // Messenger dimensions
                  : "w-[600px] rounded-md"
        }`}
      >
        <CardHeader className="window-header p-0 flex flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 cursor-move">
          <CardTitle className="flex items-center text-white text-sm font-medium p-2">
            <span className="mr-2">{icon}</span>
            {title}
          </CardTitle>
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-blue-600 rounded-none"
              onClick={onMinimize}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-blue-600 rounded-none"
              onClick={onMaximize}
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-red-500 rounded-none"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Menu bar */}
        <div className="bg-gray-100 border-b border-gray-300 px-2 py-1">
          <div className="flex space-x-4 text-xs text-gray-600">
            <span className="cursor-default">File</span>
            <span className="cursor-default">Edit</span>
            <span className="cursor-default">View</span>
            <span className="cursor-default">Help</span>
          </div>
        </div>

        <CardContent className="p-0 bg-white h-[400px] overflow-auto">{children}</CardContent>
      </Card>
    </div>
  )
}


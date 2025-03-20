"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Square, X } from "lucide-react"
import { translations } from "@/lib/translations"
import { useMobile } from "@/hooks/use-mobile"

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
  isChatWindow?: boolean
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
  isChatWindow = false,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (isMaximized) return

      // Handle both mouse and touch events
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX
      const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY

      const newX = clientX - dragOffset.x
      const newY = clientY - dragOffset.y

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

    // Add both mouse and touch event listeners
    document.addEventListener("mousemove", handleMouseMove as EventListener)
    document.addEventListener("touchmove", handleMouseMove as EventListener, { passive: false })
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchend", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove as EventListener)
      document.removeEventListener("touchmove", handleMouseMove as EventListener)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging, dragOffset, isMaximized, onPositionChange])

  // Update the handleMouseDown function to allow dragging on mobile when not maximized
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only prevent dragging if the window is maximized
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

  // Check window type to determine dimensions and styling
  const isPhotoViewer = path?.includes("Photos") && window.type === "file"
  const isAddressBook = path?.includes("contactInfo") || path?.includes("contact")
  const isMessenger = path === "communityHub"

  // Special handling for chat windows on mobile

  return (
    <div
      ref={windowRef}
      className={`absolute ${isMaximized && !isChatWindow ? "inset-0" : ""} transition-shadow duration-200 ${
        isActive ? "z-20 shadow-lg" : "z-10 shadow"
      }`}
      style={
        isMaximized && !isChatWindow
          ? {
              top: 0,
              left: 0,
              right: 0,
              bottom: "3.5rem", // Ensure it doesn't extend below the taskbar
            }
          : { top: position.y, left: position.x }
      }
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => {
        // Convert touch event to mouse event format for our handler
        const touch = e.touches[0]
        handleMouseDown({
          ...e,
          clientX: touch.clientX,
          clientY: touch.clientY,
          target: touch.target,
        } as unknown as React.MouseEvent<HTMLDivElement>)
      }}
    >
      <Card
        className={`border ${isActive ? "border-blue-500" : "border-gray-300"} overflow-hidden flex flex-col ${
          isMaximized && !isChatWindow
            ? "w-full h-full rounded-none"
            : isPhotoViewer
              ? "w-[800px] h-[600px] rounded-md" // Photo viewer dimensions
              : isAddressBook
                ? "w-[800px] h-[500px] rounded-md" // Address book dimensions
                : isMessenger
                  ? "w-[350px] h-[500px] rounded-md" // Contact list dimensions
                  : isChatWindow
                    ? "w-[400px] h-[500px] rounded-t-md rounded-b-sm" // Classic MSN dimensions
                    : "w-[600px] rounded-md"
        }`}
      >
        <CardHeader
          className={`window-header p-0 flex flex-row items-center justify-between ${
            isChatWindow ? "bg-gradient-to-r from-[#0055E5] to-[#0055E5]" : "bg-gradient-to-r from-blue-600 to-blue-500"
          } cursor-move shrink-0 sticky top-0 z-10`}
        >
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
              title={translations.minimize}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-blue-600 rounded-none"
              onClick={onMaximize}
              title={translations.maximize}
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-red-500 rounded-none"
              onClick={onClose}
              title={translations.close}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Menu bar - only show for non-chat windows */}
        {!isChatWindow && (
          <div className="bg-gray-100 border-b border-gray-300 px-2 py-1 shrink-0 sticky top-8 z-10">
            <div className="flex space-x-4 text-xs text-gray-600">
              <span className="cursor-default">{translations.file}</span>
              <span className="cursor-default">{translations.edit}</span>
              <span className="cursor-default">{translations.view}</span>
              <span className="cursor-default">{translations.help}</span>
            </div>
          </div>
        )}

        <CardContent className="p-0 bg-white flex-grow overflow-auto">{children}</CardContent>
      </Card>
    </div>
  )
}


"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface StickyNoteProps {
  title: string
  content: string
  position: { x: number; y: number }
  color?: string
}

const COLORS = {
  yellow: "#fff740",
  salmon: "#ffa07a",
  green: "#98fb98",
  blue: "#87cefa",
  purple: "#dda0dd",
  pink: "#ffb6c1",
  orange: "#ffa500",
  white: "#ffffff",
  grey: "#d3d3d3",
}

export function StickyNote({ title, content, position, color = "yellow" }: StickyNoteProps) {
  const [pos, setPos] = useState(position)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const noteRef = useRef<HTMLDivElement>(null)

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // Constrain to viewport
      const maxX = window.innerWidth - (noteRef.current?.offsetWidth || 0)
      const maxY = window.innerHeight - (noteRef.current?.offsetHeight || 0)

      const constrainedX = Math.max(0, Math.min(newX, maxX))
      const constrainedY = Math.max(0, Math.min(newY, maxY))

      setPos({ x: constrainedX, y: constrainedY })
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
  }, [isDragging, dragOffset])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only start dragging from the header
    if ((e.target as HTMLElement).closest(".sticky-header")) {
      setIsDragging(true)

      const rect = noteRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
  }

  const bgColor = COLORS[color as keyof typeof COLORS] || color

  return (
    <div
      ref={noteRef}
      className="absolute w-48 h-36 rounded shadow-md flex flex-col z-10"
      style={{
        top: pos.y,
        left: pos.x,
        backgroundColor: bgColor,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="sticky-header flex justify-between items-center p-2 border-b border-black border-opacity-10 cursor-move">
        <div className="font-medium text-sm">{title}</div>
        <button className="text-black text-opacity-50 hover:text-opacity-100" onClick={() => noteRef.current?.remove()}>
          ×
        </button>
      </div>
      <div className="p-2 text-xs overflow-auto flex-grow">{content}</div>
    </div>
  )
}


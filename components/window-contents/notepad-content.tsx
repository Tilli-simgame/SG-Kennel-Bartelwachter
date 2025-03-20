"use client"

import { useMobile } from "@/hooks/use-mobile"

interface NotepadContentProps {
  title: string
}

export function NotepadContent({ title }: NotepadContentProps) {
  const isMobile = useMobile()

  return (
    <div className={`p-4 h-full ${isMobile ? "pb-4" : ""}`}>
      <textarea
        className="w-full h-full p-2 border border-gray-300 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        defaultValue={`This is the content of ${title}. 
You can edit this text.

This file was created in our kennel management system.`}
      />
    </div>
  )
}


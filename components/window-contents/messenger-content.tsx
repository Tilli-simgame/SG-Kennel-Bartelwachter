"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  isCurrentUser: boolean
}

interface MessengerContentProps {
  path: string
  contactId?: string
  contactName?: string
}

// Message storage to persist messages between window opens
const messageStore: Record<string, Message[]> = {}

export function MessengerContent({ path, contactId = "1", contactName = "Sarah Johnson" }: MessengerContentProps) {
  const [newMessage, setNewMessage] = useState("")
  const [showEmoticons, setShowEmoticons] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isMobile = useMobile()

  // Common emoticons for MSN Messenger era
  const emoticons = ["😊", "😢", "😃", "😛", "😉", "😮", "😐", "😘", "❤️", "👍", "👎"]

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8]">
      {/* Menu bar */}
      <div className="bg-[#ECE9D8] border-b border-[#ACA899] px-2 py-1">
        <div className="flex space-x-4 text-xs text-[#000000]">
          <span className="cursor-default">File</span>
          <span className="cursor-default">Edit</span>
          <span className="cursor-default">Actions</span>
          <span className="cursor-default">Tools</span>
          <span className="cursor-default">Help</span>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-grow p-3 space-x-3">
        <div className="flex-grow flex flex-col bg-white border border-[#ACA899] rounded">
          {/* To: field */}
          <div className="p-2 border-b border-[#ACA899]">
            <div className="flex items-center">
              <span className="text-xs mr-2">To:</span>
              <span className="text-xs font-bold">{contactName}</span>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-grow p-2 overflow-auto">{/* Messages would go here */}</div>

          {/* Input area */}
          <div className="border-t border-[#ACA899]">
            {/* Formatting toolbar */}
            <div className="flex items-center px-2 py-1 bg-[#EBF4FA] border-b border-[#ACA899]">
              <button className="px-1 hover:bg-[#D7E7F5] rounded">
                <span className="font-bold text-xs">A</span>
              </button>
              {emoticons.slice(0, 6).map((emoji, index) => (
                <button
                  key={index}
                  className="px-1 hover:bg-[#D7E7F5] rounded text-lg"
                  onClick={() => {
                    if (inputRef.current) {
                      const start = inputRef.current.selectionStart || 0
                      const end = inputRef.current.selectionEnd || 0
                      setNewMessage(newMessage.substring(0, start) + emoji + newMessage.substring(end))
                      inputRef.current.focus()
                    }
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Text input */}
            <div className="p-2 flex">
              <textarea
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow resize-none border border-[#ACA899] p-1 text-sm h-16 focus:outline-none"
                placeholder="Type a message"
              />
              <div className="ml-2 flex flex-col justify-between">
                <Button className="w-16 bg-[#ECE9D8] border border-[#ACA899] hover:bg-[#D7E7F5] text-black text-xs h-7">
                  Send
                </Button>
                <Button className="w-16 bg-[#ECE9D8] border border-[#ACA899] hover:bg-[#D7E7F5] text-black text-xs h-7">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar with contact info */}
        <div className="w-32 flex flex-col space-y-2">
          <div className="bg-white border border-[#ACA899] p-2 rounded">
            <img
              src="/placeholder.svg?height=96&width=96"
              alt={contactName}
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="bg-white border border-[#ACA899] p-2 rounded">
            <img
              src="/placeholder.svg?height=96&width=96&text=Display+Picture"
              alt="Your display picture"
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-[#ECE9D8] border-t border-[#ACA899] p-1">
        <div className="text-xs text-[#000000]">Click for new Emoticons and Theme Packs from Blue Mountain</div>
      </div>
    </div>
  )
}


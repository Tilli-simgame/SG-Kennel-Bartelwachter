"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Paperclip, Image, Phone, Video, UserPlus, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  isCurrentUser: boolean
}

interface Contact {
  id: string
  name: string
  status: "online" | "away" | "busy" | "offline"
  avatar: string
  lastSeen?: Date
}

interface MessengerContentProps {
  path: string
}

// Sample contacts data
const sampleContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    status: "online",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "2",
    name: "Michael Brown",
    status: "away",
    avatar: "/placeholder.svg?height=48&width=48",
    lastSeen: new Date(Date.now() - 15 * 60000),
  },
  {
    id: "3",
    name: "Emily Davis",
    status: "busy",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "4",
    name: "Robert Wilson",
    status: "offline",
    avatar: "/placeholder.svg?height=48&width=48",
    lastSeen: new Date(Date.now() - 2 * 3600000),
  },
  {
    id: "5",
    name: "Jennifer Taylor",
    status: "online",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "6",
    name: "David Miller",
    status: "offline",
    avatar: "/placeholder.svg?height=48&width=48",
    lastSeen: new Date(Date.now() - 24 * 3600000),
  },
]

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    content: "Hi there! Welcome to our kennel community hub!",
    timestamp: new Date(Date.now() - 3600000),
    isCurrentUser: false,
  },
  {
    id: "2",
    sender: "Sarah Johnson",
    content: "Feel free to ask any questions about our dogs or services.",
    timestamp: new Date(Date.now() - 3590000),
    isCurrentUser: false,
  },
  {
    id: "3",
    sender: "Visitor",
    content: "Thanks! I'm interested in your German Shepherd puppies.",
    timestamp: new Date(Date.now() - 3500000),
    isCurrentUser: true,
  },
  {
    id: "4",
    sender: "Sarah Johnson",
    content: "Great choice! We have a new litter that will be ready in about 4 weeks.",
    timestamp: new Date(Date.now() - 3400000),
    isCurrentUser: false,
  },
]

export function MessengerContent({ path }: MessengerContentProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [currentContact, setCurrentContact] = useState<Contact>(sampleContacts[0])
  const [userStatus, setUserStatus] = useState<"online" | "away" | "busy" | "offline">("online")
  const [showEmoticons, setShowEmoticons] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: "Visitor",
      content: newMessage,
      timestamp: new Date(),
      isCurrentUser: true,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate response after a short delay
    setTimeout(() => {
      const responses = [
        "Thanks for your message!",
        "I'll get back to you on that soon.",
        "That's great to hear!",
        "Would you like to schedule a visit to see our dogs?",
        "We have several options available for that.",
        "Our trainers would be happy to help with that.",
      ]

      const responseMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: currentContact.name,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isCurrentUser: false,
      }

      setMessages((prev) => [...prev, responseMessage])
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return "🟢"
      case "away":
        return "🟠"
      case "busy":
        return "🔴"
      case "offline":
        return "⚪"
      default:
        return "⚪"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "away":
        return "Away"
      case "busy":
        return "Busy"
      case "offline":
        return "Offline"
      default:
        return "Offline"
    }
  }

  // Common emoticons for MSN Messenger era
  const emoticons = [
    { code: ":)", emoji: "😊" },
    { code: ":(", emoji: "😢" },
    { code: ":D", emoji: "😃" },
    { code: ":P", emoji: "😛" },
    { code: ";)", emoji: "😉" },
    { code: ":O", emoji: "😮" },
    { code: ":|", emoji: "😐" },
    { code: ":*", emoji: "😘" },
    { code: "<3", emoji: "❤️" },
    { code: "(Y)", emoji: "👍" },
    { code: "(N)", emoji: "👎" },
    { code: ":-|", emoji: "😑" },
  ]

  return (
    <div className="flex h-full bg-[#E8F1F8]">
      {/* Left sidebar - Contacts */}
      <div className="w-1/4 border-r border-[#B8D6FB] flex flex-col">
        {/* User info */}
        <div className="bg-[#CCE4FF] p-2 border-b border-[#B8D6FB]">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-[#0066CC] text-white flex items-center justify-center text-lg font-bold mr-2">
              V
            </div>
            <div>
              <div className="text-sm font-bold">Visitor</div>
              <div className="flex items-center text-xs">
                <span className="mr-1">{getStatusIcon(userStatus)}</span>
                <select
                  value={userStatus}
                  onChange={(e) => setUserStatus(e.target.value as any)}
                  className="bg-transparent border-none text-xs p-0 outline-none cursor-pointer"
                >
                  <option value="online">Online</option>
                  <option value="away">Away</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Appear Offline</option>
                </select>
              </div>
            </div>
          </div>
          <Input placeholder="🔍 Search contacts..." className="h-6 text-xs bg-white border-[#B8D6FB]" />
        </div>

        {/* Contacts list */}
        <div className="flex-grow overflow-auto">
          <div className="p-2">
            <div className="text-xs font-bold text-[#0066CC] mb-1">Online Contacts</div>
            {sampleContacts
              .filter((contact) => contact.status !== "offline")
              .map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center p-1 rounded cursor-pointer ${
                    currentContact.id === contact.id ? "bg-[#B8D6FB]" : "hover:bg-[#D9ECFF]"
                  }`}
                  onClick={() => setCurrentContact(contact)}
                >
                  <div className="relative mr-2">
                    <img
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                    <span className="absolute bottom-0 right-0">{getStatusIcon(contact.status)}</span>
                  </div>
                  <div className="text-xs">{contact.name}</div>
                </div>
              ))}
          </div>

          <div className="p-2 border-t border-[#B8D6FB]">
            <div className="text-xs font-bold text-[#0066CC] mb-1">Offline Contacts</div>
            {sampleContacts
              .filter((contact) => contact.status === "offline")
              .map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center p-1 rounded cursor-pointer ${
                    currentContact.id === contact.id ? "bg-[#B8D6FB]" : "hover:bg-[#D9ECFF]"
                  }`}
                  onClick={() => setCurrentContact(contact)}
                >
                  <div className="relative mr-2">
                    <img
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                      className="w-8 h-8 rounded-full border border-gray-300 opacity-50"
                    />
                    <span className="absolute bottom-0 right-0">⚪</span>
                  </div>
                  <div className="text-xs text-gray-500">{contact.name}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="p-2 border-t border-[#B8D6FB] bg-[#CCE4FF]">
          <div className="flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto w-auto text-[#0066CC] hover:bg-[#B8D6FB] hover:text-[#0066CC]"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto w-auto text-[#0066CC] hover:bg-[#B8D6FB] hover:text-[#0066CC]"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right side - Chat area */}
      <div className="w-3/4 flex flex-col">
        {/* Chat header */}
        <div className="bg-[#CCE4FF] p-2 border-b border-[#B8D6FB] flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-2">
              <img
                src={currentContact.avatar || "/placeholder.svg"}
                alt={currentContact.name}
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <span className="absolute bottom-0 right-0">{getStatusIcon(currentContact.status)}</span>
            </div>
            <div>
              <div className="text-sm font-bold">{currentContact.name}</div>
              <div className="text-xs text-gray-600">{getStatusText(currentContact.status)}</div>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto w-auto text-[#0066CC] hover:bg-[#B8D6FB] hover:text-[#0066CC]"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto w-auto text-[#0066CC] hover:bg-[#B8D6FB] hover:text-[#0066CC]"
            >
              <Video className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto w-auto text-[#0066CC] hover:bg-[#B8D6FB] hover:text-[#0066CC]"
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto w-auto text-[#0066CC] hover:bg-[#B8D6FB] hover:text-[#0066CC]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-grow p-3 overflow-auto bg-white">
          <div className="text-center text-xs text-gray-500 mb-4">
            --- Conversation started on {new Date().toLocaleDateString()} ---
          </div>

          {messages.map((message) => (
            <div key={message.id} className={`mb-3 flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}>
              {!message.isCurrentUser && (
                <img
                  src={currentContact.avatar || "/placeholder.svg"}
                  alt={message.sender}
                  className="w-8 h-8 rounded-full mr-2 self-end"
                />
              )}
              <div
                className={`max-w-[70%] rounded-lg p-2 ${
                  message.isCurrentUser
                    ? "bg-[#CCE4FF] text-[#0066CC] rounded-br-none"
                    : "bg-[#F0F0F0] text-black rounded-bl-none"
                }`}
              >
                <div className="text-xs font-bold mb-1">{message.sender}</div>
                <div className="text-sm whitespace-pre-wrap break-words">{message.content}</div>
                <div className="text-right text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</div>
              </div>
              {message.isCurrentUser && (
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="You"
                  className="w-8 h-8 rounded-full ml-2 self-end"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Emoticons panel */}
        {showEmoticons && (
          <div className="bg-white border-t border-[#B8D6FB] p-2">
            <div className="flex flex-wrap">
              {emoticons.map((emoticon) => (
                <button
                  key={emoticon.code}
                  className="p-1 text-lg hover:bg-[#CCE4FF] rounded"
                  onClick={() => setNewMessage((prev) => prev + " " + emoticon.emoji)}
                >
                  {emoticon.emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-2 border-t border-[#B8D6FB] bg-[#CCE4FF]">
          <div className="flex items-center mb-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto w-auto text-[#0066CC] hover:bg-[#B8D6FB] hover:text-[#0066CC]"
              onClick={() => setShowEmoticons(!showEmoticons)}
            >
              😊
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto w-auto text-[#0066CC] hover:bg-[#B8D6FB] hover:text-[#0066CC]"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="text-xs text-gray-500 ml-2">
              {currentContact.status === "online"
                ? `${currentContact.name} is typing...`
                : `${currentContact.name} is ${currentContact.status}`}
            </div>
          </div>
          <div className="flex">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Type a message..."
              className="bg-white border-[#B8D6FB]"
              multiline="true"
            />
            <Button onClick={handleSendMessage} className="ml-2 bg-[#0066CC] hover:bg-[#0055AA] text-white">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


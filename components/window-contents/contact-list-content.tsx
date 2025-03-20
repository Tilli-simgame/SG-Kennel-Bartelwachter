"use client"

import { useState } from "react"
import { UserPlus, Settings, Search, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMobile } from "@/hooks/use-mobile"

interface Contact {
  id: string
  name: string
  status: "online" | "away" | "busy" | "offline"
  avatar: string
  lastSeen?: Date
}

interface ContactListContentProps {
  path: string
  onStartChat: (contactId: string, contactName: string) => void
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

export function ContactListContent({ path, onStartChat }: ContactListContentProps) {
  const [userStatus, setUserStatus] = useState<"online" | "away" | "busy" | "offline">("online")
  const [searchTerm, setSearchTerm] = useState("")
  const isMobile = useMobile()

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

  const filteredContacts = sampleContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full bg-[#E8F1F8]">
      {/* User info */}
      <div className="bg-[#CCE4FF] p-3 border-b border-[#B8D6FB]">
        <div className="flex items-center mb-3">
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
        <div className="relative">
          <Input
            placeholder="Search contacts..."
            className="h-7 text-xs bg-white border-[#B8D6FB] pl-7"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="h-3 w-3 absolute left-2 top-2 text-gray-500" />
        </div>
      </div>

      {/* Contacts list */}
      <div className="flex-grow overflow-auto">
        <div className="p-2">
          <div className="text-xs font-bold text-[#0066CC] mb-1">Online Contacts</div>
          {filteredContacts
            .filter((contact) => contact.status !== "offline")
            .map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-1 rounded hover:bg-[#D9ECFF] cursor-pointer"
                onClick={() => onStartChat(contact.id, contact.name)}
              >
                <div className="flex items-center">
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-6 w-6 text-[#0066CC] hover:bg-[#B8D6FB] hover:text-[#0066CC]"
                  onClick={(e) => {
                    e.stopPropagation()
                    onStartChat(contact.id, contact.name)
                  }}
                >
                  <MessageSquare className="h-3 w-3" />
                </Button>
              </div>
            ))}
        </div>

        <div className="p-2 border-t border-[#B8D6FB]">
          <div className="text-xs font-bold text-[#0066CC] mb-1">Offline Contacts</div>
          {filteredContacts
            .filter((contact) => contact.status === "offline")
            .map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-1 rounded hover:bg-[#D9ECFF] cursor-pointer"
                onClick={() => onStartChat(contact.id, contact.name)}
              >
                <div className="flex items-center">
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-6 w-6 text-[#0066CC] hover:bg-[#B8D6FB] hover:text-[#0066CC]"
                  onClick={(e) => {
                    e.stopPropagation()
                    onStartChat(contact.id, contact.name)
                  }}
                >
                  <MessageSquare className="h-3 w-3" />
                </Button>
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
  )
}


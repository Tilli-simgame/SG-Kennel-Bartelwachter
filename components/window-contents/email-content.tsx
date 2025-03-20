"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Inbox, Send, Trash2, Archive, Star, File, ChevronDown } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface Email {
  id: string
  from: string
  to: string
  subject: string
  date: string
  content: string
  read: boolean
  starred: boolean
}

interface EmailContentProps {
  path: string
}

// Sample emails data
const sampleEmails: Email[] = [
  {
    id: "1",
    from: "Sarah Johnson <sarah.j@example.com>",
    to: "visitor@kennel.com",
    subject: "Welcome to Bartelwächter Kennel",
    date: "2023-05-15 10:30",
    content: `Dear Visitor,

Thank you for your interest in our kennel. We're delighted to welcome you to our community of dog lovers.

Our kennel specializes in breeding and training high-quality dogs with excellent temperaments and health profiles. We take pride in our facilities and the care we provide to all our animals.

Please feel free to visit us anytime during our opening hours:
Monday - Friday: 9:00 - 17:00
Saturday: 10:00 - 15:00
Sunday: Closed

Looking forward to meeting you and your furry friends!

Best regards,
Sarah Johnson
Kennel Manager
Bartelwächter Kennel`,
    read: true,
    starred: true,
  },
  {
    id: "2",
    from: "Michael Brown <mbrown@example.com>",
    to: "visitor@kennel.com",
    subject: "Upcoming Vaccination Schedule",
    date: "2023-05-10 14:45",
    content: `Hello,

I wanted to remind you about the upcoming vaccination schedule for the dogs. We have appointments booked for next Tuesday at 10:00 AM.

Please ensure all dogs are ready for their check-ups.

Regards,
Dr. Michael Brown
Veterinarian`,
    read: true,
    starred: false,
  },
  {
    id: "3",
    from: "Dog Show Committee <info@dogshow.com>",
    to: "visitor@kennel.com",
    subject: "Invitation to National Dog Show 2023",
    date: "2023-05-05 09:15",
    content: `Dear Kennel Owner,

We are pleased to invite you to participate in the National Dog Show 2023, which will be held on June 15-17 at the Central Exhibition Hall.

Registration is now open until May 30. Early bird discounts are available until May 15.

We hope to see your champions at the event!

Best regards,
Dog Show Committee`,
    read: false,
    starred: false,
  },
  {
    id: "4",
    from: "Pet Supplies Co. <orders@petsupplies.com>",
    to: "visitor@kennel.com",
    subject: "Your Order #12345 Has Been Shipped",
    date: "2023-05-01 16:20",
    content: `Hello,

Your recent order #12345 has been shipped and is on its way to you.

Order details:
- Premium Dog Food (20kg) x 2
- Chew Toys (Pack of 5) x 3
- Grooming Brush x 1

Estimated delivery: May 5, 2023

Thank you for your business!

Pet Supplies Co. Team`,
    read: true,
    starred: false,
  },
  {
    id: "5",
    from: "Kennel Club <membership@kennelclub.org>",
    to: "visitor@kennel.com",
    subject: "Membership Renewal Notice",
    date: "2023-04-28 11:05",
    content: `Dear Member,

Your Kennel Club membership is due for renewal on June 1, 2023.

To continue enjoying all the benefits of membership, please renew before the expiration date.

Membership benefits include:
- Access to exclusive events
- Discounted registration fees
- Monthly magazine subscription
- Networking opportunities

Renew online at www.kennelclub.org/renew

Thank you for your continued support!

Kennel Club Membership Team`,
    read: false,
    starred: true,
  },
]

export function EmailContent({ path }: EmailContentProps) {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [currentFolder, setCurrentFolder] = useState("inbox")
  const [emails, setEmails] = useState(sampleEmails)
  const isMobile = useMobile()

  const markAsRead = (id: string) => {
    setEmails(emails.map((email) => (email.id === id ? { ...email, read: true } : email)))
  }

  const toggleStar = (id: string) => {
    setEmails(emails.map((email) => (email.id === id ? { ...email, starred: !email.starred } : email)))
  }

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email)
    markAsRead(email.id)
  }

  return (
    <div className={`flex flex-col h-full ${isMobile ? "pb-4" : ""}`}>
      {/* Toolbar */}
      <div className="bg-[#EFF3F7] border-b border-[#ADB6BF] p-1 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
        >
          <Mail className="h-3 w-3 mr-1" />
          New Email
        </Button>

        <div className="w-px h-4 bg-[#ADB6BF] mx-2" />

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
        >
          <Send className="h-3 w-3 mr-1" />
          Send/Receive
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2] ml-1"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Delete
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Left sidebar - Folders */}
        <div className="w-1/5 border-r border-[#ADB6BF] bg-[#EFF3F7] flex flex-col">
          <div className="p-2">
            <div className="text-xs font-bold text-[#003399] mb-2">Folders</div>
            <ul className="text-xs">
              <li
                className={`py-1 px-2 cursor-pointer flex items-center ${
                  currentFolder === "inbox" ? "bg-[#316AC5] text-white" : "hover:bg-[#CFD7E2]"
                }`}
                onClick={() => setCurrentFolder("inbox")}
              >
                <Inbox className="h-3 w-3 mr-1" />
                Inbox
                <span className="ml-auto bg-[#FF9900] text-white text-xs px-1 rounded">
                  {emails.filter((e) => !e.read).length}
                </span>
              </li>
              <li
                className={`py-1 px-2 cursor-pointer flex items-center ${
                  currentFolder === "sent" ? "bg-[#316AC5] text-white" : "hover:bg-[#CFD7E2]"
                }`}
                onClick={() => setCurrentFolder("sent")}
              >
                <Send className="h-3 w-3 mr-1" />
                Sent Items
              </li>
              <li
                className={`py-1 px-2 cursor-pointer flex items-center ${
                  currentFolder === "drafts" ? "bg-[#316AC5] text-white" : "hover:bg-[#CFD7E2]"
                }`}
                onClick={() => setCurrentFolder("drafts")}
              >
                <File className="h-3 w-3 mr-1" />
                Drafts
              </li>
              <li
                className={`py-1 px-2 cursor-pointer flex items-center ${
                  currentFolder === "archive" ? "bg-[#316AC5] text-white" : "hover:bg-[#CFD7E2]"
                }`}
                onClick={() => setCurrentFolder("archive")}
              >
                <Archive className="h-3 w-3 mr-1" />
                Archive
              </li>
              <li
                className={`py-1 px-2 cursor-pointer flex items-center ${
                  currentFolder === "trash" ? "bg-[#316AC5] text-white" : "hover:bg-[#CFD7E2]"
                }`}
                onClick={() => setCurrentFolder("trash")}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Deleted Items
              </li>
            </ul>
          </div>
        </div>

        {/* Middle - Email list */}
        <div className="w-1/3 border-r border-[#ADB6BF] flex flex-col">
          <div className="bg-[#EFF3F7] border-b border-[#ADB6BF] p-1 flex items-center">
            <Input className="h-6 text-xs bg-white border-[#ADB6BF]" placeholder="Search emails..." />
          </div>
          <div className="flex-grow overflow-auto">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`border-b border-[#E5E5E5] p-2 cursor-pointer ${
                  selectedEmail?.id === email.id
                    ? "bg-[#E8F1F8]"
                    : email.read
                      ? "bg-white"
                      : "bg-[#F0F8FF] font-semibold"
                }`}
                onClick={() => handleSelectEmail(email)}
              >
                <div className="flex items-center mb-1">
                  <button
                    className="mr-1 focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStar(email.id)
                    }}
                  >
                    <Star
                      className={`h-4 w-4 ${email.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                  <div className="text-xs font-medium truncate flex-grow">{email.from}</div>
                  <div className="text-xs text-gray-500">{email.date.split(" ")[0]}</div>
                </div>
                <div className="text-xs truncate">{email.subject}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Email content */}
        <div className="w-7/15 flex-grow bg-white flex flex-col">
          {selectedEmail ? (
            <>
              <div className="bg-[#EFF3F7] border-b border-[#ADB6BF] p-2">
                <div className="text-sm font-bold">{selectedEmail.subject}</div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs">
                    <span className="font-medium">From:</span> {selectedEmail.from}
                  </div>
                  <div className="text-xs text-gray-500">{selectedEmail.date}</div>
                </div>
                <div className="text-xs mt-1">
                  <span className="font-medium">To:</span> {selectedEmail.to}
                </div>
              </div>
              <div className="flex-grow p-3 overflow-auto">
                <pre className="text-xs whitespace-pre-wrap font-sans">{selectedEmail.content}</pre>
              </div>
              <div className="bg-[#EFF3F7] border-t border-[#ADB6BF] p-2 flex">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Reply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2] ml-1"
                >
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Forward
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select an email to view</p>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-[#EFF3F7] border-t border-[#ADB6BF] p-1 text-xs text-gray-600">
        {emails.length} messages, {emails.filter((e) => !e.read).length} unread
      </div>
    </div>
  )
}


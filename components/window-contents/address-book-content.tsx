"use client"

import { useState, useEffect } from "react"
import { Search, UserPlus, Trash2, Edit, Mail, Phone, MapPin, Users, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { translations } from "@/lib/translations"
import type { Contact } from "@/lib/contact-utils"
import { useMobile } from "@/hooks/use-mobile"

interface AddressBookContentProps {
  path: string
}

export function AddressBookContent({ path }: AddressBookContentProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentCategory, setCurrentCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useMobile()

  // Fetch all contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contacts")

        if (!response.ok) {
          throw new Error(`Failed to load contacts: ${response.statusText}`)
        }

        const data = await response.json()
        setContacts(data.contacts)
        setLoading(false)
      } catch (err) {
        console.error("Error loading contacts:", err)
        setError(translations.failedToLoad)
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  // Filter contacts based on search term and category
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = currentCategory === "All" || contact.category === currentCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ["All", ...new Set(contacts.map((contact) => contact.category))]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>{translations.loading}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  return (
    <div className={`flex flex-col h-full ${isMobile ? "pb-4" : ""}`}>
      {/* Toolbar - Windows XP style */}
      <div className="bg-[#EFF3F7] border-b border-[#ADB6BF] p-1 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
        >
          <UserPlus className="h-3 w-3 mr-1" />
          {translations.newContact}
        </Button>

        <div className="w-px h-4 bg-[#ADB6BF] mx-2" />

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
          disabled={!selectedContact}
        >
          <Edit className="h-3 w-3 mr-1" />
          {translations.properties}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2] ml-1"
          disabled={!selectedContact}
        >
          <Trash2 className="h-3 w-3 mr-1" />
          {translations.delete}
        </Button>

        <div className="ml-auto flex items-center">
          <span className="text-xs mr-1">{translations.search}:</span>
          <div className="relative">
            <Input
              className="h-6 w-40 text-xs pl-6 bg-white border-[#ADB6BF]"
              placeholder={translations.typeNameOrEmail}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-3 w-3 absolute left-2 top-1.5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Left sidebar - Categories and contacts list */}
        <div className="w-1/3 border-r border-[#ADB6BF] flex flex-col">
          {/* Categories */}
          <div className="bg-[#EFF3F7] p-2 border-b border-[#ADB6BF]">
            <h3 className="text-xs font-bold text-[#003399] mb-2">{translations.categories}</h3>
            <ul className="text-xs">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`
                    py-1 px-2 cursor-pointer flex items-center
                    ${currentCategory === category ? "bg-[#316AC5] text-white" : "hover:bg-[#CFD7E2]"}
                  `}
                  onClick={() => setCurrentCategory(category)}
                >
                  <Users className="h-3 w-3 mr-1" />
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts list */}
          <div className="flex-grow overflow-auto bg-white">
            <ul className="text-xs">
              {filteredContacts.map((contact) => (
                <li
                  key={contact.id}
                  className={`
                    py-1 px-2 cursor-pointer border-b border-[#E5E5E5] flex items-center
                    ${selectedContact?.id === contact.id ? "bg-[#316AC5] text-white" : "hover:bg-[#CFD7E2]"}
                  `}
                  onClick={() => setSelectedContact(contact)}
                >
                  <ChevronRight
                    className={`h-3 w-3 mr-1 ${selectedContact?.id === contact.id ? "text-white" : "text-[#316AC5]"}`}
                  />
                  {contact.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side - Contact details */}
        <div className="w-2/3 bg-[#F5F5F5] p-4">
          {selectedContact ? (
            <Tabs defaultValue="summary">
              <TabsList className="bg-[#EFF3F7] border border-[#ADB6BF] rounded-none p-0 h-auto">
                <TabsTrigger
                  value="summary"
                  className="text-xs px-3 py-1 rounded-none data-[state=active]:bg-[#F5F5F5] data-[state=active]:border-b-[#F5F5F5] data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                >
                  {translations.summary}
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="text-xs px-3 py-1 rounded-none data-[state=active]:bg-[#F5F5F5] data-[state=active]:border-b-[#F5F5F5] data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                >
                  {translations.details}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-4 border-none p-0">
                <div className="bg-white border border-[#ADB6BF] p-4 rounded">
                  <h2 className="text-lg font-bold text-[#003399] mb-4">{selectedContact.name}</h2>

                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center text-[#316AC5]">
                      <Mail className="h-4 w-4 mr-1" />
                      {translations.email}:
                    </div>
                    <div>{selectedContact.email}</div>

                    <div className="flex items-center text-[#316AC5]">
                      <Phone className="h-4 w-4 mr-1" />
                      {translations.phone}:
                    </div>
                    <div>{selectedContact.phone}</div>

                    <div className="flex items-center text-[#316AC5]">
                      <MapPin className="h-4 w-4 mr-1" />
                      {translations.address}:
                    </div>
                    <div>{selectedContact.address}</div>

                    <div className="flex items-center text-[#316AC5]">
                      <Users className="h-4 w-4 mr-1" />
                      {translations.category}:
                    </div>
                    <div>{selectedContact.category}</div>
                  </div>

                  {selectedContact.notes && (
                    <div className="mt-4 border-t border-[#E5E5E5] pt-2">
                      <h3 className="text-sm font-bold text-[#003399] mb-1">{translations.notes}:</h3>
                      <p className="text-sm">{selectedContact.notes}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-4 border-none p-0">
                <div className="bg-white border border-[#ADB6BF] p-4 rounded">
                  <h3 className="text-sm font-bold text-[#003399] mb-2">{translations.additionalDetails}</h3>
                  <p className="text-sm text-gray-500">{translations.additionalDetailsWouldBeShown}</p>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>{translations.selectContactToViewDetails}</p>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-[#EFF3F7] border-t border-[#ADB6BF] p-1 text-xs text-gray-600">
        {filteredContacts.length} {translations.contactCount}
      </div>
    </div>
  )
}


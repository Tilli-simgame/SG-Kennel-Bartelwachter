"use client"

import { useState } from "react"
import { Search, UserPlus, Trash2, Edit, Mail, Phone, MapPin, Users, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  address: string
  category: string
  notes?: string
}

interface AddressBookContentProps {
  path: string
}

// Sample contacts data
const sampleContacts: Contact[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    category: "Staff",
    notes: "Head trainer, specializes in obedience training",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Somewhere, USA",
    category: "Staff",
    notes: "Grooming specialist",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "mbrown@example.com",
    phone: "(555) 456-7890",
    address: "789 Pine Rd, Elsewhere, USA",
    category: "Veterinarian",
    notes: "Available for emergency calls",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(555) 234-5678",
    address: "321 Elm St, Nowhere, USA",
    category: "Client",
    notes: "Owner of Max (German Shepherd)",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "rwilson@example.com",
    phone: "(555) 876-5432",
    address: "654 Maple Dr, Anywhere, USA",
    category: "Client",
    notes: "Owner of Bella (Border Collie)",
  },
  {
    id: "6",
    name: "Jennifer Taylor",
    email: "jtaylor@example.com",
    phone: "(555) 345-6789",
    address: "987 Cedar Ln, Someplace, USA",
    category: "Supplier",
    notes: "Premium dog food supplier",
  },
  {
    id: "7",
    name: "David Miller",
    email: "dmiller@example.com",
    phone: "(555) 654-3210",
    address: "159 Birch Blvd, Othertown, USA",
    category: "Supplier",
    notes: "Equipment and accessories",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "(555) 789-0123",
    address: "753 Spruce St, Anotherplace, USA",
    category: "Veterinarian",
    notes: "Specializes in canine orthopedics",
  },
]

export function AddressBookContent({ path }: AddressBookContentProps) {
  const [contacts] = useState<Contact[]>(sampleContacts)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentCategory, setCurrentCategory] = useState("All")

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

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar - Windows XP style */}
      <div className="bg-[#EFF3F7] border-b border-[#ADB6BF] p-1 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
        >
          <UserPlus className="h-3 w-3 mr-1" />
          New Contact
        </Button>

        <div className="w-px h-4 bg-[#ADB6BF] mx-2" />

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
          disabled={!selectedContact}
        >
          <Edit className="h-3 w-3 mr-1" />
          Properties
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2] ml-1"
          disabled={!selectedContact}
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Delete
        </Button>

        <div className="ml-auto flex items-center">
          <span className="text-xs mr-1">Find:</span>
          <div className="relative">
            <Input
              className="h-6 w-40 text-xs pl-6 bg-white border-[#ADB6BF]"
              placeholder="Type name or email"
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
            <h3 className="text-xs font-bold text-[#003399] mb-2">Categories</h3>
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
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="text-xs px-3 py-1 rounded-none data-[state=active]:bg-[#F5F5F5] data-[state=active]:border-b-[#F5F5F5] data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                >
                  Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-4 border-none p-0">
                <div className="bg-white border border-[#ADB6BF] p-4 rounded">
                  <h2 className="text-lg font-bold text-[#003399] mb-4">{selectedContact.name}</h2>

                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center text-[#316AC5]">
                      <Mail className="h-4 w-4 mr-1" />
                      Email:
                    </div>
                    <div>{selectedContact.email}</div>

                    <div className="flex items-center text-[#316AC5]">
                      <Phone className="h-4 w-4 mr-1" />
                      Phone:
                    </div>
                    <div>{selectedContact.phone}</div>

                    <div className="flex items-center text-[#316AC5]">
                      <MapPin className="h-4 w-4 mr-1" />
                      Address:
                    </div>
                    <div>{selectedContact.address}</div>

                    <div className="flex items-center text-[#316AC5]">
                      <Users className="h-4 w-4 mr-1" />
                      Category:
                    </div>
                    <div>{selectedContact.category}</div>
                  </div>

                  {selectedContact.notes && (
                    <div className="mt-4 border-t border-[#E5E5E5] pt-2">
                      <h3 className="text-sm font-bold text-[#003399] mb-1">Notes:</h3>
                      <p className="text-sm">{selectedContact.notes}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-4 border-none p-0">
                <div className="bg-white border border-[#ADB6BF] p-4 rounded">
                  <h3 className="text-sm font-bold text-[#003399] mb-2">Additional Details</h3>
                  <p className="text-sm text-gray-500">Additional contact details would be shown here.</p>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a contact to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-[#EFF3F7] border-t border-[#ADB6BF] p-1 text-xs text-gray-600">
        {filteredContacts.length} contact(s)
      </div>
    </div>
  )
}


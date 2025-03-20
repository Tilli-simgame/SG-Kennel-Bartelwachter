// Interface for contact data
export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  address: string
  category: string
  notes?: string
}

// Map contact IDs to file names
export const contactFileMap: Record<string, string> = {
  "1": "john-smith",
  "2": "sarah-johnson",
  "3": "michael-brown",
  "4": "emily-davis",
  "5": "robert-wilson",
  "6": "jennifer-taylor",
  "7": "david-miller",
  "8": "lisa-anderson",
}

// Get all contact file names
export function getAllContactFileNames(): string[] {
  return Object.values(contactFileMap)
}

// Get file name for a contact ID
export function getContactFileName(contactId: string): string | null {
  return contactFileMap[contactId] || null
}

// Get contact ID from file name
export function getContactIdFromFileName(fileName: string): string | null {
  const entry = Object.entries(contactFileMap).find(([_, value]) => value === fileName)
  return entry ? entry[0] : null
}


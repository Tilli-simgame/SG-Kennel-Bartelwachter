// Map internal dog IDs to their file names
export const dogFileMap: Record<string, string> = {
  championRex: "champion-rex",
  ladyLuna: "lady-luna",
  kingMax: "king-max",
  bellaRose: "bella-rose",
  jacksonStar: "jackson-star",
  studs: "king-max", // Fallback for backward compatibility
}

// Get the file name for a dog ID
export function getDogFileName(dogId: string): string {
  return dogFileMap[dogId] || "champion-rex" // Default to champion-rex if not found
}

// Interface for dog profile data
export interface DogProfile {
  name: string
  breed: string
  dateOfBirth: string
  registration: string
  color: string
  weight: number
  height: number
  healthTests: string[]
  vaccinationsUpToDate: boolean
  showResults: Array<{
    show: string
    achievement: string
  }>
  dnaTests: string[]
  breeding: {
    available: boolean
    previousLitters: number
  }
  description: string
  profileImage?: string
  galleryImages?: string[]
}

// Generate sample gallery images for dogs
export function getDogGalleryImages(dogId: string): string[] {
  // In a real app, these would come from a database or API
  const baseImages = [
    "/placeholder.svg?height=400&width=600&text=Show+Photo",
    "/placeholder.svg?height=400&width=600&text=Playing+Outside",
    "/placeholder.svg?height=400&width=600&text=Training+Session",
    "/placeholder.svg?height=400&width=600&text=With+Family",
    "/placeholder.svg?height=400&width=600&text=Puppy+Photo",
    "/placeholder.svg?height=400&width=600&text=Sleeping",
  ]

  // Return 4-6 images for each dog
  const count = 4 + Math.floor(Math.random() * 3)
  return baseImages.slice(0, count)
}

// Get profile image for a dog
export function getDogProfileImage(dogId: string): string {
  // In a real app, this would come from a database or API
  return `/placeholder.svg?height=300&width=400&text=${dogId.replace(/([A-Z])/g, " $1").trim()}`
}


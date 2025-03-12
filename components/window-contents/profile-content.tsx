"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { copyShareableUrl } from "@/lib/share-utils"

interface ProfileContentProps {
  path: string
}

interface DogProfile {
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
}

// Sample dog profiles
const dogProfiles: Record<string, DogProfile> = {
  championRex: {
    name: "Champion Rex",
    breed: "German Shepherd",
    dateOfBirth: "2020-05-15",
    registration: "KC123456789",
    color: "Black and Tan",
    weight: 35,
    height: 65,
    healthTests: ["Hip Score: 5/5", "Elbow Score: 0/0"],
    vaccinationsUpToDate: true,
    showResults: [
      {
        show: "National Championship 2023",
        achievement: "Best of Breed",
      },
      {
        show: "Regional Show 2022",
        achievement: "Best in Group",
      },
    ],
    dnaTests: ["vWD Clear", "DM Clear"],
    breeding: {
      available: true,
      previousLitters: 2,
    },
    description:
      "Champion Rex is an exceptional example of the German Shepherd breed with excellent temperament and structure. He has proven himself in the show ring and as a stud dog.",
  },
  ladyLuna: {
    name: "Lady Luna",
    breed: "Border Collie",
    dateOfBirth: "2021-03-10",
    registration: "KC987654321",
    color: "Black and White",
    weight: 20,
    height: 53,
    healthTests: ["Hip Score: 4/5", "Eye Test: Clear"],
    vaccinationsUpToDate: true,
    showResults: [
      {
        show: "County Fair 2023",
        achievement: "Best of Breed",
      },
      {
        show: "Agility Championship 2022",
        achievement: "1st Place",
      },
    ],
    dnaTests: ["CEA Clear", "TNS Clear"],
    breeding: {
      available: false,
      previousLitters: 0,
    },
    description:
      "Lady Luna is a beautiful Border Collie with exceptional agility skills. She has a friendly temperament and is great with children.",
  },
  kingMax: {
    name: "King Max",
    breed: "Labrador Retriever",
    dateOfBirth: "2019-08-22",
    registration: "KC456789123",
    color: "Yellow",
    weight: 32,
    height: 58,
    healthTests: ["Hip Score: 5/5", "Elbow Score: 0/0", "Eye Test: Clear"],
    vaccinationsUpToDate: true,
    showResults: [
      {
        show: "International Dog Show 2022",
        achievement: "Best in Show",
      },
      {
        show: "National Retriever Championship 2021",
        achievement: "1st Place",
      },
    ],
    dnaTests: ["PRA Clear", "EIC Clear", "CNM Clear"],
    breeding: {
      available: true,
      previousLitters: 5,
    },
    description:
      "King Max is a champion Labrador Retriever with an excellent pedigree. He has produced multiple champion puppies and has a gentle, friendly temperament.",
  },
  bellaRose: {
    name: "Bella Rose",
    breed: "Golden Retriever",
    dateOfBirth: "2020-11-05",
    registration: "KC789012345",
    color: "Golden",
    weight: 29,
    height: 56,
    healthTests: ["Hip Score: 5/5", "Elbow Score: 0/0", "Heart Test: Clear"],
    vaccinationsUpToDate: true,
    showResults: [
      {
        show: "Golden Retriever Specialty 2023",
        achievement: "Best Female",
      },
      {
        show: "City Dog Show 2022",
        achievement: "Best of Breed",
      },
    ],
    dnaTests: ["PRA Clear", "Ichthyosis Clear"],
    breeding: {
      available: true,
      previousLitters: 1,
    },
    description:
      "Bella Rose is a stunning Golden Retriever with a rich golden coat and excellent conformation. She has a sweet, gentle temperament and is excellent with children and other animals.",
  },
  jacksonStar: {
    name: "Jackson Star",
    breed: "Siberian Husky",
    dateOfBirth: "2021-01-18",
    registration: "KC345678901",
    color: "Gray and White",
    weight: 25,
    height: 59,
    healthTests: ["Eye Test: Clear", "Hip Score: 4/5"],
    vaccinationsUpToDate: true,
    showResults: [
      {
        show: "Winter Dog Festival 2023",
        achievement: "Best of Breed",
      },
      {
        show: "Working Dog Exhibition 2022",
        achievement: "2nd Place",
      },
    ],
    dnaTests: ["Degenerative Myelopathy Clear"],
    breeding: {
      available: true,
      previousLitters: 0,
    },
    description:
      "Jackson Star is an energetic and striking Siberian Husky with beautiful markings and ice-blue eyes. He has excellent endurance and a friendly, outgoing personality.",
  },
  // Keep the studs profile for backward compatibility
  studs: {
    name: "King Max",
    breed: "Labrador Retriever",
    dateOfBirth: "2019-08-22",
    registration: "KC456789123",
    color: "Yellow",
    weight: 32,
    height: 58,
    healthTests: ["Hip Score: 5/5", "Elbow Score: 0/0", "Eye Test: Clear"],
    vaccinationsUpToDate: true,
    showResults: [
      {
        show: "International Dog Show 2022",
        achievement: "Best in Show",
      },
      {
        show: "National Retriever Championship 2021",
        achievement: "1st Place",
      },
    ],
    dnaTests: ["PRA Clear", "EIC Clear", "CNM Clear"],
    breeding: {
      available: true,
      previousLitters: 5,
    },
    description:
      "King Max is a champion Labrador Retriever with an excellent pedigree. He has produced multiple champion puppies and has a gentle, friendly temperament.",
  },
}

export function ProfileContent({ path }: ProfileContentProps) {
  const [dogProfile, setDogProfile] = useState<DogProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDogProfile = async () => {
      try {
        // Extract the dog name from the path
        const pathParts = path.split(".")
        const dogName = pathParts[pathParts.length - 1]

        // In a real app, this would fetch from an API
        // For demo purposes, we'll use our sample profiles
        if (dogProfiles[dogName]) {
          setDogProfile(dogProfiles[dogName])
        } else {
          // Fallback to a default profile if the specific one isn't found
          setDogProfile(dogProfiles["championRex"])
        }

        setLoading(false)
      } catch (err) {
        setError("Failed to load dog profile")
        setLoading(false)
      }
    }

    fetchDogProfile()
  }, [path])

  const handleShareProfile = async () => {
    const success = await copyShareableUrl(path)

    if (success) {
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this dog profile with others.",
      })
    } else {
      toast({
        title: "Failed to copy link",
        description: "Please try again or copy the URL manually.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading dog profile...</p>
        </div>
      </div>
    )
  }

  if (error || !dogProfile) {
    return <div className="p-4 text-red-500">{error || "Failed to load dog profile"}</div>
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-bold mr-2">{dogProfile.name}</h2>
          <span className="text-gray-600">{dogProfile.breed}</span>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleShareProfile}>
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="physical">Physical</TabsTrigger>
          <TabsTrigger value="shows">Shows</TabsTrigger>
          <TabsTrigger value="breeding">Breeding</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Basic Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Born:</div>
                <div>{dogProfile.dateOfBirth}</div>
                <div>Registration:</div>
                <div>{dogProfile.registration}</div>
              </div>
              <p className="mt-4 text-sm">{dogProfile.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="physical">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Physical Characteristics</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Color:</div>
                <div>{dogProfile.color}</div>
                <div>Weight:</div>
                <div>{dogProfile.weight} kg</div>
                <div>Height:</div>
                <div>{dogProfile.height} cm</div>
              </div>

              <h3 className="font-medium mt-4 mb-2">Health Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Health Tests:</div>
                <div>{dogProfile.healthTests.join(", ")}</div>
                <div>Vaccinations Up to Date:</div>
                <div>{dogProfile.vaccinationsUpToDate ? "Yes" : "No"}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shows">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Show Results</h3>
              <div className="space-y-2">
                {dogProfile.showResults.map((result, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2 text-sm">
                    <div>{result.show}:</div>
                    <div>{result.achievement}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breeding">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Breeding Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>DNA Tests:</div>
                <div>{dogProfile.dnaTests.join(", ")}</div>
                <div>Available for Breeding:</div>
                <div>{dogProfile.breeding.available ? "Yes" : "No"}</div>
                <div>Previous Litters:</div>
                <div>{dogProfile.breeding.previousLitters}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


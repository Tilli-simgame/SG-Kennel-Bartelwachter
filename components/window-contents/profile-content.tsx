"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { copyShareableUrl } from "@/lib/share-utils"
import { translations } from "@/lib/translations"
import { getDogFileName, getDogProfileImage, getDogGalleryImages, type DogProfile } from "@/lib/dog-utils"
import { useMobile } from "@/hooks/use-mobile"

interface ProfileContentProps {
  path: string
}

export function ProfileContent({ path }: ProfileContentProps) {
  const [dogProfile, setDogProfile] = useState<DogProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { toast } = useToast()
  const isMobile = useMobile()

  useEffect(() => {
    const fetchDogProfile = async () => {
      try {
        // Extract the dog name from the path
        const pathParts = path.split(".")
        const dogId = pathParts[pathParts.length - 1]

        // Get the file name for this dog
        const fileName = getDogFileName(dogId)

        // Fetch the dog profile from the API
        const response = await fetch(`/api/dogs/${fileName}`)

        if (!response.ok) {
          throw new Error(`Failed to load dog profile: ${response.statusText}`)
        }

        const data = await response.json()

        // Add profile image and gallery images
        const profileData = {
          ...data.profile,
          profileImage: getDogProfileImage(dogId),
        }

        setDogProfile(profileData)

        // Set gallery images
        const images = getDogGalleryImages(dogId)
        setGalleryImages(images)

        setLoading(false)
      } catch (err) {
        console.error("Error loading dog profile:", err)
        setError(translations.failedToLoad)
        setLoading(false)
      }
    }

    fetchDogProfile()
  }, [path])

  const handleShareProfile = async () => {
    const success = await copyShareableUrl(path)

    if (success) {
      toast({
        title: translations.linkCopied,
        description: translations.shareProfile,
      })
    } else {
      toast({
        title: translations.failedToCopy,
        description: translations.tryAgain,
        variant: "destructive",
      })
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

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

  if (error || !dogProfile) {
    return <div className="p-4 text-red-500">{error || translations.failedToLoad}</div>
  }

  return (
    <div className={`p-4 h-full overflow-auto bg-[#ECE9D8] ${isMobile ? "pb-4" : ""}`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-bold mr-2">{dogProfile.name}</h2>
          <span className="text-gray-600">{dogProfile.breed}</span>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleShareProfile}>
          <Share2 className="h-4 w-4" />
          <span>{translations.share}</span>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <div className="mb-6">
          <TabsList className="h-auto p-1 bg-muted grid grid-cols-3 md:grid-cols-5 gap-1">
            <TabsTrigger value="overview" className="text-xs md:text-sm py-2 data-[state=active]:bg-background">
              {translations.overview}
            </TabsTrigger>
            <TabsTrigger value="physical" className="text-xs md:text-sm py-2 data-[state=active]:bg-background">
              {translations.physical}
            </TabsTrigger>
            <TabsTrigger value="shows" className="text-xs md:text-sm py-2 data-[state=active]:bg-background">
              {translations.shows}
            </TabsTrigger>
            <TabsTrigger value="breeding" className="text-xs md:text-sm py-2 data-[state=active]:bg-background">
              {translations.breedingInfo}
            </TabsTrigger>
            <TabsTrigger value="gallery" className="text-xs md:text-sm py-2 data-[state=active]:bg-background">
              {translations.gallery}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{translations.basicInformation}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>{translations.born}:</div>
                    <div>{dogProfile.dateOfBirth}</div>
                    <div>{translations.registration}:</div>
                    <div>{dogProfile.registration}</div>
                  </div>
                  <p className="mt-4 text-sm">{dogProfile.description}</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <img
                    src={dogProfile.profileImage || "/placeholder.svg"}
                    alt={dogProfile.name}
                    className="w-full max-w-[300px] h-auto object-cover rounded-md border border-gray-300 shadow-sm"
                  />
                  <div className="mt-2 text-sm text-center font-medium">{dogProfile.name}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="physical">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">{translations.physicalCharacteristics}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>{translations.color}:</div>
                <div>{dogProfile.color}</div>
                <div>{translations.weight}:</div>
                <div>{dogProfile.weight} kg</div>
                <div>{translations.height}:</div>
                <div>{dogProfile.height} cm</div>
              </div>

              <h3 className="font-medium mt-4 mb-2">{translations.healthInformation}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>{translations.healthTests}:</div>
                <div>{dogProfile.healthTests.join(", ")}</div>
                <div>{translations.vaccinationsUpToDate}:</div>
                <div>{dogProfile.vaccinationsUpToDate ? "Kyllä" : "Ei"}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shows">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">{translations.showResults}</h3>
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
              <h3 className="font-medium mb-2">{translations.breedingInfo}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>{translations.dnaTests}:</div>
                <div>{dogProfile.dnaTests.join(", ")}</div>
                <div>{translations.availableForBreeding}:</div>
                <div>{dogProfile.breeding.available ? "Kyllä" : "Ei"}</div>
                <div>{translations.previousLitters}:</div>
                <div>{dogProfile.breeding.previousLitters}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardContent className="p-4">
              {galleryImages.length > 0 ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-[600px]">
                    <img
                      src={galleryImages[currentImageIndex] || "/placeholder.svg"}
                      alt={`${dogProfile.name} - ${currentImageIndex + 1}`}
                      className="w-full h-auto object-cover rounded-md border border-gray-300 shadow-sm"
                    />

                    <div className="absolute inset-0 flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90 text-gray-800"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90 text-gray-800"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center gap-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {galleryImages.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${dogProfile.name} - ${index + 1}`}
                        className={`w-full h-20 object-cover rounded cursor-pointer border-2 ${
                          index === currentImageIndex ? "border-blue-500" : "border-transparent"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">No gallery images available</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer,
  Save,
  Trash2,
  RotateCw,
  Play,
  HelpCircle,
} from "lucide-react"

interface Photo {
  id: string
  title: string
  src: string
  description?: string
}

interface PhotoGalleryContentProps {
  path: string
}

// Sample photo data - in a real app, this would come from an API or props
const samplePhotos: Record<string, Photo[]> = {
  indoor: [
    {
      id: "1",
      title: "Reception Area",
      src: "/placeholder.svg?height=600&width=800",
      description: "Our welcoming reception area",
    },
    {
      id: "2",
      title: "Grooming Station",
      src: "/placeholder.svg?height=600&width=800",
      description: "Professional grooming station",
    },
    {
      id: "3",
      title: "Indoor Play Area",
      src: "/placeholder.svg?height=600&width=800",
      description: "Spacious indoor play area for dogs",
    },
  ],
  outdoor: [
    { id: "4", title: "Main Yard", src: "/placeholder.svg?height=600&width=800", description: "Large outdoor yard" },
    {
      id: "5",
      title: "Agility Course",
      src: "/placeholder.svg?height=600&width=800",
      description: "Professional agility training course",
    },
    {
      id: "6",
      title: "Swimming Pool",
      src: "/placeholder.svg?height=600&width=800",
      description: "Dog-friendly swimming pool",
    },
  ],
  playAreas: [
    {
      id: "7",
      title: "Small Dog Area",
      src: "/placeholder.svg?height=400&width=600",
      description: "Play area for small breeds",
    },
    {
      id: "8",
      title: "Obstacle Course",
      src: "/placeholder.svg?height=400&width=600",
      description: "Fun obstacle course for dogs",
    },
    { id: "9", title: "Rest Area", src: "/placeholder.svg?height=400&width=600", description: "Comfortable rest area" },
  ],
  show: [
    {
      id: "10",
      title: "Championship 2023",
      src: "/placeholder.svg?height=400&width=600",
      description: "Our dogs at the 2023 Championship",
    },
    {
      id: "11",
      title: "Best in Show",
      src: "/placeholder.svg?height=400&width=600",
      description: "Champion Rex winning Best in Show",
    },
    {
      id: "12",
      title: "Group Photo",
      src: "/placeholder.svg?height=400&width=600",
      description: "Group photo from the National Dog Show",
    },
  ],
  puppy: [
    {
      id: "13",
      title: "New Litter",
      src: "/placeholder.svg?height=400&width=600",
      description: "Our newest litter of puppies",
    },
    {
      id: "14",
      title: "Puppy Training",
      src: "/placeholder.svg?height=400&width=600",
      description: "Early training session with puppies",
    },
    {
      id: "15",
      title: "Playtime",
      src: "/placeholder.svg?height=400&width=600",
      description: "Puppies during playtime",
    },
  ],
  daily: [
    {
      id: "16",
      title: "Morning Walk",
      src: "/placeholder.svg?height=400&width=600",
      description: "Dogs enjoying their morning walk",
    },
    {
      id: "17",
      title: "Feeding Time",
      src: "/placeholder.svg?height=400&width=600",
      description: "Dogs at feeding time",
    },
    {
      id: "18",
      title: "Nap Time",
      src: "/placeholder.svg?height=400&width=600",
      description: "Dogs taking their afternoon nap",
    },
  ],
}

export function PhotoGalleryContent({ path }: PhotoGalleryContentProps) {
  // Extract the folder and category from the path
  const pathParts = path.split(".")
  const category = pathParts[pathParts.length - 1]

  // Determine the parent folder
  let parentFolder = ""
  for (let i = 0; i < pathParts.length; i++) {
    if (pathParts[i] === "kennelPhotos" || pathParts[i] === "dogPhotos") {
      parentFolder = pathParts[i]
      break
    }
  }

  // Collect all photos from the parent folder
  const [allPhotos, setAllPhotos] = useState<Photo[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isSlideshow, setIsSlideshow] = useState(false)

  // Initialize all photos from the parent folder
  useEffect(() => {
    const collectPhotos = () => {
      let photos: Photo[] = []
      let initialIndex = 0
      let currentPhotoCount = 0

      if (parentFolder === "kennelPhotos") {
        // Add all photos from kennelPhotos categories
        Object.entries(samplePhotos).forEach(([key, categoryPhotos]) => {
          if (["indoor", "outdoor", "playAreas"].includes(key)) {
            // If this is the category we're viewing, remember its position
            if (key === category) {
              initialIndex = currentPhotoCount
            }
            photos = [...photos, ...categoryPhotos]
            currentPhotoCount += categoryPhotos.length
          }
        })
      } else if (parentFolder === "dogPhotos") {
        // Add all photos from dogPhotos categories
        Object.entries(samplePhotos).forEach(([key, categoryPhotos]) => {
          if (["show", "puppy", "daily"].includes(key)) {
            // If this is the category we're viewing, remember its position
            if (key === category) {
              initialIndex = currentPhotoCount
            }
            photos = [...photos, ...categoryPhotos]
            currentPhotoCount += categoryPhotos.length
          }
        })
      } else {
        // Fallback to just the category photos
        photos = samplePhotos[category] || []
      }

      setAllPhotos(photos)
      setCurrentIndex(initialIndex)
    }

    collectPhotos()
  }, [parentFolder, category])

  // Get current photo
  const currentPhoto = allPhotos[currentIndex] || {
    id: "0",
    title: "No Image",
    src: "/placeholder.svg?height=600&width=800",
  }

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0))
  }

  // Zoom functions
  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 20, 200))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 20, 40))
  }

  // Toggle slideshow
  const toggleSlideshow = () => {
    setIsSlideshow((prev) => !prev)
  }

  // Effect for slideshow
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isSlideshow) {
      interval = setInterval(() => {
        goToNext()
      }, 3000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSlideshow, currentIndex, allPhotos.length])

  // Custom button component for the control bar
  const ControlButton = ({
    icon: Icon,
    onClick,
    isActive = false,
    disabled = false,
  }: {
    icon: any
    onClick?: () => void
    isActive?: boolean
    disabled?: boolean
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-10 h-10 flex items-center justify-center
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#E8E8E8] active:bg-[#D0D0D0]"}
        ${isActive ? "bg-[#E0E0E0]" : "bg-transparent"}
        transition-colors
      `}
    >
      <Icon className="w-5 h-5 text-[#333333]" />
    </button>
  )

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8]">
      {/* Main image area */}
      <div className="flex-grow bg-[#000000] flex items-center justify-center overflow-hidden">
        <img
          src={currentPhoto.src || "/placeholder.svg"}
          alt={currentPhoto.title}
          className="max-h-full max-w-full object-contain transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        />
      </div>

      {/* Control bar - Windows XP style */}
      <div className="h-12 bg-[#F1F1F1] border-t border-[#999999] flex items-center px-1">
        {/* Navigation controls */}
        <div className="flex">
          <ControlButton icon={ChevronLeft} onClick={goToPrevious} disabled={allPhotos.length <= 1} />
          <ControlButton icon={ChevronRight} onClick={goToNext} disabled={allPhotos.length <= 1} />
          <div className="w-px h-8 bg-[#999999] mx-1" />
        </div>

        {/* Zoom controls */}
        <div className="flex">
          <ControlButton icon={ZoomOut} onClick={zoomOut} />
          <ControlButton icon={ZoomIn} onClick={zoomIn} />
          <ControlButton icon={Maximize2} onClick={() => setZoomLevel(100)} />
          <div className="w-px h-8 bg-[#999999] mx-1" />
        </div>

        {/* File operations */}
        <div className="flex">
          <ControlButton icon={Save} />
          <ControlButton icon={Printer} />
          <ControlButton icon={Trash2} />
          <div className="w-px h-8 bg-[#999999] mx-1" />
        </div>

        {/* Additional controls */}
        <div className="flex">
          <ControlButton icon={Play} onClick={toggleSlideshow} isActive={isSlideshow} />
          <ControlButton icon={RotateCw} />
          <div className="w-px h-8 bg-[#999999] mx-1" />
        </div>

        {/* Help */}
        <div className="flex">
          <ControlButton icon={HelpCircle} />
        </div>

        {/* Image counter */}
        <div className="ml-auto mr-2 text-xs text-[#666666]">
          Image {currentIndex + 1} of {allPhotos.length}
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Maximize2, Grid, Type, Save, Printer, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { translations } from "@/lib/translations"

interface Slide {
  id: string
  title: string
  content: string
  template: "title" | "content" | "twoColumn" | "image" | "blank"
  image?: string
  notes?: string
}

interface PresentationContentProps {
  path: string
}

export function PresentationContent({ path }: PresentationContentProps) {
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<Slide[]>([])
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isSlideShow, setIsSlideShow] = useState(false)
  const [showThumbnails, setShowThumbnails] = useState(true)
  const [showNotes, setShowNotes] = useState(false)
  const isMobile = useMobile()

  // Extract the presentation ID from the path
  useEffect(() => {
    const fetchPresentation = () => {
      setLoading(true)

      // Extract the content ID from the path
      const pathParts = path.split(".")
      const presentationId = pathParts[pathParts.length - 1]

      // Simulate fetching presentation based on the ID
      setTimeout(() => {
        const presentationData = getPresentationForId(presentationId)
        setSlides(presentationData)
        setLoading(false)
      }, 500)
    }

    fetchPresentation()
  }, [path])

  // Function to get presentation based on ID
  const getPresentationForId = (id: string): Slide[] => {
    // This would normally come from an API or data file
    const presentationMap: Record<string, Slide[]> = {
      // Training presentation
      training: [
        {
          id: "slide1",
          title: "Dog Training Programs",
          content: "Bartelwächter Kennel Professional Training Services",
          template: "title",
          notes: "Welcome slide - introduce the training programs we offer",
        },
        {
          id: "slide2",
          title: "Our Training Philosophy",
          content:
            "• Positive reinforcement techniques\n• Individualized training plans\n• Focus on building strong human-dog bonds\n• Consistent, clear communication\n• Force-free methods",
          template: "content",
          notes: "Emphasize our positive reinforcement approach and how we differ from traditional training",
        },
        {
          id: "slide3",
          title: "Available Programs",
          content:
            "• Basic Obedience\n• Advanced Obedience\n• Puppy Socialization\n• Agility Training\n• Behavior Modification\n• Specialized Working Dog Training",
          template: "twoColumn",
          image: "/placeholder.svg?height=300&width=300&text=Training+Programs",
          notes: "Go through each program briefly, mention pricing structure",
        },
        {
          id: "slide4",
          title: "Training Success Stories",
          content: "Meet Rex, who overcame severe anxiety through our behavior modification program.",
          template: "image",
          image: "/placeholder.svg?height=400&width=500&text=Success+Story",
          notes: "Share 1-2 specific success stories with before/after details",
        },
        {
          id: "slide5",
          title: "Contact Us",
          content:
            "Phone: (123) 456-7890\nEmail: training@bartelwachterkennel.com\nWebsite: www.bartelwachterkennel.com",
          template: "content",
          notes: "Encourage signing up for an initial consultation",
        },
      ],

      // Grooming presentation
      grooming: [
        {
          id: "slide1",
          title: "Professional Grooming Services",
          content: "Bartelwächter Kennel Grooming Department",
          template: "title",
          notes: "Welcome slide - introduce our grooming philosophy",
        },
        {
          id: "slide2",
          title: "Our Grooming Packages",
          content:
            "• Full Grooming Package\n• Bath & Brush\n• Breed-Specific Styling\n• Specialty Treatments\n• Nail & Ear Care",
          template: "content",
          notes: "Explain each package in detail, mention pricing ranges",
        },
        {
          id: "slide3",
          title: "Grooming Facilities",
          content: "Our state-of-the-art grooming facilities feature professional equipment and premium products.",
          template: "twoColumn",
          image: "/placeholder.svg?height=300&width=300&text=Grooming+Salon",
          notes: "Highlight our equipment, safety protocols, and premium products",
        },
        {
          id: "slide4",
          title: "Before & After",
          content: "Professional transformations by our expert groomers",
          template: "image",
          image: "/placeholder.svg?height=400&width=500&text=Before+and+After",
          notes: "Show several before/after examples, mention the groomers by name",
        },
        {
          id: "slide5",
          title: "Book Your Appointment",
          content:
            "Phone: (123) 456-7890\nEmail: grooming@bartelwachterkennel.com\nOnline: www.bartelwachterkennel.com/booking",
          template: "content",
          notes: "Mention our booking policy and cancellation terms",
        },
      ],

      // Default presentation for any other ID
      default: [
        {
          id: "slide1",
          title: "Bartelwächter Kennel",
          content: "Professional Dog Services",
          template: "title",
          notes: "Introduction slide",
        },
        {
          id: "slide2",
          title: "Our Services",
          content: "• Training\n• Grooming\n• Boarding\n• Breeding\n• Health Services",
          template: "content",
          notes: "Overview of all services",
        },
        {
          id: "slide3",
          title: "Contact Information",
          content: "Phone: (123) 456-7890\nEmail: info@bartelwachterkennel.com",
          template: "content",
          notes: "Closing slide with contact details",
        },
      ],
    }

    return presentationMap[id] || presentationMap.default
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const startSlideShow = () => {
    setIsSlideShow(true)
    setShowThumbnails(false)
    setShowNotes(false)
  }

  const exitSlideShow = () => {
    setIsSlideShow(false)
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const toggleThumbnails = () => {
    setShowThumbnails(!showThumbnails)
  }

  const toggleNotes = () => {
    setShowNotes(!showNotes)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>{translations.loading || "Loading..."}</p>
        </div>
      </div>
    )
  }

  const currentSlideData = slides[currentSlide]

  // If in slideshow mode, show a full-screen presentation
  if (isSlideShow) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center" onClick={exitSlideShow}>
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
          <h1 className="text-4xl font-bold text-center mb-6">{currentSlideData.title}</h1>

          {currentSlideData.template === "image" && currentSlideData.image && (
            <div className="flex flex-col items-center mb-6">
              <img
                src={currentSlideData.image || "/placeholder.svg"}
                alt={currentSlideData.title}
                className="max-w-full max-h-[60vh] object-contain border border-gray-300 rounded"
              />
              <p className="mt-4 text-xl whitespace-pre-line">{currentSlideData.content}</p>
            </div>
          )}

          {currentSlideData.template === "twoColumn" && (
            <div className="flex flex-col md:flex-row gap-8 mb-6">
              <div className="md:w-1/2">
                <p className="text-xl whitespace-pre-line">{currentSlideData.content}</p>
              </div>
              {currentSlideData.image && (
                <div className="md:w-1/2 flex justify-center">
                  <img
                    src={currentSlideData.image || "/placeholder.svg"}
                    alt={currentSlideData.title}
                    className="max-w-full max-h-[40vh] object-contain border border-gray-300 rounded"
                  />
                </div>
              )}
            </div>
          )}

          {(currentSlideData.template === "content" || currentSlideData.template === "title") && (
            <div className="mb-6">
              <p
                className={`whitespace-pre-line ${currentSlideData.template === "title" ? "text-3xl text-center" : "text-xl"}`}
              >
                {currentSlideData.content}
              </p>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="bg-blue-50 hover:bg-blue-100"
            >
              <ChevronLeft className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Previous</span>
            </Button>

            <div className="text-sm">
              {currentSlide + 1}/{slides.length}
            </div>

            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="bg-blue-50 hover:bg-blue-100"
            >
              <span className="hidden md:inline">Next</span>
              <ChevronRight className="h-4 w-4 md:ml-2" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <Button variant="outline" onClick={exitSlideShow} className="bg-white hover:bg-gray-100">
            <X className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Exit Slideshow</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-full ${isMobile ? "pb-4" : ""}`}>
      {/* PowerPoint-style toolbar */}
      <div className="bg-[#EFF3F7] border-b border-[#ADB6BF] p-1">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
          >
            <Save className="h-3 w-3 md:mr-1" />
            <span className="hidden md:inline">Save</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
          >
            <Printer className="h-3 w-3 md:mr-1" />
            <span className="hidden md:inline">Print</span>
          </Button>

          <div className="w-px h-4 bg-[#ADB6BF] mx-1" />

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
            onClick={startSlideShow}
          >
            <Play className="h-3 w-3 md:mr-1" />
            <span className="hidden md:inline">Slide Show</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
            onClick={toggleFullScreen}
          >
            <Maximize2 className="h-3 w-3 md:mr-1" />
            <span className="hidden md:inline">{isFullScreen ? "Exit Full Screen" : "Full Screen"}</span>
          </Button>

          <div className="w-px h-4 bg-[#ADB6BF] mx-1" />

          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center px-2 py-1 text-xs border rounded ${
              showThumbnails
                ? "bg-[#D0E8FF] border-[#84BEFF] hover:bg-[#B8DCFF]"
                : "bg-[#F1F5FB] border-[#B6BDC7] hover:bg-[#E3E9F2]"
            }`}
            onClick={toggleThumbnails}
          >
            <Grid className="h-3 w-3 md:mr-1" />
            <span className="hidden md:inline">Thumbnails</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center px-2 py-1 text-xs border rounded ${
              showNotes
                ? "bg-[#D0E8FF] border-[#84BEFF] hover:bg-[#B8DCFF]"
                : "bg-[#F1F5FB] border-[#B6BDC7] hover:bg-[#E3E9F2]"
            }`}
            onClick={toggleNotes}
          >
            <Type className="h-3 w-3 md:mr-1" />
            <span className="hidden md:inline">Notes</span>
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow flex overflow-hidden">
        {/* Slide thumbnails sidebar */}
        {showThumbnails && (
          <div className="w-1/5 border-r border-[#ADB6BF] bg-[#F5F5F5] overflow-y-auto">
            <div className="p-2">
              <h3 className="text-xs font-bold mb-2">Slides</h3>
              <div className="space-y-2">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`p-2 border rounded cursor-pointer ${
                      currentSlide === index ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => goToSlide(index)}
                  >
                    <div className="text-xs font-medium truncate">
                      {index + 1}. {slide.title}
                    </div>
                    <div className="mt-1 aspect-[4/3] bg-white border border-gray-200 flex items-center justify-center">
                      {slide.template === "image" && slide.image ? (
                        <img
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-[8px] p-1 overflow-hidden">{slide.content.substring(0, 30)}...</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide editor area */}
        <div
          className={`${showThumbnails ? "w-4/5" : "w-full"} ${showNotes ? "h-2/3" : "h-full"} bg-[#D9D9D9] overflow-auto flex items-center justify-center p-4`}
        >
          <div
            className={`bg-white border border-gray-400 shadow-md ${isFullScreen ? "w-full h-full" : "w-[800px] aspect-[4/3]"} flex flex-col`}
          >
            {/* Slide header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 text-white">
              <h2 className="text-2xl font-bold">{currentSlideData.title}</h2>
            </div>

            {/* Slide content */}
            <div className="flex-grow p-6 overflow-auto">
              {currentSlideData.template === "image" && currentSlideData.image && (
                <div className="flex flex-col items-center">
                  <img
                    src={currentSlideData.image || "/placeholder.svg"}
                    alt={currentSlideData.title}
                    className="max-w-full max-h-[300px] object-contain border border-gray-300 rounded"
                  />
                  <p className="mt-4 whitespace-pre-line">{currentSlideData.content}</p>
                </div>
              )}

              {currentSlideData.template === "twoColumn" && (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <p className="whitespace-pre-line">{currentSlideData.content}</p>
                  </div>
                  {currentSlideData.image && (
                    <div className="md:w-1/2 flex justify-center">
                      <img
                        src={currentSlideData.image || "/placeholder.svg"}
                        alt={currentSlideData.title}
                        className="max-w-full max-h-[250px] object-contain border border-gray-300 rounded"
                      />
                    </div>
                  )}
                </div>
              )}

              {(currentSlideData.template === "content" || currentSlideData.template === "title") && (
                <div>
                  <p
                    className={`whitespace-pre-line ${currentSlideData.template === "title" ? "text-2xl text-center" : ""}`}
                  >
                    {currentSlideData.content}
                  </p>
                </div>
              )}
            </div>

            {/* Slide footer */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-2 text-white text-xs flex justify-between">
              <span>Bartelwächter Kennel</span>
              <span>
                Slide {currentSlide + 1} / {slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes panel */}
      {showNotes && (
        <div className="h-1/3 border-t border-[#ADB6BF] bg-[#F5F5F5] p-2">
          <h3 className="text-xs font-bold mb-1">Presenter Notes</h3>
          <div className="bg-white border border-gray-300 rounded p-2 h-[calc(100%-24px)] overflow-auto">
            <p className="text-sm">{currentSlideData.notes || "No notes for this slide."}</p>
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="bg-[#EFF3F7] border-t border-[#ADB6BF] p-1 text-xs text-gray-600 flex justify-between">
        <div>
          Slide {currentSlide + 1} of {slides.length}
        </div>
        <div>PowerPoint Presentation</div>
      </div>
    </div>
  )
}


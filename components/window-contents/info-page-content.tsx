"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Printer, Save } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { translations } from "@/lib/translations"

interface InfoSection {
  title: string
  content: string
  image?: string
}

interface InfoPageContentProps {
  path: string
}

export function InfoPageContent({ path }: InfoPageContentProps) {
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [sections, setSections] = useState<InfoSection[]>([])
  const isMobile = useMobile()

  // Extract the content ID from the path
  useEffect(() => {
    const fetchContent = () => {
      setLoading(true)

      // Extract the content ID from the path
      const pathParts = path.split(".")
      const contentId = pathParts[pathParts.length - 1]

      // Simulate fetching content based on the ID
      setTimeout(() => {
        const contentData = getContentForId(contentId)
        setSections(contentData)
        setLoading(false)
      }, 500)
    }

    fetchContent()
  }, [path])

  // Function to get content based on ID
  const getContentForId = (id: string): InfoSection[] => {
    // This would normally come from an API or data file
    const contentMap: Record<string, InfoSection[]> = {
      // Training Programs content
      training: [
        {
          title: "Obedience Training",
          content:
            "Our comprehensive obedience training program is designed for dogs of all ages and breeds. We focus on basic commands, leash manners, and proper socialization. Our experienced trainers use positive reinforcement techniques to ensure your dog learns in a supportive environment.\n\nProgram includes:\n• Basic commands (sit, stay, come, down)\n• Leash walking without pulling\n• Proper greeting behavior\n• Recall training\n• Problem behavior correction",
          image: "/placeholder.svg?height=300&width=500&text=Obedience+Training",
        },
        {
          title: "Agility Training",
          content:
            "Agility training is perfect for high-energy dogs who need both physical exercise and mental stimulation. Our agility course includes jumps, tunnels, weave poles, and more. This program improves your dog's coordination, confidence, and strengthens the bond between you and your pet.\n\nSuitable for dogs who have completed basic obedience training and are at least 1 year old. We offer beginner, intermediate, and advanced levels.",
          image: "/placeholder.svg?height=300&width=500&text=Agility+Course",
        },
        {
          title: "Puppy Socialization",
          content:
            "Early socialization is crucial for puppies to develop into well-adjusted adult dogs. Our puppy socialization classes provide a safe environment for puppies to interact with other dogs and people while learning basic manners.\n\nClasses include:\n• Supervised play sessions\n• Introduction to basic commands\n• Handling exercises\n• Exposure to different sounds and objects\n• Potty training guidance\n\nFor puppies aged 8-16 weeks who have started their vaccination series.",
          image: "/placeholder.svg?height=300&width=500&text=Puppy+Class",
        },
      ],

      // Grooming Services content
      grooming: [
        {
          title: "Full Grooming Package",
          content:
            "Our full grooming package includes everything your dog needs to look and feel their best. Each session is tailored to your dog's breed, coat type, and personal needs.\n\nServices include:\n• Bath with premium shampoo and conditioner\n• Blow dry and brush out\n• Haircut and styling\n• Nail trimming and filing\n• Ear cleaning\n• Teeth brushing\n• Anal gland expression (if needed)\n• Cologne and bandana or bow",
          image: "/placeholder.svg?height=300&width=500&text=Full+Grooming",
        },
        {
          title: "Bath & Brush",
          content:
            "Our Bath & Brush service is perfect for dogs who need a quick refresh between full grooming appointments. This service helps maintain your dog's coat and keeps them smelling fresh.\n\nIncludes:\n• Bath with premium shampoo\n• Blow dry\n• Brush out\n• Nail trimming\n• Ear cleaning\n• Cologne spritz",
          image: "/placeholder.svg?height=300&width=500&text=Bath+and+Brush",
        },
        {
          title: "Specialty Services",
          content:
            "In addition to our standard grooming packages, we offer specialty services to address specific needs:\n\n• De-shedding treatments\n• Flea and tick treatments\n• Medicated baths for skin conditions\n• Paw pad treatment\n• Facial trimming\n• Breed-specific styling\n\nConsult with our groomers to create a custom package for your pet's unique requirements.",
          image: "/placeholder.svg?height=300&width=500&text=Specialty+Grooming",
        },
      ],

      // Boarding & Daycare content
      boarding: [
        {
          title: "Luxury Boarding Suites",
          content:
            "Our luxury boarding suites provide a comfortable home away from home for your dog. Each suite is climate-controlled and features raised bedding, soothing music, and plenty of space to relax.\n\nAll boarding packages include:\n• Multiple daily walks\n• Playtime in our secure play yards\n• Feeding according to your dog's schedule\n• Administration of medications if needed\n• Daily photo updates sent to owners\n• 24/7 supervision by our trained staff",
          image: "/placeholder.svg?height=300&width=500&text=Luxury+Suites",
        },
        {
          title: "Doggy Daycare",
          content:
            "Our daycare program is perfect for dogs who need socialization and exercise while their owners are at work. Dogs are grouped by size, age, and play style to ensure a safe and fun experience for everyone.\n\nDaycare includes:\n• Supervised play in indoor and outdoor areas\n• Rest periods in comfortable quarters\n• Basic reinforcement of commands\n• Lunch and snacks (if provided by owner)\n• Regular potty breaks\n• End-of-day report card",
          image: "/placeholder.svg?height=300&width=500&text=Doggy+Daycare",
        },
        {
          title: "Extended Stay Programs",
          content:
            "For longer stays, we offer special extended stay programs that include extra enrichment activities to keep your dog happy and engaged.\n\nExtended stay features:\n• Daily one-on-one training sessions\n• Special enrichment activities\n• Extra cuddle time\n• Premium treats\n• Weekly bath and brush\n• Daily video calls with owners upon request\n\nPerfect for vacations or work trips when you need to be away for more than a few days.",
          image: "/placeholder.svg?height=300&width=500&text=Extended+Stay",
        },
      ],

      // Breeding Services content
      breeding: [
        {
          title: "Responsible Breeding Program",
          content:
            "Our responsible breeding program focuses on improving breed standards, health, and temperament. We only breed dogs that have passed rigorous health testing and have excellent temperaments.\n\nOur breeding services include:\n• Genetic health testing\n• Temperament evaluation\n• Pedigree analysis\n• Breeding timing assistance\n• Whelping support\n• Puppy socialization\n\nAll breeding is conducted with the utmost care for the welfare of our dogs.",
          image: "/placeholder.svg?height=300&width=500&text=Breeding+Program",
        },
        {
          title: "Stud Services",
          content:
            "We offer stud services from our champion males who have been health tested and have proven their quality in the show ring. Our studs are selected for their excellent conformation, temperament, and genetic health.\n\nStud service includes:\n• Pre-breeding health check\n• Progesterone testing to determine optimal breeding time\n• Multiple breeding opportunities\n• Comfortable, private facilities\n• Post-breeding care and advice\n\nAll females must meet our health and quality standards.",
          image: "/placeholder.svg?height=300&width=500&text=Stud+Services",
        },
        {
          title: "Whelping & Puppy Care",
          content:
            "Our whelping and puppy care services provide expert assistance throughout the pregnancy, birth, and early puppy development stages.\n\nServices include:\n• Pregnancy confirmation and monitoring\n• Whelping box setup and supplies\n• 24/7 whelping assistance\n• Post-whelping dam and puppy care\n• Early neurological stimulation for puppies\n• Puppy health checks and vaccinations\n• Microchipping and registration assistance",
          image: "/placeholder.svg?height=300&width=500&text=Whelping+Care",
        },
      ],

      // Default content for any other ID
      default: [
        {
          title: "Service Information",
          content:
            "Detailed information about this service is currently being updated. Please contact us for more information.",
          image: "/placeholder.svg?height=300&width=500&text=Service+Information",
        },
      ],
    }

    return contentMap[id] || contentMap.default
  }

  const nextPage = () => {
    if (currentPage < sections.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
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

  const currentSection = sections[currentPage]

  return (
    <div className={`flex flex-col h-full bg-[#F5F5F5] ${isMobile ? "pb-4" : ""}`}>
      {/* Toolbar */}
      <div className="bg-[#EFF3F7] border-b border-[#ADB6BF] p-1 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
        >
          <Printer className="h-3 w-3 mr-1" />
          {translations.print || "Print"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2] ml-1"
        >
          <Save className="h-3 w-3 mr-1" />
          {translations.save || "Save"}
        </Button>

        {/* Page navigation */}
        <div className="ml-auto flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-3 w-3 mr-1" />
            {translations.previous || "Previous"}
          </Button>
          <span className="mx-2 text-xs">
            {translations.page || "Page"} {currentPage + 1} {translations.of || "of"} {sections.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center px-2 py-1 text-xs bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
            onClick={nextPage}
            disabled={currentPage === sections.length - 1}
          >
            {translations.next || "Next"}
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-grow p-6 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-md shadow-sm p-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2">
            {currentSection.title}
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            {currentSection.image && (
              <div className="md:w-1/2">
                <img
                  src={currentSection.image || "/placeholder.svg"}
                  alt={currentSection.title}
                  className="w-full h-auto border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            )}

            {/* Text content */}
            <div className={currentSection.image ? "md:w-1/2" : "w-full"}>
              <div className="whitespace-pre-line text-sm">{currentSection.content}</div>
            </div>
          </div>

          {/* Contact info footer */}
          <div className="mt-8 pt-4 border-t border-gray-300 text-sm text-gray-600">
            <p>
              {translations.moreInfoContact || "For more information or to schedule an appointment, please contact us:"}
            </p>
            <p className="mt-1">
              {translations.phone || "Phone"}: (123) 456-7890 | {translations.email || "Email"}:
              info@bartelwachterkennel.com
            </p>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-[#EFF3F7] border-t border-[#ADB6BF] p-1 text-xs text-gray-600">
        {translations.ready || "Ready"}
      </div>
    </div>
  )
}


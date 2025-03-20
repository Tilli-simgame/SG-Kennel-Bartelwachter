"use client"

import { useState, useEffect, useRef } from "react"
import { kennelStructure } from "@/lib/kennel-structure"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { copyShareableUrl } from "@/lib/share-utils"
import { useMobile } from "@/hooks/use-mobile"

interface FolderContentProps {
  path: string
  onOpenFile?: (filePath: string) => void
}

export function FolderContent({ path, onOpenFile }: FolderContentProps) {
  const [currentPath, setCurrentPath] = useState(path)
  const [currentItem, setCurrentItem] = useState<any>(null)
  const { toast } = useToast()
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const processingClickRef = useRef<boolean>(false)
  const isMobile = useMobile()

  useEffect(() => {
    // Get the item from the path
    const getItemFromPath = (path: string) => {
      if (!path) return null

      // Handle root level path
      if (!path.includes(".")) {
        return kennelStructure[path] || null
      }

      // Split the path into segments
      const segments = path.split(".")
      let current = kennelStructure

      try {
        // Handle first segment (root level)
        current = current[segments[0]]
        if (!current) return null

        // Handle remaining segments
        for (let i = 1; i < segments.length; i++) {
          if (segments[i] === "children") continue

          if (!current.children || !current.children[segments[i]]) {
            return null
          }
          current = current.children[segments[i]]
        }

        return current
      } catch (error) {
        console.error("Error traversing path:", path, error)
        return null
      }
    }

    const item = getItemFromPath(currentPath)
    setCurrentItem(item)
  }, [currentPath])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }
    }
  }, [])

  if (!currentItem) {
    return <div className="p-4">Loading...</div>
  }

  const children = currentItem.children || {}

  const handleItemDoubleClick = (key: string, item: any) => {
    // Prevent multiple rapid clicks
    if (processingClickRef.current) {
      return
    }

    processingClickRef.current = true

    if (item.type === "folder" || item.type === "drive" || item.type === "root") {
      setCurrentPath(`${currentPath}.children.${key}`)
    } else if (item.type === "file") {
      // Handle file opening
      const filePath = `${currentPath}.children.${key}`
      // If we have an external handler, use it
      if (onOpenFile) {
        onOpenFile(filePath)
      }
    }

    // Reset processing flag after a delay
    clickTimeoutRef.current = setTimeout(() => {
      processingClickRef.current = false
    }, 300)
  }

  // Function to share a direct link to a dog profile
  const handleShareItem = async (key: string, item: any) => {
    if (item.type === "file" && (currentPath.includes("packOfPaws") || currentPath.includes("breedingProgram"))) {
      const filePath = `${currentPath}.children.${key}`
      const success = await copyShareableUrl(filePath)

      if (success) {
        toast({
          title: "Link copied to clipboard",
          description: `You can now share a direct link to ${item.title}.`,
        })
      } else {
        toast({
          title: "Failed to copy link",
          description: "Please try again or copy the URL manually.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className={`p-4 ${isMobile ? "pb-4" : ""}`}>
      {/* Path navigation */}
      <div className="bg-gray-100 p-2 mb-4 border border-gray-300 text-xs flex items-center">
        <span className="mr-2 text-gray-600">Address:</span>
        <div className="bg-white border border-gray-400 p-1 flex-grow">
          {currentPath.split(".").map((part, index) => {
            if (part === "children") return null
            return (
              <span key={index} className="inline-flex items-center">
                {index > 0 && <span className="mx-1">›</span>}
                <span className="hover:text-blue-600 cursor-pointer">{kennelStructure[part]?.title || part}</span>
              </span>
            )
          })}
        </div>
      </div>

      {/* Folder items */}
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(children).map(([key, item]: [string, any]) => (
          <div
            key={key}
            className="flex flex-col items-center p-2 hover:bg-blue-50 rounded cursor-pointer relative group"
          >
            <div className="w-full flex justify-end absolute top-0 right-0 opacity-0 group-hover:opacity-100">
              {(currentPath.includes("packOfPaws") || currentPath.includes("breedingProgram")) &&
                item.type === "file" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShareItem(key, item)
                    }}
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                )}
            </div>
            <div className="text-3xl mb-1" onDoubleClick={() => handleItemDoubleClick(key, item)}>
              {item.icon}
            </div>
            <div className="text-xs text-center" onDoubleClick={() => handleItemDoubleClick(key, item)}>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


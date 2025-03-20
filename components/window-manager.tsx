"use client"

import { useState, useEffect } from "react"
import { Window } from "./window"
import { FolderContent } from "./window-contents/folder-content"
import { NotepadContent } from "./window-contents/notepad-content"
import { ProfileContent } from "./window-contents/profile-content"
import { PhotoGalleryContent } from "./window-contents/photo-gallery-content"
import { kennelStructure } from "@/data/kennel-structure"
import { AddressBookContent } from "./window-contents/address-book-content"
import { MessengerContent } from "./window-contents/messenger-content"
import { ContactListContent } from "./window-contents/contact-list-content"
import { EmailContent } from "./window-contents/email-content"
import { BrowserContent } from "./window-contents/browser-content"
import { InfoPageContent } from "./window-contents/info-page-content"
import { PresentationContent } from "./window-contents/presentation-content"

interface WindowManagerProps {
  windows: any[]
  activeWindowId: string | null
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onMaximize: (id: string) => void
  onFocus: (id: string) => void
  onCreateWindow: (path: string, forceCreate?: boolean, updateUrl?: boolean) => void
  onCreateChatWindow: (contactId: string, contactName: string) => void
}

export function WindowManager({
  windows,
  activeWindowId,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onCreateWindow,
  onCreateChatWindow,
}: WindowManagerProps) {
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})

  // Update positions when windows change
  useEffect(() => {
    const newPositions: Record<string, { x: number; y: number }> = {}
    windows.forEach((window) => {
      if (!positions[window.id]) {
        newPositions[window.id] = window.position || { x: 50, y: 50 }
      } else {
        newPositions[window.id] = positions[window.id]
      }
    })
    setPositions(newPositions)
  }, [windows])

  const updatePosition = (id: string, position: { x: number; y: number }) => {
    setPositions((prev) => ({
      ...prev,
      [id]: position,
    }))
  }

  // Helper functions for file handling
  const getFileTitle = (path: string) => {
    const pathParts = path.split(".")
    const fileName = pathParts[pathParts.length - 1]

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

    const item = getItemFromPath(path)
    return item ? item.title : fileName
  }

  const getFileIcon = (path: string) => {
    const pathParts = path.split(".")
    const isDogProfile = pathParts.includes("ourDogs") && !pathParts.includes("breedingProgram")
    const isPhotoGallery = pathParts.some((part) => part === "kennelPhotos" || part === "dogPhotos")

    if (isDogProfile) {
      return "🐕"
    }

    if (isPhotoGallery) {
      return "🖼️"
    }

    return "📄"
  }

  const getContentComponent = (window: any) => {
    // Check if this is a contact info path
    const pathParts = window.path.split(".")
    const isContactInfo = pathParts.some((part) => part === "contactInfo" || part === "contact")

    // Check if this is the messenger (communityHub)
    if (window.path === "communityHub") {
      return <ContactListContent path={window.path} onStartChat={onCreateChatWindow} />
    }

    // Check if this is the email app
    if (window.path === "emailApp") {
      return <EmailContent path={window.path} />
    }

    // Check if this is the browser app
    if (window.path === "browserApp") {
      return <BrowserContent path={window.path} />
    }

    // Check if this is a presentation file
    const isPresentationFile =
      pathParts.some((part) => part === "training" || part === "grooming") && window.type === "file"

    if (isPresentationFile) {
      return <PresentationContent path={window.path} />
    }

    // Check if this is a service-related file (training, grooming, boarding, breeding)
    const isServiceFile =
      pathParts.some(
        (part) =>
          part === "services" ||
          part === "training" ||
          part === "grooming" ||
          part === "boarding" ||
          part === "breeding",
      ) && window.type === "file"

    if (isServiceFile) {
      return <InfoPageContent path={window.path} />
    }

    // Check if this is a chat window
    if (window.type === "chat") {
      return <MessengerContent path={window.path} contactId={window.contactId} contactName={window.contactName} />
    }

    if (isContactInfo) {
      return <AddressBookContent path={window.path} />
    }

    // Check if this is a dog profile path - updated for new structure
    const isDogProfile =
      (pathParts.includes("ourDogs") && window.type === "file") ||
      (pathParts.includes("breedingProgram") && window.type === "file")

    // Check if this is a photo gallery path
    const isPhotoGallery =
      pathParts.some((part) => part === "kennelPhotos" || part === "dogPhotos") && window.type === "file"

    if (window.type === "file") {
      if (isDogProfile) {
        return <ProfileContent path={window.path} />
      }

      if (isPhotoGallery) {
        return <PhotoGalleryContent path={window.path} />
      }

      return <NotepadContent title={window.title} />
    }

    return (
      <FolderContent
        path={window.path}
        onOpenFile={(filePath) => {
          // Use the passed onCreateWindow function - don't force create
          onCreateWindow(filePath, false)
        }}
      />
    )
  }

  return (
    <>
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          isActive={window.id === activeWindowId}
          isMinimized={window.isMinimized}
          isMaximized={window.isMaximized}
          position={positions[window.id] || { x: 50, y: 50 }}
          path={window.path}
          onClose={() => onClose(window.id)}
          onMinimize={() => onMinimize(window.id)}
          onMaximize={() => onMaximize(window.id)}
          onFocus={() => onFocus(window.id)}
          onPositionChange={(position) => updatePosition(window.id, position)}
          isChatWindow={window.type === "chat"}
        >
          {getContentComponent(window)}
        </Window>
      ))}
    </>
  )
}


"use client"

import { useState, useEffect, useRef } from "react"
import { Taskbar } from "./taskbar"
import { WindowManager } from "./window-manager"
import { DesktopShortcut } from "./desktop-shortcut"
import { kennelStructure } from "@/data/kennel-structure"
import { StickyNote } from "./sticky-note"
import { internalPathToUrlPath, urlPathToInternalPath } from "@/lib/path-utils"

interface KennelDesktopProps {
  initialPath?: string | null
}

export function KennelDesktop({ initialPath }: KennelDesktopProps) {
  const [windows, setWindows] = useState<any[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  // Flag to prevent hash change handler from running when we programmatically update the hash
  const isUpdatingHashRef = useRef<boolean>(false)

  // Function to update URL hash without triggering a page reload
  const updateUrlHash = (path: string | null) => {
    // Set flag to prevent hash change handler from running
    isUpdatingHashRef.current = true

    if (path) {
      // Convert internal path to URL path before setting hash
      const urlPath = internalPathToUrlPath(path)
      window.location.hash = urlPath
    } else {
      // Clear the hash if no path
      window.location.hash = ""
    }

    // Reset flag after a short delay to allow the hash change event to complete
    setTimeout(() => {
      isUpdatingHashRef.current = false
    }, 50)
  }

  const createWindow = (path: string, forceCreate = false, updateUrl = true) => {
    console.log("Creating window for path:", path)

    // Check if window already exists
    const existingWindow = windows.find((w) => w.path === path && !w.isMinimized)

    if (existingWindow && !forceCreate) {
      // Focus existing window
      console.log("Window already exists, focusing:", existingWindow.id)
      setActiveWindowId(existingWindow.id)

      // Update URL if needed
      if (updateUrl) {
        updateUrlHash(path)
      }
      return
    }

    // If window exists but is minimized, just restore it
    const minimizedWindow = windows.find((w) => w.path === path && w.isMinimized)
    if (minimizedWindow && !forceCreate) {
      console.log("Window exists but is minimized, restoring:", minimizedWindow.id)
      setWindows((prev) => prev.map((w) => (w.id === minimizedWindow.id ? { ...w, isMinimized: false } : w)))
      setActiveWindowId(minimizedWindow.id)

      // Update URL if needed
      if (updateUrl) {
        updateUrlHash(path)
      }
      return
    }

    // Get item details from path
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
    console.log("Item found:", item)

    if (!item) {
      console.error("No item found for path:", path)
      return
    }

    const windowId = `window-${Date.now()}`
    const newWindow = {
      id: windowId,
      path,
      title: item.title,
      icon: item.icon,
      type: item.type,
      isMinimized: false,
      isMaximized: false,
      position: { x: 50 + windows.length * 30, y: 50 + windows.length * 30 },
    }

    console.log("Creating new window:", newWindow)
    setWindows((prev) => [...prev, newWindow])
    setActiveWindowId(windowId)

    // Update URL if needed
    if (updateUrl) {
      updateUrlHash(path)
    }
  }

  const closeWindow = (id: string) => {
    const windowToClose = windows.find((w) => w.id === id)
    setWindows((prev) => prev.filter((w) => w.id !== id))

    if (activeWindowId === id) {
      // Find the next window to focus
      const remainingWindows = windows.filter((w) => w.id !== id)
      if (remainingWindows.length > 0) {
        // Focus the next window and update URL
        const nextWindow = remainingWindows[remainingWindows.length - 1]
        setActiveWindowId(nextWindow.id)
        updateUrlHash(nextWindow.path)
      } else {
        // No windows left, clear the URL parameter
        setActiveWindowId(null)
        updateUrlHash(null)
      }
    }
  }

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w)))

    // If we're minimizing the active window, find another window to focus
    if (activeWindowId === id) {
      const visibleWindows = windows.filter((w) => !w.isMinimized && w.id !== id)
      if (visibleWindows.length > 0) {
        const nextWindow = visibleWindows[visibleWindows.length - 1]
        setActiveWindowId(nextWindow.id)
        updateUrlHash(nextWindow.path)
      } else {
        // No visible windows left
        updateUrlHash(null)
      }
    }
  }

  const maximizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)))
  }

  const focusWindow = (id: string) => {
    setActiveWindowId(id)

    // Update URL when focusing a window
    const focusedWindow = windows.find((w) => w.id === id)
    if (focusedWindow) {
      updateUrlHash(focusedWindow.path)
    }
  }

  // Listen for hash changes to open windows
  useEffect(() => {
    const handleHashChange = () => {
      // Skip if we're programmatically updating the hash
      if (isUpdatingHashRef.current) {
        return
      }

      const hash = window.location.hash.slice(1) // Remove the # character
      if (hash) {
        // Convert URL path to internal path
        const internalPath = urlPathToInternalPath(hash)
        createWindow(internalPath, false, false) // Don't update URL again
      }
    }

    // Add event listener
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  // Handle initial hash or path on component mount
  useEffect(() => {
    // Only run this once on mount
    const hash = window.location.hash.slice(1)

    if (hash) {
      // If there's a hash in the URL, use that
      // Convert URL path to internal path
      const internalPath = urlPathToInternalPath(hash)
      createWindow(internalPath, false, false)
    } else if (initialPath) {
      // Otherwise use the initialPath prop if provided
      createWindow(initialPath, false, true)
    }
  }, []) // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Create welcome sticky note
    const welcomeNote = document.createElement("div")
    welcomeNote.id = "welcome-note"
    document.getElementById("desktop-area")?.appendChild(welcomeNote)

    return () => {
      document.getElementById("welcome-note")?.remove()
    }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
      <div id="desktop-area" className="absolute inset-0 pb-14">
        {/* Desktop shortcuts */}
        <div className="p-4 grid grid-cols-1 gap-4">
          <DesktopShortcut title="Our Dogs" icon="🐕" onClick={() => createWindow("ourDogs", false)} />
          <DesktopShortcut title="Messenger" icon="💬" onClick={() => createWindow("communityHub", false)} />
          <DesktopShortcut title="Contact & Info" icon="⚙️" onClick={() => createWindow("contactInfo", false)} />
        </div>

        {/* Sticky note */}
        <StickyNote
          title="Welcome visitor!"
          content="Nice to have you here :)"
          position={{ x: 800, y: 100 }}
          color="yellow"
        />

        {/* Windows */}
        <WindowManager
          windows={windows}
          activeWindowId={activeWindowId}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onCreateWindow={createWindow}
        />
      </div>

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowSelect={focusWindow}
        onCreateWindow={createWindow}
      />
    </div>
  )
}


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Home, ArrowLeft, ArrowRight, X, Search, Star, Settings } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { translations } from "@/lib/translations"

interface BrowserContentProps {
  path: string
}

export function BrowserContent({ path }: BrowserContentProps) {
  const [url, setUrl] = useState("https://www.doggle.com")
  const [isLoading, setIsLoading] = useState(false)
  const [errorIndex, setErrorIndex] = useState(0)
  const [showIllegalOperation, setShowIllegalOperation] = useState(false)
  const isMobile = useMobile()

  // Collection of humorous error messages
  const errorMessages = [
    {
      title: translations.errorSquirrelTitle,
      message: translations.errorSquirrelMessage,
      icon: "🐿️",
      code: translations.errorSquirrelCode,
    },
    {
      title: translations.errorBoneTitle,
      message: translations.errorBoneMessage,
      icon: "🦴",
      code: translations.errorBoneCode,
    },
    {
      title: translations.errorCompatibilityTitle,
      message: translations.errorCompatibilityMessage,
      icon: "🔍",
      code: translations.errorCompatibilityCode,
    },
    {
      title: translations.errorConnectionTitle,
      message: translations.errorConnectionMessage,
      icon: "🐕",
      code: translations.errorConnectionCode,
    },
    {
      title: translations.errorBandwidthTitle,
      message: translations.errorBandwidthMessage,
      icon: "📺",
      code: translations.errorBandwidthCode,
    },
  ]

  // Illegal operation error codes
  const illegalOperationCodes = [
    "BARK_OVERFLOW",
    "UNEXPECTED_TREAT",
    "NULL_POINTER_FETCH",
    "DIVISION_BY_ZERO_BONES",
    "STACK_OVER_FLOOF",
    "MEMORY_LEAK_DROOL",
    "INVALID_TAIL_REFERENCE",
    "UNHANDLED_SQUIRREL_EXCEPTION",
  ]

  const [illegalOperationCode, setIllegalOperationCode] = useState(illegalOperationCodes[0])

  // Simulate loading when URL changes
  useEffect(() => {
    const loadPage = () => {
      setIsLoading(true)

      // Random chance to show illegal operation popup
      const showIllegalOp = Math.random() < 0.3

      setTimeout(() => {
        setIsLoading(false)

        // Select a random error message
        setErrorIndex(Math.floor(Math.random() * errorMessages.length))

        // Show illegal operation popup with a delay
        if (showIllegalOp) {
          setTimeout(() => {
            setIllegalOperationCode(illegalOperationCodes[Math.floor(Math.random() * illegalOperationCodes.length)])
            setShowIllegalOperation(true)
          }, 1000)
        }
      }, 1500)
    }

    loadPage()
  }, [url])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate navigating to a new URL
    setUrl((prevUrl) => {
      // Add some randomness to make it seem like we're actually navigating
      if (prevUrl.includes("?")) {
        return prevUrl.split("?")[0] + "?t=" + Date.now()
      } else {
        return prevUrl + "?t=" + Date.now()
      }
    })
  }

  const handleRefresh = () => {
    setUrl((prevUrl) => {
      // Add some randomness to make it seem like we're actually refreshing
      if (prevUrl.includes("?")) {
        return prevUrl.split("?")[0] + "?t=" + Date.now()
      } else {
        return prevUrl + "?t=" + Date.now()
      }
    })
  }

  const closeIllegalOperation = () => {
    setShowIllegalOperation(false)
  }

  return (
    <div className={`flex flex-col h-full ${isMobile ? "pb-4" : ""}`}>
      {/* Browser toolbar */}
      <div className="bg-[#EFF3F7] border-b border-[#ADB6BF] p-1 flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 flex items-center justify-center bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
          onClick={() => setUrl("https://www.doggle.com")}
        >
          <Home className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 flex items-center justify-center bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
        >
          <ArrowLeft className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 flex items-center justify-center bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
        >
          <ArrowRight className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 flex items-center justify-center bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 flex items-center justify-center bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
        >
          <X className="h-3 w-3" />
        </Button>

        {/* Address bar */}
        <form onSubmit={handleSubmit} className="flex-grow flex items-center">
          <div className="text-xs mr-1">{translations.address}:</div>
          <div className="flex-grow relative">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-7 text-xs pl-2 pr-8 bg-white border-[#ADB6BF]"
            />
            <Button type="submit" variant="ghost" size="sm" className="h-5 w-5 p-0 absolute right-1 top-1">
              <Search className="h-3 w-3" />
            </Button>
          </div>
        </form>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 flex items-center justify-center bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
        >
          <Star className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 flex items-center justify-center bg-[#F1F5FB] border border-[#B6BDC7] rounded hover:bg-[#E3E9F2]"
        >
          <Settings className="h-3 w-3" />
        </Button>
      </div>

      {/* Browser content */}
      <div className="flex-grow bg-white overflow-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
            <div className="text-sm">{translations.loading}...</div>
            <div className="text-xs text-gray-500 mt-2">
              {translations.connectingTo} {url.split("//")[1]}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="text-6xl mb-4">{errorMessages[errorIndex].icon}</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">{errorMessages[errorIndex].title}</h2>
            <p className="mb-4 max-w-md">{errorMessages[errorIndex].message}</p>
            <div className="text-xs bg-gray-100 p-2 rounded font-mono mb-4">{errorMessages[errorIndex].code}</div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="bg-[#F1F5FB] border border-[#B6BDC7] hover:bg-[#E3E9F2]"
              >
                {translations.tryAgain}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUrl("https://www.doggle.com")}
                className="bg-[#F1F5FB] border border-[#B6BDC7] hover:bg-[#E3E9F2]"
              >
                {translations.goHome}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="bg-[#EFF3F7] border-t border-[#ADB6BF] p-1 text-xs text-gray-600 flex">
        <div className="flex-grow">{isLoading ? translations.loading : translations.doneWithErrors}</div>
        <div>Internet | {translations.protectedMode}</div>
      </div>

      {/* Illegal Operation Popup */}
      {showIllegalOperation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-[#ECE9D8] border-2 border-[#0054E3] shadow-lg w-80">
            <div className="bg-[#0054E3] text-white px-2 py-1 flex justify-between items-center">
              <div className="text-xs font-bold">{translations.illegalOperationTitle}</div>
              <button onClick={closeIllegalOperation} className="text-white hover:bg-red-700 px-1">
                ×
              </button>
            </div>
            <div className="p-4 flex">
              <div className="mr-3 text-red-600 text-3xl">⚠️</div>
              <div>
                <div className="text-sm font-bold mb-2">{translations.illegalOperationHeader}</div>
                <div className="text-xs mb-3">{translations.illegalOperationMessage}</div>
                <div className="bg-white border border-gray-400 p-2 text-xs font-mono mb-3">
                  {translations.illegalOperationException} ({illegalOperationCode})
                </div>
              </div>
            </div>
            <div className="bg-[#ECE9D8] p-2 flex justify-end border-t border-gray-400">
              <Button
                variant="outline"
                size="sm"
                onClick={closeIllegalOperation}
                className="bg-[#ECE9D8] border border-[#ACA899] hover:bg-[#E3E9F2] text-xs h-6"
              >
                {translations.illegalOperationClose}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


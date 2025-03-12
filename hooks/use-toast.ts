"use client"

import { useState, useCallback } from "react"

type ToastType = {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const toast = useCallback(({ title, description, variant = "default" }: ToastType) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { title, description, variant }])

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((_, i) => i !== 0))
    }, 3000)
  }, [])

  return { toast, toasts }
}


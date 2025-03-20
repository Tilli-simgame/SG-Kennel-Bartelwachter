"use client"

import { useState, useEffect, useRef } from "react"
import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning, CloudFog, Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { translations } from "@/lib/translations"

interface WeatherData {
  temp: number
  condition: string
  icon: string
  city: string
}

interface DogForecast {
  title: string
  description: string
}

// Fun dog-themed forecasts based on weather conditions
const getDogForecasts = (condition: string): DogForecast[] => {
  const forecasts = {
    Clear: [
      { title: translations.morning, description: translations.clearMorningForecast },
      { title: translations.afternoon, description: translations.clearAfternoonForecast },
      { title: translations.evening, description: translations.clearEveningForecast },
    ],
    Clouds: [
      { title: translations.morning, description: translations.cloudsMorningForecast },
      { title: translations.afternoon, description: translations.cloudsAfternoonForecast },
      { title: translations.evening, description: translations.cloudsEveningForecast },
    ],
    Rain: [
      { title: translations.morning, description: translations.rainMorningForecast },
      { title: translations.afternoon, description: translations.rainAfternoonForecast },
      { title: translations.evening, description: translations.rainEveningForecast },
    ],
    Snow: [
      { title: translations.morning, description: translations.snowMorningForecast },
      { title: translations.afternoon, description: translations.snowAfternoonForecast },
      { title: translations.evening, description: translations.snowEveningForecast },
    ],
    Thunderstorm: [
      { title: translations.morning, description: translations.thunderstormMorningForecast },
      { title: translations.afternoon, description: translations.thunderstormAfternoonForecast },
      { title: translations.evening, description: translations.thunderstormEveningForecast },
    ],
    Default: [
      { title: translations.morning, description: translations.defaultMorningForecast },
      { title: translations.afternoon, description: translations.defaultAfternoonForecast },
      { title: translations.evening, description: translations.defaultEveningForecast },
    ],
  }

  // Return appropriate forecasts based on condition, or default if not found
  return forecasts[condition as keyof typeof forecasts] || forecasts["Default"]
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForecast, setShowForecast] = useState(false)
  const [dogForecasts, setDogForecasts] = useState<DogForecast[]>([])
  const { toast } = useToast()

  // For tracking clicks for double-click detection
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickCountRef = useRef(0)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Always fetch Berlin weather data
        const response = await fetch(`/api/weather?city=Berlin`)

        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }

        const data = await response.json()

        const weatherData = {
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
          city: data.name,
        }

        setWeather(weatherData)

        // Set dog forecasts based on weather condition
        setDogForecasts(getDogForecasts(weatherData.condition))

        setLoading(false)
      } catch (err) {
        console.error("Weather fetch error:", err)
        setError("Failed to load weather")
        setLoading(false)
      }
    }

    fetchWeather()

    // Cleanup timeout on unmount
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }
    }
  }, [])

  const handleClick = () => {
    clickCountRef.current += 1

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    if (clickCountRef.current === 1) {
      // If this is the first click, wait for a second click
      clickTimeoutRef.current = setTimeout(() => {
        // Reset if no second click
        clickCountRef.current = 0
      }, 300)
    } else if (clickCountRef.current === 2) {
      // Double click detected
      setShowForecast((prev) => !prev)
      clickCountRef.current = 0
    }
  }

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-4 w-4" />

    switch (weather.condition) {
      case "Clear":
        return <Sun className="h-4 w-4 text-yellow-400" />
      case "Rain":
      case "Drizzle":
        return <CloudRain className="h-4 w-4 text-blue-400" />
      case "Snow":
        return <CloudSnow className="h-4 w-4 text-blue-100" />
      case "Thunderstorm":
        return <CloudLightning className="h-4 w-4 text-yellow-500" />
      case "Mist":
      case "Fog":
        return <CloudFog className="h-4 w-4 text-gray-400" />
      default:
        return <Cloud className="h-4 w-4 text-gray-300" />
    }
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-t from-blue-700 to-blue-500 px-3 py-1.5 text-white text-sm rounded-sm flex items-center">
        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-to-t from-blue-700 to-blue-500 px-3 py-1.5 text-white text-sm rounded-sm flex items-center">
        <Cloud className="h-4 w-4 mr-1 text-gray-300" />
      </div>
    )
  }

  return (
    <div className="relative">
      <div
        className="bg-gradient-to-t from-blue-700 to-blue-500 px-3 py-1.5 text-white text-sm rounded-sm flex items-center cursor-pointer"
        onClick={handleClick}
      >
        {getWeatherIcon()}
        <span className="ml-1">{weather?.temp}°C</span>
      </div>

      {/* Dog Weather Forecast Popup */}
      {showForecast && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-gray-300 rounded shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-2 flex justify-between items-center">
            <h3 className="text-white text-sm font-bold">{translations.dogWeatherForecast}</h3>
            <button className="text-white hover:bg-blue-700 rounded-full p-0.5" onClick={() => setShowForecast(false)}>
              <X className="h-3 w-3" />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 bg-[#ECE9D8]">
            <div className="flex items-center mb-2">
              {getWeatherIcon()}
              <span className="ml-2 text-sm font-medium">
                {weather?.condition}, {weather?.temp}°C
              </span>
            </div>

            <div className="space-y-2">
              {dogForecasts.map((forecast, index) => (
                <div key={index} className="bg-white border border-gray-300 p-2 rounded text-xs">
                  <div className="font-bold">{forecast.title}</div>
                  <div>{forecast.description}</div>
                </div>
              ))}
            </div>

            <div className="mt-2 text-xs text-gray-600 italic text-center">{translations.woofCastProvider}</div>
          </div>
        </div>
      )}
    </div>
  )
}


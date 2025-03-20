import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const city = searchParams.get("city")

  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "OpenWeather API key is not configured" }, { status: 500 })
  }

  try {
    let url: string

    if (lat && lon) {
      // Use coordinates if provided
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    } else if (city) {
      // Use city name as fallback
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    } else {
      return NextResponse.json({ error: "Missing location parameters" }, { status: 400 })
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`OpenWeather API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}


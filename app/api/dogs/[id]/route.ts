import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // Read the dog profile from the JSON file
    const filePath = path.join(process.cwd(), "dogs", `${id}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Dog profile not found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const dogProfile = JSON.parse(fileContent)

    return NextResponse.json(dogProfile)
  } catch (error) {
    console.error("Error loading dog profile:", error)
    return NextResponse.json({ error: "Failed to load dog profile" }, { status: 500 })
  }
}


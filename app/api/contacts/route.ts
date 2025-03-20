import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { getAllContactFileNames } from "@/lib/contact-utils"

export async function GET() {
  try {
    const contactFileNames = getAllContactFileNames()
    const contacts = []

    for (const fileName of contactFileNames) {
      const filePath = path.join(process.cwd(), "contacts", `${fileName}.json`)

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8")
        const contactData = JSON.parse(fileContent)
        contacts.push(contactData.contact)
      }
    }

    return NextResponse.json({ contacts })
  } catch (error) {
    console.error("Error loading contacts:", error)
    return NextResponse.json({ error: "Failed to load contacts" }, { status: 500 })
  }
}


import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { getContactFileName } from "@/lib/contact-utils"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const fileName = getContactFileName(id)

  if (!fileName) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 })
  }

  try {
    const filePath = path.join(process.cwd(), "contacts", `${fileName}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Contact file not found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const contactData = JSON.parse(fileContent)

    return NextResponse.json(contactData)
  } catch (error) {
    console.error("Error loading contact:", error)
    return NextResponse.json({ error: "Failed to load contact" }, { status: 500 })
  }
}


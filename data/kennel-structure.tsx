import { translations } from "@/lib/translations"

export const kennelStructure: Record<string, any> = {
  ourKennel: {
    title: translations.ourKennel,
    icon: "🖥️",
    type: "root",
    children: {
      aboutUs: {
        title: translations.aboutUs,
        icon: "💽",
        type: "drive",
        children: {
          ourStory: { title: translations.ourStory, icon: "📄", type: "file" },
          kennelHistory: { title: translations.kennelHistory, icon: "📄", type: "file" },
          staffMembers: { title: translations.staffMembers, icon: "📄", type: "file" },
        },
      },
      services: {
        title: translations.services,
        icon: "💽",
        type: "drive",
        children: {
          grooming: {
            title: translations.grooming,
            icon: "📄",
            type: "file",
            fileType: "presentation", // Add this line
          },
          boarding: { title: translations.boarding, icon: "📄", type: "file" },
          training: {
            title: translations.training,
            icon: "📄",
            type: "file",
            fileType: "presentation", // Add this line
          },
          breeding: { title: translations.breeding, icon: "📄", type: "file" },
        },
      },
      facilities: {
        title: translations.facilities,
        icon: "💽",
        type: "drive",
        children: {
          indoor: { title: translations.indoor, icon: "📄", type: "file" },
          outdoor: { title: translations.outdoor, icon: "📄", type: "file" },
          grooming: { title: translations.groomingStation, icon: "📄", type: "file" },
          blueprint: { title: translations.blueprint, icon: "📄", type: "file" },
        },
      },
    },
  },
  ourDogs: {
    title: translations.ourDogs,
    icon: "📁",
    type: "root",
    children: {
      // Dogs listed directly under Our Dogs
      championRex: {
        title: translations.championRex,
        icon: "🐕",
        type: "file",
        breed: "Saksanpaimenkoira",
      },
      ladyLuna: {
        title: translations.ladyLuna,
        icon: "🐕",
        type: "file",
        breed: "Bordercollie",
      },
      kingMax: {
        title: translations.kingMax,
        icon: "🐕",
        type: "file",
        breed: "Labradorinnoutaja",
      },
      bellaRose: {
        title: translations.bellaRose,
        icon: "🐕",
        type: "file",
        breed: "Kultainennoutaja",
      },
      jacksonStar: {
        title: translations.jacksonStar,
        icon: "🐕",
        type: "file",
        breed: "Siperianhusky",
      },
      // Keep the breeding program section
      breedingProgram: {
        title: translations.breedingProgram,
        icon: "📁",
        type: "folder",
        children: {
          studs: { title: translations.studs, icon: "📄", type: "file" },
          litters: { title: translations.litters, icon: "📄", type: "file" },
          pastLitters: { title: translations.pastLitters, icon: "📄", type: "file" },
        },
      },
    },
  },
  photoGallery: {
    title: translations.photoGallery,
    icon: "📸",
    type: "root",
    children: {
      kennelPhotos: {
        title: translations.kennelPhotos,
        icon: "📁",
        type: "folder",
        children: {
          indoor: { title: translations.indoorFacilities, icon: "🖼️", type: "file" },
          outdoor: { title: translations.outdoorAreas, icon: "🖼️", type: "file" },
          playAreas: { title: translations.playAreas, icon: "🖼️", type: "file" },
        },
      },
      dogPhotos: {
        title: translations.dogPhotos,
        icon: "📁",
        type: "folder",
        children: {
          show: { title: translations.showPhotos, icon: "🖼️", type: "file" },
          puppy: { title: translations.puppyPhotos, icon: "🖼️", type: "file" },
          daily: { title: translations.dailyLife, icon: "🖼️", type: "file" },
        },
      },
    },
  },
  browserApp: {
    title: translations.browser,
    icon: "🌐",
    type: "file",
  },
  emailApp: {
    title: translations.email,
    icon: "📧",
    type: "file",
  },
  communityHub: {
    title: translations.messenger,
    icon: "💬",
    type: "file", // Changed from "root" to "file"
  },
  contactInfo: {
    title: translations.contactInfo,
    icon: "📇",
    type: "root",
    children: {
      contact: {
        title: translations.contact,
        icon: "📁",
        type: "folder",
        children: {
          location: {
            title: translations.location,
            icon: "📄",
            type: "file",
          },
          phone: { title: translations.phone, icon: "📄", type: "file" },
          email: { title: translations.email, icon: "📄", type: "file" },
        },
      },
      booking: {
        title: translations.booking,
        icon: "📁",
        type: "folder",
        children: {
          grooming: { title: translations.groomingAppointment, icon: "📄", type: "file" },
          boarding: { title: translations.boardingRequest, icon: "📄", type: "file" },
          training: { title: translations.trainingInquiry, icon: "📄", type: "file" },
        },
      },
    },
  },
}

// Menu mapping configuration
export const menuMap: Record<string, string> = {
  "my-computer": "ourKennel",
  "my-documents": "ourDogs",
  "my-pictures": "photoGallery",
  "my-email": "emailApp",
  "my-music": "communityHub",
  "control-panel": "contactInfo",
}


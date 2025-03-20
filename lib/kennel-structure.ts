export const kennelStructure: Record<string, any> = {
  ourKennel: {
    title: "Our Kennel",
    icon: "🏠",
    type: "root",
    children: {
      aboutUs: {
        title: "About Us",
        icon: "💿",
        type: "drive",
        children: {
          ourStory: { title: "Our Story", icon: "📄", type: "file" },
          kennelHistory: { title: "Kennel History", icon: "📄", type: "file" },
          staffMembers: { title: "Staff Members", icon: "📄", type: "file" },
        },
      },
      services: {
        title: "Services",
        icon: "💿",
        type: "drive",
        children: {
          grooming: { title: "Grooming Services", icon: "📄", type: "file" },
          boarding: { title: "Boarding & Daycare", icon: "📄", type: "file" },
          training: { title: "Training Programs", icon: "📄", type: "file" },
          breeding: { title: "Breeding Services", icon: "📄", type: "file" },
        },
      },
      facilities: {
        title: "Facilities",
        icon: "💿",
        type: "drive",
        children: {
          indoor: { title: "Indoor Areas", icon: "📄", type: "file" },
          outdoor: { title: "Outdoor Playgrounds", icon: "📄", type: "file" },
          grooming: { title: "Grooming Station", icon: "📄", type: "file" },
          blueprint: { title: "Kennels Blueprint", icon: "📄", type: "file" },
        },
      },
    },
  },
  ourDogs: {
    title: "Our Dogs",
    icon: "📁",
    type: "root",
    children: {
      // Dogs listed directly under Our Dogs
      championRex: {
        title: "Champion Rex",
        icon: "🐕",
        type: "file",
        breed: "German Shepherd",
      },
      ladyLuna: {
        title: "Lady Luna",
        icon: "🐕",
        type: "file",
        breed: "Border Collie",
      },
      kingMax: {
        title: "King Max",
        icon: "🐕",
        type: "file",
        breed: "Labrador Retriever",
      },
      bellaRose: {
        title: "Bella Rose",
        icon: "🐕",
        type: "file",
        breed: "Golden Retriever",
      },
      jacksonStar: {
        title: "Jackson Star",
        icon: "🐕",
        type: "file",
        breed: "Siberian Husky",
      },
      // Keep the breeding program section
      breedingProgram: {
        title: "Breeding Program",
        icon: "📁",
        type: "folder",
        children: {
          studs: { title: "Available Studs", icon: "📄", type: "file" },
          litters: { title: "Expected Litters", icon: "📄", type: "file" },
          pastLitters: { title: "Past Litters", icon: "📄", type: "file" },
        },
      },
    },
  },
  photoGallery: {
    title: "Photo Gallery",
    icon: "📸",
    type: "root",
    children: {
      kennelPhotos: {
        title: "Kennel Photos",
        icon: "📁",
        type: "folder",
        children: {
          indoor: { title: "Indoor Facilities", icon: "🖼️", type: "file" },
          outdoor: { title: "Outdoor Areas", icon: "🖼️", type: "file" },
          playAreas: { title: "Play Areas", icon: "🖼️", type: "file" },
        },
      },
      dogPhotos: {
        title: "Dog Photos",
        icon: "📁",
        type: "folder",
        children: {
          show: { title: "Show Photos", icon: "🖼️", type: "file" },
          puppy: { title: "Puppy Photos", icon: "🖼️", type: "file" },
          daily: { title: "Daily Life", icon: "🖼️", type: "file" },
        },
      },
    },
  },
  emailApp: {
    title: "Email",
    icon: "📧",
    type: "file",
  },
  communityHub: {
    title: "Messenger",
    icon: "💬",
    type: "file", // Changed from "root" to "file"
  },
  contactInfo: {
    title: "Contact & Info",
    icon: "📇",
    type: "root",
    children: {
      contact: {
        title: "Contact Information",
        icon: "📁",
        type: "folder",
        children: {
          location: {
            title: "Location & Directions",
            icon: "📄",
            type: "file",
          },
          phone: { title: "Phone Numbers", icon: "📄", type: "file" },
          email: { title: "Email Addresses", icon: "📄", type: "file" },
        },
      },
      booking: {
        title: "Book a Service",
        icon: "📁",
        type: "folder",
        children: {
          grooming: { title: "Grooming Appointment", icon: "📄", type: "file" },
          boarding: { title: "Boarding Request", icon: "📄", type: "file" },
          training: { title: "Training Inquiry", icon: "📄", type: "file" },
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


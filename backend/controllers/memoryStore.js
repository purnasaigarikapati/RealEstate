// Resilient In-Memory Fallback Datastore for EstateHub India
const bcrypt = require('bcryptjs');

const initialUsers = [
  {
    _id: "user-admin-1",
    name: "Admin Director",
    email: "admin@estatehub.in",
    passwordHash: bcrypt.hashSync("admin123", 10),
    role: "admin",
    phone: "+91 98200 00199",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    favorites: ["prop-101"]
  },
  {
    _id: "user-rahul-1",
    name: "Rahul Sharma",
    email: "rahul@example.in",
    passwordHash: bcrypt.hashSync("user123", 10),
    role: "user",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    favorites: ["prop-102"]
  }
];

const initialProperties = [
  {
    _id: "prop-101",
    title: "The Imperial Seaface Villa",
    description: "Perched gracefully along Mumbai's prime coastal boulevard, The Imperial Seaface Villa offers unhindered Arabian Sea views, a private temperature-controlled infinity pool, smart home automation, private elevators, and Italian marble finishes throughout.",
    price: 145000000, // 14.5 Crore INR
    purpose: "sale",
    propertyType: "Villa",
    status: "approved",
    featured: true,
    address: "Bandra Sea Face, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400050",
    bedrooms: 5,
    bathrooms: 6,
    area: 7200,
    parking: 4,
    yearBuilt: 2023,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Arabian Sea Panoramic View",
      "Private Heated Swimming Pool",
      "Smart Home Automation",
      "Private High-Speed Elevator",
      "EV Charging Bays",
      "24/7 Multi-Tier Security"
    ],
    owner: {
      _id: "user-admin-1",
      name: "Priya Sharma",
      email: "priya.sharma@estatehub.in",
      phone: "+91 98200 45678"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "prop-102",
    title: "Worli Skyline Glass Penthouse",
    description: "An extraordinary dual-level penthouse located on the 52nd floor of Worli's premier luxury tower. Features a 360-degree view of Mumbai's skyline and Bandra-Worli Sea Link, imported Poggenpohl kitchen, wraparound deck, and bespoke designer furnishings.",
    price: 180000000, // 18 Crore INR
    purpose: "sale",
    propertyType: "Penthouse",
    status: "approved",
    featured: true,
    address: "Dr. Annie Besant Road, Worli",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400018",
    bedrooms: 4,
    bathrooms: 5,
    area: 5800,
    parking: 3,
    yearBuilt: 2024,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Sky Deck",
      "Sea Link View",
      "Concierge & Valet Desk",
      "Temperature Controlled Indoor Pool",
      "Spa & Steam Wellness Room"
    ],
    owner: {
      _id: "user-admin-1",
      name: "Vikram Malhotra",
      email: "vikram.m@estatehub.in",
      phone: "+91 98190 12345"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "prop-103",
    title: "Jubilee Hills Grand Bungalow",
    description: "Architectural masterpiece spread across a sprawling 1200 sq yard plot in Hyderabad's most exclusive enclave. Boasts a private home theater, manicured lawns, water bodies, private gym, and high-security smart compound.",
    price: 87500000, // 8.75 Crore INR
    purpose: "sale",
    propertyType: "House",
    status: "approved",
    featured: true,
    address: "Road No. 36, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    zipCode: "500033",
    bedrooms: 5,
    bathrooms: 6,
    area: 8500,
    parking: 5,
    yearBuilt: 2022,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Manicured Lawn & Gazebo",
      "Private Home Cinema 4K",
      "Full 100% DG Power Backup",
      "Automated Security Gates"
    ],
    owner: {
      _id: "user-admin-1",
      name: "Priya Sharma",
      email: "priya.sharma@estatehub.in",
      phone: "+91 98200 45678"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "prop-104",
    title: "Indiranagar Modern Terrace Flat",
    description: "Contemporary 3 BHK residence located in Bengaluru's cultural and lifestyle hub. Featuring teakwood flooring, private balcony garden, Italian modular kitchen, and walkable access to 100ft Road and metro.",
    price: 85000, // 85,000 INR / month
    purpose: "rent",
    propertyType: "Apartment",
    status: "approved",
    featured: false,
    address: "12th Main Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    zipCode: "560038",
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    parking: 2,
    yearBuilt: 2021,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "100% Power Backup",
      "Rooftop Infinity Pool",
      "Covered 2-Car Stilt Parking",
      "High Speed Fiber WiFi"
    ],
    owner: {
      _id: "user-rahul-1",
      name: "Rohan Iyer",
      email: "rohan.iyer@estatehub.in",
      phone: "+91 98450 98765"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "prop-109",
    title: "Amaravati Horizon Luxury Villa",
    description: "Located in the heart of Guntur's prime residential district near Lakshmipuram, this palatial 4 BHK luxury villa offers exquisite granite architecture, private landscaped garden, terrace gazebo, smart home automation, and swift connectivity to the Amaravati Capital Region.",
    price: 32500000, // 3.25 Crore INR
    purpose: "sale",
    propertyType: "Villa",
    status: "approved",
    featured: true,
    address: "Lakshmipuram Main Road",
    city: "Guntur",
    state: "Andhra Pradesh",
    zipCode: "522007",
    bedrooms: 4,
    bathrooms: 4.5,
    area: 4800,
    parking: 3,
    yearBuilt: 2024,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Landscaped Private Lawn",
      "Solar Rooftop System",
      "100% Generator Backup",
      "Automated Security Gates",
      "Modular Italian Kitchen",
      "Close to Amaravati Express Way"
    ],
    owner: {
      _id: "user-admin-1",
      name: "Suresh Reddy",
      email: "suresh.reddy@estatehub.in",
      phone: "+91 98480 12345"
    },
    createdAt: new Date().toISOString()
  }
];

const initialEnquiries = [
  {
    _id: "enq-1",
    propertyTitle: "The Imperial Seaface Villa",
    name: "Sunita Kapoor",
    email: "sunita.kapoor@example.in",
    phone: "+91 98200 99881",
    message: "I would like to schedule a private walkthrough this Saturday morning.",
    status: "new",
    createdAt: new Date().toISOString()
  }
];

class MemoryStore {
  constructor() {
    this.users = [...initialUsers];
    this.properties = [...initialProperties];
    this.enquiries = [...initialEnquiries];
  }
}

const memoryStore = new MemoryStore();

module.exports = memoryStore;

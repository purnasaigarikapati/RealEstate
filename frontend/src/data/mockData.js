// Sample realistic properties for EstateHub India (INR & Indian Cities)
export const SAMPLE_PROPERTIES = [
  {
    _id: "prop-101",
    id: "prop-101",
    title: "The Imperial Seaface Villa",
    slug: "the-imperial-seaface-villa",
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
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Arabian Sea Panoramic View",
      "Private Heated Swimming Pool",
      "Smart Home Automation",
      "Private High-Speed Elevator",
      "EV Charging Bays",
      "Landscaped Terrace Garden",
      "24/7 Multi-Tier Security",
      "Centralized VRV Air Conditioning"
    ],
    owner: {
      _id: "agent-1",
      name: "Priya Sharma",
      email: "priya.sharma@estatehub.in",
      phone: "+91 98200 45678",
      role: "agent",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    createdAt: "2025-01-15T10:00:00.000Z"
  },
  {
    _id: "prop-102",
    id: "prop-102",
    title: "Worli Skyline Glass Penthouse",
    slug: "worli-skyline-glass-penthouse",
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
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Sky Deck",
      "Sea Link View",
      "Concierge & Valet Desk",
      "Clubhouse & Squash Court",
      "Temperature Controlled Indoor Pool",
      "Spa & Steam Wellness Room"
    ],
    owner: {
      _id: "agent-2",
      name: "Vikram Malhotra",
      email: "vikram.m@estatehub.in",
      phone: "+91 98190 12345",
      role: "agent",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    createdAt: "2025-02-01T12:00:00.000Z"
  },
  {
    _id: "prop-103",
    id: "prop-103",
    title: "Jubilee Hills Grand Bungalow",
    slug: "jubilee-hills-grand-bungalow",
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
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Manicured Lawn & Gazebo",
      "Private Home Cinema 4K",
      "Solar Power Generation",
      "Full 100% DG Power Backup",
      "Servant Quarters (2 Rooms)",
      "Automated Security Gates"
    ],
    owner: {
      _id: "agent-1",
      name: "Priya Sharma",
      email: "priya.sharma@estatehub.in",
      phone: "+91 98200 45678",
      role: "agent",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    createdAt: "2025-02-10T14:30:00.000Z"
  },
  {
    _id: "prop-104",
    id: "prop-104",
    title: "Indiranagar Modern Terrace Flat",
    slug: "indiranagar-modern-terrace-flat",
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
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-ae1b46000e58?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "100% Power Backup",
      "Rooftop Infinity Pool",
      "Gymnasium & Yoga Studio",
      "Covered 2-Car Stilt Parking",
      "Gated Community Security",
      "High Speed Fiber WiFi"
    ],
    owner: {
      _id: "agent-3",
      name: "Rohan Iyer",
      email: "rohan.iyer@estatehub.in",
      phone: "+91 98450 98765",
      role: "agent",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    createdAt: "2025-02-18T09:15:00.000Z"
  },
  {
    _id: "prop-105",
    id: "prop-105",
    title: "DLF Golf Course Road Luxury Suite",
    slug: "dlf-golf-course-road-luxury-suite",
    description: "Ultra-luxury 4 BHK apartment with breathtaking views of the Aravalli hills and the championship golf course. Finished with imported marble, VRV climate control, double-height ceiling lobby, and 5-star concierge services.",
    price: 38000000, // 3.8 Crore INR
    purpose: "sale",
    propertyType: "Apartment",
    status: "approved",
    featured: true,
    address: "Golf Course Road, DLF Phase 5",
    city: "Gurugram",
    state: "Haryana",
    zipCode: "122002",
    bedrooms: 4,
    bathrooms: 4.5,
    area: 4100,
    parking: 3,
    yearBuilt: 2023,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Golf Course Frontage",
      "Olympic Size Swimming Pool",
      "Tennis & Badminton Courts",
      "Clubhouse with Fine Dining",
      "Multi-Tier Security & Biometrics",
      "EV Charging Stations"
    ],
    owner: {
      _id: "agent-2",
      name: "Vikram Malhotra",
      email: "vikram.m@estatehub.in",
      phone: "+91 98190 12345",
      role: "agent",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    createdAt: "2025-02-22T16:00:00.000Z"
  },
  {
    _id: "prop-106",
    id: "prop-106",
    title: "Koregaon Park Garden Villa",
    slug: "koregaon-park-garden-villa",
    description: "Nestled in Pune's most prestigious green neighborhood, this serene villa combines heritage tranquility with modern architecture. Private manicured lawn, wooden deck, high ceilings, and zen courtyard.",
    price: 24500000, // 2.45 Crore INR
    purpose: "sale",
    propertyType: "Villa",
    status: "approved",
    featured: false,
    address: "Lane 5, Koregaon Park",
    city: "Pune",
    state: "Maharashtra",
    zipCode: "411001",
    bedrooms: 4,
    bathrooms: 4,
    area: 3600,
    parking: 2,
    yearBuilt: 2021,
    images: [
      "https://images.unsplash.com/photo-1502005229762-ae1b46000e58?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Zen Garden",
      "Solar Water Heating",
      "Covered Verandah Lounge",
      "Gated Society with CCTV",
      "Rainwater Harvesting"
    ],
    owner: {
      _id: "agent-3",
      name: "Rohan Iyer",
      email: "rohan.iyer@estatehub.in",
      phone: "+91 98450 98765",
      role: "agent",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    createdAt: "2025-02-24T11:20:00.000Z"
  },
  {
    _id: "prop-107",
    id: "prop-107",
    title: "Candolim Portuguese Heritage Villa",
    slug: "candolim-portuguese-heritage-villa",
    description: "Restored luxury Indo-Portuguese villa with a private plunge pool and lush coconut palm surroundings. Situated 5 minutes from Candolim Beach, perfect for luxury holiday living or executive retreat.",
    price: 150000, // 1,50,000 INR / month
    purpose: "rent",
    propertyType: "Villa",
    status: "approved",
    featured: false,
    address: "Fort Aguada Road, Candolim",
    city: "Goa",
    state: "Goa",
    zipCode: "403515",
    bedrooms: 3,
    bathrooms: 3.5,
    area: 3100,
    parking: 2,
    yearBuilt: 2020,
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Plunge Pool",
      "High Speed Fiber WiFi",
      "Housekeeping & Chef On Request",
      "Fully Air Conditioned",
      "Beach Proximity"
    ],
    owner: {
      _id: "agent-1",
      name: "Priya Sharma",
      email: "priya.sharma@estatehub.in",
      phone: "+91 98200 45678",
      role: "agent",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    createdAt: "2025-02-25T15:45:00.000Z"
  },
  {
    _id: "prop-108",
    id: "prop-108",
    title: "Whitefield IT Tech Park Commercial Suite",
    slug: "whitefield-it-tech-park-commercial-suite",
    description: "Grade-A fully furnished commercial office space in Bengaluru's Silicon Valley corridor. Ideal for IT/Fintech startups or enterprise branch offices with conference rooms and high-speed dedicated lease lines.",
    price: 220000, // 2,20,000 INR / month
    purpose: "rent",
    propertyType: "Commercial",
    status: "approved",
    featured: false,
    address: "ITPL Main Road, Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    zipCode: "560066",
    bedrooms: 0,
    bathrooms: 3,
    area: 4500,
    parking: 6,
    yearBuilt: 2022,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "100% Dual Power Backup",
      "Central HVAC Chilling",
      "Server Room with Raised Flooring",
      "Biometric Access & Turnstiles",
      "Dedicated Reserved Parking"
    ],
    owner: {
      _id: "agent-3",
      name: "Rohan Iyer",
      email: "rohan.iyer@estatehub.in",
      phone: "+91 98450 98765",
      role: "agent",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    createdAt: "2025-02-26T08:30:00.000Z"
  },
  {
    _id: "prop-109",
    id: "prop-109",
    title: "Amaravati Horizon Luxury Villa",
    slug: "amaravati-horizon-luxury-villa",
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
      _id: "agent-1",
      name: "Suresh Reddy",
      email: "suresh.reddy@estatehub.in",
      phone: "+91 98480 12345",
      role: "agent",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    createdAt: "2025-02-27T08:00:00.000Z"
  }
];

export const PROPERTY_TYPES = ["House", "Apartment", "Villa", "Penthouse", "Commercial"];

export const POPULAR_LOCATIONS = [
  {
    name: "Guntur",
    state: "Andhra Pradesh (HQ)",
    count: 36,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    count: 48,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Bengaluru",
    state: "Karnataka",
    count: 62,
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    count: 34,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Delhi NCR",
    state: "Delhi / Haryana",
    count: 55,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kulkarni",
    role: "Angel Investor & Founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "EstateHub made finding our family villa in Bandra effortless. The transparent paperwork, verified title check, and clear Indian Rupee price breakdown gave us total peace of mind."
  },
  {
    id: 2,
    name: "Ananya Deshmukh",
    role: "Senior Director, IT Services",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "Listing our Indiranagar Bengaluru property on EstateHub attracted genuine high-intent buyers in less than 3 weeks. Zero spam, top-tier client screening."
  },
  {
    id: 3,
    name: "Siddharth Verma",
    role: "Architectural Consultant",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "The visual presentation, precise floor space parameters, and Indian Rupee (Crore/Lakh) pricing filters make EstateHub the most polished real estate portal in India."
  }
];

export const SAMPLE_USERS = [
  {
    _id: "user-admin",
    name: "Admin Director",
    email: "admin@estatehub.in",
    role: "admin",
    phone: "+91 98200 00199",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  },
  {
    _id: "user-john",
    name: "Rahul Sharma",
    email: "rahul@example.in",
    role: "user",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
  }
];

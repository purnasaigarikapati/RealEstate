const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Property = require('./models/Property');
const Enquiry = require('./models/Enquiry');

const SAMPLE_PROPERTIES_SEED = [
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
    title: "DLF Golf Course Road Luxury Suite",
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
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Golf Course Frontage",
      "Olympic Size Swimming Pool",
      "Clubhouse with Fine Dining",
      "Multi-Tier Security & Biometrics"
    ]
  },
  {
    title: "Candolim Portuguese Heritage Villa",
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
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Plunge Pool",
      "High Speed Fiber WiFi",
      "Beach Proximity",
      "Fully Air Conditioned"
    ]
  },
  {
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
    ]
  }
];

const seedData = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/estatehub';
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    console.log('[Seed] Connected to MongoDB');

    // Clear existing
    await User.deleteMany();
    await Property.deleteMany();
    await Enquiry.deleteMany();

    // Create Admin User
    const adminUser = await User.create({
      name: "Admin Director",
      email: "admin@estatehub.in",
      password: "admin123",
      role: "admin",
      phone: "+91 98200 00199",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    });

    // Create Standard User
    const standardUser = await User.create({
      name: "Rahul Sharma",
      email: "rahul@example.in",
      password: "user123",
      role: "user",
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
    });

    // Create Properties linked to Admin
    const propertiesWithAdmin = SAMPLE_PROPERTIES_SEED.map(prop => ({
      ...prop,
      owner: {
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        phone: adminUser.phone
      }
    }));

    await Property.insertMany(propertiesWithAdmin);
    console.log(`[Seed] Successfully seeded ${propertiesWithAdmin.length} Indian properties and 2 users!`);
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error.message);
    process.exit(1);
  }
};

seedData();

# EstateHub India — Real Estate Management System

EstateHub India is a full-stack commercial-grade real estate platform designed for property buyers, tenants, agents, and platform administrators across India. All pricing, valuation, and search parameters are configured in **Indian Rupees (INR ₹)** with Lakh and Crore denominations across prime metropolitan markets (Guntur, Amaravati, Mumbai, Bengaluru, Delhi NCR, Hyderabad, Pune, Goa).

**Corporate Headquarters**: Lakshmipuram Main Road, Guntur, Andhra Pradesh 522007.

---

## 🚀 Key Features

1. **Marketplace & Home Experience**
   - High-impact hero section with property search bar tailored to Indian markets (Guntur, Mumbai, Bengaluru, Hyderabad, Pune, etc.).
   - Price range filters in **Lakhs and Crores** (e.g. Under ₹50 Lakh, ₹1 - ₹5 Crore, ₹50,000/mo rent).
   - Dynamic counter metrics bar (1,250+ active listings, 980+ closed transactions).
   - Featured luxury sea-face villas, penthouses, and Guntur Amaravati luxury estates.
   - Popular Indian real estate market showcases & property category browser.
   - Client testimonial grid and commercial footer with **Guntur Corporate Headquarters** coordinates.

2. **Property Listings & Advanced Filtering**
   - Real-time search across titles, addresses, cities, and property types.
   - Multi-criteria filtering: Purpose (Sale / Rent), Category (Villa, Apartment, Penthouse, House, Commercial), Bedrooms, and Price ranges in INR.
   - Sorting options: Price (Low to High, High to Low), Newest, and Area size (Sq Ft).
   - Card displays with Indian Rupee formatting (`₹14.5 Cr`, `₹3.25 Cr`, `₹85 Lakh`, `₹85,000/mo`).
   - 1-click **Get Directions** shortcut on every property card.

3. **Property Details Page with Live Google Map**
   - Interactive image viewer with multi-photo thumbnail switcher.
   - Comprehensive specifications grid: Bedrooms, Bathrooms, Sq Ft, Garages, Year Built.
   - Full description & interactive checklist of amenities (Pool, Power Backup, EV Charger, etc.).
   - **Interactive Live Google Map Embed**: Displays the exact street, locality, and neighborhood.
   - **Get Directions Navigation Action**: Instantly launches turn-by-turn driving, walking, or transit directions in Google Maps.
   - **Open in Google Maps**: Inspect street view and satellite views.
   - Verified Indian Real Estate Agent contact card (+91 phone numbers) with direct enquiry submission form.
   - Recommended similar properties.

4. **Instant Buy Property & Secure Escrow Booking**
   - **One-Click Buy Button**: Located in the property header and sticky sidebar.
   - **Login Protection**: If an unauthenticated guest clicks "Buy Property", they are prompted with a friendly warning and smoothly redirected to `/login`. Upon logging in, they are immediately brought back to complete their purchase.
   - **Interactive Purchase Modal**:
     - Calculates a standard **2% Token Advance** in INR (₹) to reserve the property.
     - Buyer auto-filled name, email, phone number, and pan / id notes.
     - Payment selection: **UPI / QR Code**, **Net Banking (IMPS/NEFT)**, **RTGS Wire Transfer**, and **RERA Escrow Cheque**.
     - Terms agreement check under RERA compliance guidelines.
     - Instant order confirmation dialog with a unique Order Tracking ID (e.g., `EH-PUR-171829392`).
   - **Dashboard Integration**: User can track all their confirmed property purchases in the new **My Purchases** tab.

5. **Authentication & User Dashboard**
   - JWT-based authentication with bcrypt password encryption.
   - Role-based authorization (`user`, `agent`, `admin`).
   - One-click demo credentials on the login screen for testing.
   - User Dashboard with four dedicated tabs:
     - **My Listings**: View, edit, or delete self-listed properties.
     - **My Purchases**: Real-time order log with token advance amounts, payment method, and confirmed escrow status.
     - **Saved Favorites**: Track bookmarked properties.
     - **My Enquiries**: Monitor status of submitted tour/enquiry requests.

5. **Sell / List Property**
   - Multi-section submission form with INR (₹) price inputs.
   - Real-time **Verify on Google Maps** and **Test Directions** buttons.
   - Instant sample photo preset buttons or custom URL inputs.
   - Form input validation on client and server.

6. **Admin Dashboard**
   - Platform metrics: Total properties, users, enquiries, and total portfolio valuation in Crores (`₹ ... Cr`).
   - Moderation table: Approve, reject, or permanently delete property listings.
   - User directory management: View registered users and promote/demote roles.
   - Enquiry lead management queue.

7. **Database & Resilient Fallback**
   - Connected to MongoDB (`mongodb://localhost:27017/estatehub`).
   - **Zero-Crash In-Memory Fallback**: If local MongoDB is ever offline, the application automatically activates an in-memory sample database so the frontend and backend operate without errors!

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, React Router DOM v6, Lucide React, Modern Responsive CSS
- **Backend**: Node.js, Express.js, CORS, Dotenv, JSON Web Tokens (JWT), Bcrypt.js, Mongoose
- **Database**: MongoDB (Seeded with luxury properties in Guntur, Mumbai, Bengaluru, Gurugram, Hyderabad, Goa)
- **Currency**: Indian Rupee (INR ₹) formatted with Indian numbering system

---

## 🔑 Demo Accounts

Use the one-click demo fill buttons on the `/login` page or enter:

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@estatehub.in` | `admin123` |
| **Regular User** | `rahul@example.in` | `user123` |

---

## 🏃 Commands to Start Frontend and Backend

Open two separate terminal windows in your VS Code workspace:

### Terminal 1: Backend Server (Port 5000)
```powershell
cd backend
npm start
```
*Health check URL:* `http://localhost:5000/api/health`

### Terminal 2: Frontend Development Server (Port 5173)
```powershell
cd frontend
npm run dev
```
*Open in browser:* `http://localhost:5173`

---

### (Optional) Re-seed Database
To reset and re-seed the MongoDB database with sample properties:
```powershell
cd backend
npm run seed
```

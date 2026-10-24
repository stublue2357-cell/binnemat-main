// Fallback vector SVG appliance placeholder (guaranteed zero broken images)
export const SAFE_SVG_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23F4EFE6"/><rect x="50" y="50" width="300" height="200" rx="16" fill="%23FFFFFF" stroke="%23C49A45" stroke-width="2.5"/><path d="M120 150h160M120 180h100" stroke="%23E2D8C3" stroke-width="4" stroke-linecap="round"/><circle cx="270" cy="100" r="14" fill="%23C49A45"/><text x="50%" y="42%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-weight="bold" font-size="22" fill="%23111111">BINNEMAT</text><text x="50%" y="78%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="%23A67C2E">Premium Home Appliance</text></svg>`;

export const MOCK_CATEGORIES = [
  { 
    id: 1, 
    name: "Winter Collection (Electric Geysers)", 
    slug: "winter-collection", 
    count: 14, 
    image: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-storage.jpg",
    desc: "Instant & storage electric water heaters with Italian Incoloy heating elements and anti-scaling enamel tanks."
  },
  { 
    id: 2, 
    name: "Summer Collection (BLDC & Electric Fans)", 
    slug: "summer-collection", 
    count: 18, 
    image: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bldc-fan.jpg",
    desc: "Ultra low power 30W BLDC inverter ceiling fans, silent aerofoil blades, and high-CFM exhaust fans."
  },
  { 
    id: 3, 
    name: "Cooking Stoves & Built-in Hobs", 
    slug: "stoves-hobs", 
    count: 12, 
    image: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/glass-hob.jpg",
    desc: "Toughened 8mm tempered glass built-in hobs, cast iron pan trivets, and digital touch infrared/induction cooktops."
  },
  { 
    id: 4, 
    name: "Instant Water Heaters & Kitchen Geysers", 
    slug: "kitchen-appliances", 
    count: 8, 
    image: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-instant.jpg",
    desc: "Continuous 3-second instant digital water heaters with digital LED temperature indicators."
  }
];

// 1. WINTER PRODUCTS: GEYSERS & WATER HEATERS
export const MOCK_WINTER_PRODUCTS = [
  {
    id: 101,
    name: "Binnemat Sapphire 35L Digital Storage Electric Geyser",
    slug: "binnemat-sapphire-35l-geyser",
    category: "winter-collection",
    subCategory: "storage-geysers",
    price: 36500,
    formatted_price: "Rs. 36,500",
    badge: "SAPPHIRE ENAMEL",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-storage.jpg" }],
    description: "Equipped with heavy glasslined sapphire enamel tank and 2000W Italian Incoloy 840 heating element. Retains boiling hot water for over 24 hours.",
    specs: { "Tank Material": "Sapphire Glasslined Enamel Steel", "Heating Element": "2000W Italian Incoloy 840", "Capacity": "35 Liters (Family Sizing)", "Thermostat": "Dual Safety Thermal Cutout 75°C", "Warranty": "7 Years Tank, 2 Years Element" }
  },
  {
    id: 102,
    name: "Binnemat FastHeat 9kW Instant Digital Electric Geyser",
    slug: "binnemat-fastheat-instant-geyser",
    category: "winter-collection",
    subCategory: "instant-geysers",
    price: 24800,
    formatted_price: "Rs. 24,800",
    badge: "3-SEC INSTANT",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-instant.jpg" }],
    description: "Compact wall-mount design delivering continuous hot water in 3 seconds. Multi-stage power adjustment with digital LED temperature display.",
    specs: { "Heating Speed": "Continuous 3-Second Hot Water", "Power Consumption": "Smart Inverter 3kW - 9kW", "Safety": "Built-in ELCB Earth Leakage Breaker", "Water Pressure": "Works on Ultra-Low 0.02 MPa", "Warranty": "2 Years Official Warranty" }
  },
  {
    id: 103,
    name: "Super Asia Heavy Duty 50L Rust-Proof Storage Geyser",
    slug: "super-asia-50l-geyser",
    category: "winter-collection",
    subCategory: "storage-geysers",
    price: 42500,
    formatted_price: "Rs. 42,500",
    badge: "50 LITERS HEAVY",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-storage.jpg" }],
    description: "Extra-large 50-liter capacity for multiple bathrooms. High-density polyurethane foam insulation prevents thermal leakage.",
    specs: { "Capacity": "50 Liters Heavy Duty", "Insulation": "High-Density German Polyurethane", "Element": "2500W Pure Copper Spiral Element", "Anode": "Magnesium Sacrificial Rod for Hard Water", "Warranty": "5 Years Official Warranty" }
  },
  {
    id: 104,
    name: "Binnemat Dual Hybrid Gas & 30L Electric Geyser",
    slug: "binnemat-hybrid-gas-electric-geyser",
    category: "winter-collection",
    subCategory: "hybrid-heaters",
    price: 48000,
    formatted_price: "Rs. 48,000",
    badge: "DUAL HYBRID",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-storage.jpg" }],
    description: "Switch seamlessly between Natural Gas and Electricity during gas load-shedding hours. Imported Italian burner assembly with automatic electric thermostat.",
    specs: { "Operation": "Dual Hybrid (Natural/LPG Gas + Electric)", "Gas Burner": "Low Pressure Blue Flame Jet", "Electric Rating": "1500W Auxiliary Heating", "Tank Gauge": "14-Gauge Heavy Steel", "Warranty": "3 Years Comprehensive" }
  },
  {
    id: 105,
    name: "NasGas Premium 20L Fast-Recovery Kitchen Geyser",
    slug: "nasgas-premium-20l-geyser",
    category: "winter-collection",
    subCategory: "instant-geysers",
    price: 28500,
    formatted_price: "Rs. 28,500",
    badge: "COMPACT KITCHEN",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-instant.jpg" }],
    description: "Specially sized for under-sink and kitchen dishwashing installations. Instant recovery system ensures endless hot water.",
    specs: { "Capacity": "20 Liters Under-Sink Fit", "Element": "1500W Rapid Recovery", "Installation": "Wall/Floor Mount Compatible", "Thermostat": "Automatic Pre-Set 65°C", "Warranty": "2 Years Official Warranty" }
  }
];

// 2. SUMMER PRODUCTS: BLDC & ELECTRIC FANS
export const MOCK_SUMMER_PRODUCTS = [
  {
    id: 201,
    name: "Binnemat AeroGold 30W BLDC Smart Inverter Ceiling Fan",
    slug: "binnemat-aerogold-30w-bldc",
    category: "summer-collection",
    subCategory: "bldc-ceiling-fans",
    price: 13900,
    formatted_price: "Rs. 13,900",
    badge: "30W BLDC SAVER",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bldc-fan.jpg" }],
    description: "Cuts ceiling fan electricity consumption from 85W down to just 30W. Operates on 12V DC Solar/Battery or 220V AC with RF Smart Remote.",
    specs: { "Power Consumption": "30 Watts at Top Speed (Speed 6)", "Motor Type": "100% Pure Copper BLDC Motor", "Control": "RF Smart Remote with Timer Function", "Voltage Range": "90V - 260V Inverter Stabilization", "Warranty": "2 Years Motor Replacement" }
  },
  {
    id: 202,
    name: "Royal Deluxe Matte Black 32W Inverter Ceiling Fan",
    slug: "royal-deluxe-32w-fan",
    category: "summer-collection",
    subCategory: "bldc-ceiling-fans",
    price: 14500,
    formatted_price: "Rs. 14,500",
    badge: "AERODYNAMIC",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bldc-fan.jpg" }],
    description: "Luxury matte black aluminum aerofoil blades engineered for silent high air throw in master bedrooms and drawing halls.",
    specs: { "Air Delivery": "260 m3/min High CFM", "Power Draw": "32W Eco-Inverter Drive", "Noise Level": "Under 38dB (Whisper Quiet)", "Blades": "Rust-Free Aerodynamic Aluminum", "Warranty": "2 Years Warranty" }
  },
  {
    id: 203,
    name: "Binnemat SilentBreeze 12-Inch Low-Noise Exhaust Fan",
    slug: "binnemat-silentbreeze-exhaust",
    category: "summer-collection",
    subCategory: "exhaust-fans",
    price: 5400,
    formatted_price: "Rs. 5,400",
    badge: "SILENT MOTOR",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/bldc-fan.jpg" }],
    description: "High-velocity extraction motor designed for modern kitchens and humid bathrooms. Backdraft shutter prevents odor reverse.",
    specs: { "Louver": "Automatic Gravity Backdraft Shutters", "Motor": "Ball Bearing Copper Motor", "Size": "12-Inch High Suction", "Warranty": "1 Year Replacement Warranty" }
  }
];

// 3. COOKING PRODUCTS: STOVES & BUILT-IN HOBS
export const MOCK_STOVES_HOBS = [
  {
    id: 301,
    name: "Binnemat QuadFlame 4-Burner Tempered Glass Built-in Hob",
    slug: "binnemat-quadflame-4-burner-hob",
    category: "stoves-hobs",
    subCategory: "built-in-hobs",
    price: 34500,
    formatted_price: "Rs. 34,500",
    badge: "8MM TEMPERED GLASS",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/glass-hob.jpg" }],
    description: "Sleek 8mm shatter-proof tempered glass surface with Italian brass burners and heavy cast iron wok pan trivets.",
    specs: { "Glass": "8mm Thermal Shock Tempered Glass", "Burners": "1 Triple-Ring Wok + 2 Semi-Rapid + 1 Auxiliary", "Ignition": "Continuous Pulse Battery Ignition", "Safety": "Flame Failure Device (Auto Gas Cutoff)", "Warranty": "2 Years Official Warranty" }
  },
  {
    id: 302,
    name: "Binnemat Ceramic Pro Double Induction & Infrared Cooktop",
    slug: "binnemat-ceramic-pro-induction",
    category: "stoves-hobs",
    subCategory: "infrared-stoves",
    price: 26800,
    formatted_price: "Rs. 26,800",
    badge: "DUAL INDUCTION",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/glass-hob.jpg" }],
    description: "100% flameless electric cooking. Left induction zone for rapid boiling, right infrared zone compatible with all metal pots and clay pans.",
    specs: { "Cooking Zones": "1 Induction + 1 Infrared Ceramic Plate", "Max Wattage": "3500W Combined Digital Controller", "Surface": "German Micro-Crystalline Scratchless Panel", "Control": "Touch Slider with Child Lock & Timer", "Warranty": "1 Year Replacement Warranty" }
  },
  {
    id: 303,
    name: "Dawlance 3-Burner Premium Cast Iron Kitchen Hob",
    slug: "dawlance-3-burner-glass-hob",
    category: "stoves-hobs",
    subCategory: "built-in-hobs",
    price: 29500,
    formatted_price: "Rs. 29,500",
    badge: "CAST IRON PAN",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/glass-hob.jpg" }],
    description: "Optimized for natural Sui gas and LPG cylinders. Ergonomic metallic control knobs with integrated micro-switch sparks.",
    specs: { "Configuration": "3 High-Efficiency Brass Burners", "Pan Support": "Heavy Enamelled Cast Iron Grids", "Gas Pressure": "Optimized for Low Sui Gas Pressure", "Warranty": "1 Year Official Warranty" }
  },
  {
    id: 304,
    name: "Binnemat Vortex 90cm Auto Heat-Clean Kitchen Range Hood",
    slug: "binnemat-vortex-90cm-hood",
    category: "stoves-hobs",
    subCategory: "range-hoods",
    price: 38900,
    formatted_price: "Rs. 38,900",
    badge: "AUTO HEAT-CLEAN",
    rating: 5,
    images: [{ src: "https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/glass-hob.jpg" }],
    description: "Powerful 1200 m3/hr extraction eliminates heavy Pakistani oil vapors and masala fumes with motion wave gesture sensors.",
    specs: { "Airflow": "1200 m3/hr Commercial Grade Suction", "Filter": "Double Baffle Stainless Steel (Dishwasher Safe)", "Clean System": "Thermal Auto Heat Cleaning Oil Collector", "Lighting": "Dual Warm LED Cooking Spots", "Warranty": "3 Years Motor Warranty" }
  }
];

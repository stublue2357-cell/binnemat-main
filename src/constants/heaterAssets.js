// High-Fidelity 100% Offline Vector Illustrations for 7 Heaters & Water Heaters
// Guaranteed zero broken images, ultra-sharp on all screens (Retina/4K), and zero external dependencies

export const HEATER_MOCK_SVGS = {
  // 1. Sapphire 35L Storage Electric Geyser
  SAPPHIRE_35L: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    <defs>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%23E2E8F0"/>
        <stop offset="30%" stop-color="%23FFFFFF"/>
        <stop offset="70%" stop-color="%23F1F5F9"/>
        <stop offset="100%" stop-color="%23CBD5E1"/>
      </linearGradient>
      <linearGradient id="goldStrip" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="%23C49A45"/>
        <stop offset="50%" stop-color="%23FBBF24"/>
        <stop offset="100%" stop-color="%2392400E"/>
      </linearGradient>
      <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="%23F59E0B" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="%23B45309" stop-opacity="0"/>
      </radialGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="%23000000" flood-opacity="0.45"/>
      </filter>
    </defs>
    <!-- Tank Body Shadow -->
    <rect x="150" y="70" width="200" height="320" rx="45" fill="none" filter="url(%23shadow)"/>
    <!-- Main Cylindrical Tank -->
    <rect x="150" y="70" width="200" height="320" rx="45" fill="url(%23bodyGrad)" stroke="%23CBD5E1" stroke-width="3"/>
    <!-- Top Cap Dome -->
    <path d="M150 115 C150 70 350 70 350 115 Z" fill="%23F8FAFC" stroke="%23CBD5E1" stroke-width="1.5"/>
    <!-- Bottom Base Dome -->
    <path d="M150 345 C150 390 350 390 350 345 Z" fill="%23E2E8F0" stroke="%2394A3B8" stroke-width="1.5"/>
    <!-- Vertical Gold Accent Inlay -->
    <rect x="245" y="75" width="10" height="310" rx="5" fill="url(%23goldStrip)"/>
    <!-- Circular Digital Control Pod -->
    <circle cx="250" cy="230" r="52" fill="%230F172A" stroke="%23C49A45" stroke-width="3.5" filter="url(%23shadow)"/>
    <!-- Ambient Heat Ring -->
    <circle cx="250" cy="230" r="44" fill="none" stroke="%23F59E0B" stroke-width="2.5" stroke-dasharray="180 50"/>
    <!-- Digital LED Temp Display -->
    <text x="250" y="226" font-family="sans-serif" font-weight="900" font-size="28" fill="%23FDE68A" text-anchor="middle">68°C</text>
    <text x="250" y="248" font-family="sans-serif" font-weight="700" font-size="9" fill="%2338BDF8" letter-spacing="2" text-anchor="middle">OPTIMAL HEAT</text>
    <!-- Brand Badge -->
    <text x="250" y="145" font-family="serif" font-weight="900" font-size="16" fill="%230F172A" letter-spacing="4" text-anchor="middle">BINNEMAT</text>
    <text x="250" y="162" font-family="sans-serif" font-weight="700" font-size="8" fill="%23C49A45" letter-spacing="3" text-anchor="middle">SAPPHIRE 35L</text>
    <!-- Status LED -->
    <circle cx="250" cy="180" r="4" fill="%2310B981"/>
    <!-- Lower Incoloy 840 Badge -->
    <rect x="200" y="315" width="100" height="18" rx="9" fill="%230F172A" stroke="%23334155" stroke-width="1"/>
    <text x="250" y="327" font-family="sans-serif" font-weight="bold" font-size="8" fill="%2394A3B8" text-anchor="middle">ITALIAN INCOLOY 840</text>
    <!-- Copper Pipe Connectors -->
    <rect x="195" y="388" width="18" height="35" rx="4" fill="%23B91C1C"/>
    <rect x="287" y="388" width="18" height="35" rx="4" fill="%230284C7"/>
    <!-- Fastening Rings -->
    <circle cx="204" cy="405" r="5" fill="%23CBD5E1"/>
    <circle cx="296" cy="405" r="5" fill="%23CBD5E1"/>
  </svg>`,

  // 2. FastHeat 9kW Instant Digital Electric Geyser
  FASTHEAT_9KW: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    <defs>
      <linearGradient id="fastBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%231E293B"/>
        <stop offset="50%" stop-color="%230F172A"/>
        <stop offset="100%" stop-color="%23020617"/>
      </linearGradient>
      <linearGradient id="glassSheen" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%23FFFFFF" stop-opacity="0.15"/>
        <stop offset="50%" stop-color="%23FFFFFF" stop-opacity="0.02"/>
        <stop offset="100%" stop-color="%23000000" stop-opacity="0.4"/>
      </linearGradient>
      <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23F43F5E"/>
        <stop offset="50%" stop-color="%23FB923C"/>
        <stop offset="100%" stop-color="%23C49A45"/>
      </linearGradient>
      <filter id="fShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="%23000000" flood-opacity="0.6"/>
      </filter>
    </defs>
    <!-- Modern Wall Mount Chassis -->
    <rect x="140" y="60" width="220" height="360" rx="36" fill="url(%23fastBody)" stroke="%23334155" stroke-width="2.5" filter="url(%23fShadow)"/>
    <!-- Tempered Glass Mirror Bevel -->
    <rect x="144" y="64" width="212" height="352" rx="32" fill="url(%23glassSheen)" stroke="url(%23roseGold)" stroke-width="1.5"/>
    <!-- Brand Logo Top -->
    <text x="250" y="115" font-family="serif" font-weight="900" font-size="16" fill="%23FFFFFF" letter-spacing="4" text-anchor="middle">BINNEMAT</text>
    <text x="250" y="132" font-family="sans-serif" font-weight="800" font-size="9" fill="%23F43F5E" letter-spacing="2" text-anchor="middle">FASTHEAT • 9000W INVERTER</text>
    <!-- Ultra Modern LED Segment Display -->
    <rect x="175" y="160" width="150" height="110" rx="20" fill="%23000000" stroke="%231E293B" stroke-width="2"/>
    <!-- Digital Heat Number -->
    <text x="250" y="235" font-family="sans-serif" font-weight="900" font-size="52" fill="%23FF0055" text-anchor="middle">55°</text>
    <text x="290" y="200" font-family="sans-serif" font-weight="bold" font-size="14" fill="%23FF5577">C</text>
    <!-- 3-Second Speed Meter -->
    <rect x="195" y="250" width="110" height="6" rx="3" fill="%231E293B"/>
    <rect x="195" y="250" width="90" height="6" rx="3" fill="url(%23roseGold)"/>
    <!-- Touch Control Buttons -->
    <circle cx="190" cy="320" r="18" fill="%231E293B" stroke="%23334155" stroke-width="1.5"/>
    <text x="190" y="325" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23FFFFFF" text-anchor="middle">−</text>
    <circle cx="250" cy="320" r="22" fill="%23F43F5E" filter="url(%23fShadow)"/>
    <circle cx="250" cy="320" r="10" fill="none" stroke="%23FFFFFF" stroke-width="2"/>
    <line x1="250" y1="312" x2="250" y2="320" stroke="%23FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <circle cx="310" cy="320" r="18" fill="%231E293B" stroke="%23334155" stroke-width="1.5"/>
    <text x="310" y="325" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23FFFFFF" text-anchor="middle">+</text>
    <!-- Lower Water Safety Status -->
    <rect x="180" y="370" width="140" height="20" rx="10" fill="%23020617" stroke="%231E293B" stroke-width="1"/>
    <circle cx="195" cy="380" r="4" fill="%2338BDF8"/>
    <text x="254" y="384" font-family="sans-serif" font-weight="bold" font-size="8" fill="%2394A3B8" text-anchor="middle">ELCB SHOCK PROOF</text>
    <!-- Bottom Chrome Connectors -->
    <rect x="185" y="420" width="22" height="30" rx="4" fill="%23CBD5E1"/>
    <rect x="293" y="420" width="22" height="30" rx="4" fill="%23CBD5E1"/>
  </svg>`,

  // 3. Inferno 2400W Ceramic Radiant Room Heater
  INFERNO_2400W: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    <defs>
      <linearGradient id="infBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%2318181B"/>
        <stop offset="50%" stop-color="%2327272A"/>
        <stop offset="100%" stop-color="%2309090B"/>
      </linearGradient>
      <radialGradient id="heatCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="%23FF4500"/>
        <stop offset="50%" stop-color="%23EA580C"/>
        <stop offset="90%" stop-color="%23B45309"/>
        <stop offset="100%" stop-color="%2318181B"/>
      </radialGradient>
      <filter id="iGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="24" flood-color="%23FF4500" flood-opacity="0.8"/>
      </filter>
    </defs>
    <!-- Tower Chassis -->
    <rect x="160" y="50" width="180" height="370" rx="30" fill="url(%23infBody)" stroke="%233F3F46" stroke-width="3"/>
    <!-- Top Touch Panel Cap -->
    <path d="M160 85 C160 50 340 50 340 85 Z" fill="%2327272A" stroke="%2352525B" stroke-width="1.5"/>
    <!-- Glowing Ceramic Honeycomb Matrix Window -->
    <rect x="180" y="105" width="140" height="250" rx="16" fill="%23000000" stroke="%2371717A" stroke-width="2"/>
    <rect x="185" y="110" width="130" height="240" rx="12" fill="url(%23heatCore)" filter="url(%23iGlow)"/>
    <!-- Mesh Protective Grill Lines -->
    <g stroke="%23000000" stroke-width="2" opacity="0.6">
      <line x1="185" y1="130" x2="315" y2="130"/>
      <line x1="185" y1="155" x2="315" y2="155"/>
      <line x1="185" y1="180" x2="315" y2="180"/>
      <line x1="185" y1="205" x2="315" y2="205"/>
      <line x1="185" y1="230" x2="315" y2="230"/>
      <line x1="185" y1="255" x2="315" y2="255"/>
      <line x1="185" y1="280" x2="315" y2="280"/>
      <line x1="185" y1="305" x2="315" y2="305"/>
      <line x1="185" y1="330" x2="315" y2="330"/>
      <!-- Vertical Grill -->
      <line x1="210" y1="110" x2="210" y2="350"/>
      <line x1="235" y1="110" x2="235" y2="350"/>
      <line x1="260" y1="110" x2="260" y2="350"/>
      <line x1="285" y1="110" x2="285" y2="350"/>
    </g>
    <!-- Brand Slogan -->
    <text x="250" y="380" font-family="serif" font-weight="900" font-size="14" fill="%23F4EFE6" letter-spacing="3" text-anchor="middle">BINNEMAT</text>
    <text x="250" y="396" font-family="sans-serif" font-weight="bold" font-size="8" fill="%23F59E0B" letter-spacing="2" text-anchor="middle">CERAMIC PTC • 2400W</text>
    <!-- Heavy Weighted Turntable Base -->
    <ellipse cx="250" cy="430" rx="120" ry="22" fill="%2309090B" stroke="%23D97706" stroke-width="2.5"/>
    <ellipse cx="250" cy="430" rx="90" ry="14" fill="%2318181B"/>
    <!-- 120° Oscillation Arc Graphic -->
    <path d="M190 430 A60 10 0 0 1 310 430" stroke="%23F59E0B" stroke-width="2" fill="none" stroke-dasharray="6 3"/>
  </svg>`,

  // 4. Super Asia Heavy Duty 50L Rust-Proof Storage Geyser
  SUPER_ASIA_50L: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    <defs>
      <linearGradient id="saBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%2394A3B8"/>
        <stop offset="30%" stop-color="%23F1F5F9"/>
        <stop offset="70%" stop-color="%23E2E8F0"/>
        <stop offset="100%" stop-color="%2364748B"/>
      </linearGradient>
      <filter id="saShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="%23000000" flood-opacity="0.5"/>
      </filter>
    </defs>
    <!-- Jumbo Tank Body -->
    <rect x="135" y="60" width="230" height="340" rx="55" fill="url(%23saBody)" stroke="%2364748B" stroke-width="3" filter="url(%23saShadow)"/>
    <!-- Upper Heavy Duty Reinforcement Ring -->
    <rect x="135" y="120" width="230" height="12" fill="%23475569"/>
    <!-- Lower Heavy Duty Reinforcement Ring -->
    <rect x="135" y="320" width="230" height="12" fill="%23475569"/>
    <!-- Analog Pressure & Temp Gauge -->
    <circle cx="250" cy="220" r="48" fill="%23FFFFFF" stroke="%230F172A" stroke-width="4"/>
    <circle cx="250" cy="220" r="42" fill="none" stroke="%23DC2626" stroke-width="3" stroke-dasharray="120 180"/>
    <!-- Dial Needle -->
    <line x1="250" y1="220" x2="275" y2="195" stroke="%23DC2626" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="250" cy="220" r="6" fill="%230F172A"/>
    <text x="250" y="244" font-family="sans-serif" font-weight="900" font-size="12" fill="%230F172A" text-anchor="middle">50 LITERS</text>
    <text x="250" y="256" font-family="sans-serif" font-weight="bold" font-size="7" fill="%2364748B" text-anchor="middle">HEAVY GAUGE STEEL</text>
    <!-- Brand Badging -->
    <rect x="185" y="80" width="130" height="26" rx="13" fill="%231E293B"/>
    <text x="250" y="97" font-family="serif" font-weight="900" font-size="13" fill="%23FBBF24" letter-spacing="3" text-anchor="middle">SUPER ASIA</text>
    <!-- Safety Relief Valve on Right -->
    <rect x="365" y="160" width="25" height="35" rx="5" fill="%23D97706"/>
    <circle cx="377" cy="170" r="6" fill="%23F59E0B"/>
    <!-- Pipe Outlets -->
    <rect x="180" y="398" width="22" height="40" rx="4" fill="%23EF4444"/>
    <rect x="298" y="398" width="22" height="40" rx="4" fill="%233B82F6"/>
  </svg>`,

  // 5. Binnemat Dual Hybrid Gas & 30L Electric Geyser
  DUAL_HYBRID_GAS: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    <defs>
      <linearGradient id="hybBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%231E293B"/>
        <stop offset="35%" stop-color="%23334155"/>
        <stop offset="70%" stop-color="%231E293B"/>
        <stop offset="100%" stop-color="%230F172A"/>
      </linearGradient>
      <radialGradient id="blueFlame" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="%2338BDF8"/>
        <stop offset="50%" stop-color="%230284C7"/>
        <stop offset="90%" stop-color="%231E3A8A"/>
        <stop offset="100%" stop-color="%23000000"/>
      </radialGradient>
      <filter id="flameGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="14" flood-color="%2338BDF8" flood-opacity="0.9"/>
      </filter>
    </defs>
    <!-- Tank Body -->
    <rect x="145" y="60" width="210" height="350" rx="40" fill="url(%23hybBody)" stroke="%23C49A45" stroke-width="2.5"/>
    <!-- Dual Power Indicator Strip -->
    <rect x="145" y="125" width="210" height="10" fill="%23C49A45"/>
    <text x="250" y="105" font-family="serif" font-weight="900" font-size="16" fill="%23F8FAFC" letter-spacing="4" text-anchor="middle">BINNEMAT</text>
    <text x="250" y="120" font-family="sans-serif" font-weight="bold" font-size="8" fill="%23FBBF24" letter-spacing="2" text-anchor="middle">DUAL HYBRID GAS & ELECTRIC</text>
    <!-- Upper Electric Thermostat Control -->
    <rect x="180" y="150" width="140" height="65" rx="14" fill="%230F172A" stroke="%23334155" stroke-width="1.5"/>
    <text x="250" y="175" font-family="sans-serif" font-weight="bold" font-size="10" fill="%2394A3B8" text-anchor="middle">ELECTRIC MODE (1500W)</text>
    <circle cx="215" cy="195" r="5" fill="%2310B981"/>
    <text x="250" y="198" font-family="sans-serif" font-weight="bold" font-size="9" fill="%23FDE68A" text-anchor="middle">AUTO SWITCHING</text>
    <!-- Lower Gas Pilot Flame Viewing Portal -->
    <circle cx="250" cy="290" r="50" fill="%23000000" stroke="%23475569" stroke-width="4"/>
    <circle cx="250" cy="290" r="42" fill="url(%23blueFlame)" filter="url(%23flameGlow)"/>
    <!-- Stylized Dancing Blue Flame Icon -->
    <path d="M250 255 C240 280 230 295 240 310 C245 318 255 318 260 310 C270 295 260 280 250 255 Z" fill="%23BAE6FD"/>
    <text x="250" y="360" font-family="sans-serif" font-weight="bold" font-size="9" fill="%2338BDF8" letter-spacing="2" text-anchor="middle">BLUE JET BURNER</text>
    <!-- Gas Line Valve & Pipes -->
    <rect x="180" y="410" width="18" height="30" rx="4" fill="%23EF4444"/>
    <rect x="240" y="410" width="20" height="32" rx="4" fill="%23EAB308"/>
    <rect x="302" y="410" width="18" height="30" rx="4" fill="%233B82F6"/>
  </svg>`,

  // 6. NasGas Premium 20L Fast-Recovery Kitchen Geyser
  NASGAS_20L: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    <defs>
      <linearGradient id="ngBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%23F8FAFC"/>
        <stop offset="50%" stop-color="%23FFFFFF"/>
        <stop offset="100%" stop-color="%23E2E8F0"/>
      </linearGradient>
    </defs>
    <!-- Compact Cube Shape for Under-Sink -->
    <rect x="155" y="90" width="190" height="280" rx="35" fill="url(%23ngBody)" stroke="%23CBD5E1" stroke-width="3"/>
    <!-- Green Eco Halo Ring -->
    <circle cx="250" cy="210" r="48" fill="%23064E3B" stroke="%23059669" stroke-width="4"/>
    <circle cx="250" cy="210" r="38" fill="%23022C22"/>
    <text x="250" y="206" font-family="sans-serif" font-weight="900" font-size="20" fill="%2334D399" text-anchor="middle">20L</text>
    <text x="250" y="224" font-family="sans-serif" font-weight="bold" font-size="8" fill="%23A7F3D0" text-anchor="middle">KITCHEN SLIM</text>
    <!-- Brand Tag -->
    <text x="250" y="140" font-family="serif" font-weight="900" font-size="16" fill="%230F172A" letter-spacing="4" text-anchor="middle">NASGAS</text>
    <text x="250" y="156" font-family="sans-serif" font-weight="bold" font-size="8" fill="%23059669" letter-spacing="2" text-anchor="middle">RAPID RECOVERY 1500W</text>
    <!-- Quick-connect fittings at top -->
    <rect x="190" y="55" width="22" height="35" rx="4" fill="%23EF4444"/>
    <rect x="288" y="55" width="22" height="35" rx="4" fill="%233B82F6"/>
    <!-- Bottom Rubber Feet -->
    <rect x="175" y="370" width="30" height="12" rx="4" fill="%23334155"/>
    <rect x="295" y="370" width="30" height="12" rx="4" fill="%23334155"/>
  </svg>`,

  // 7. Quartz Ultra-Quiet Tower Room Heater
  QUARTZ_TOWER: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
    <defs>
      <linearGradient id="qBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="%230F172A"/>
        <stop offset="50%" stop-color="%231E293B"/>
        <stop offset="100%" stop-color="%23020617"/>
      </linearGradient>
      <linearGradient id="qTubes" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="%23FF5722"/>
        <stop offset="50%" stop-color="%23FF9800"/>
        <stop offset="100%" stop-color="%23FF5722"/>
      </linearGradient>
      <filter id="qGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="18" flood-color="%23FF5722" flood-opacity="0.85"/>
      </filter>
    </defs>
    <!-- Vertical Tower -->
    <rect x="180" y="45" width="140" height="375" rx="22" fill="url(%23qBody)" stroke="%23334155" stroke-width="2.5"/>
    <!-- Inner Heat Chamber -->
    <rect x="195" y="95" width="110" height="255" rx="10" fill="%23000000" stroke="%23475569" stroke-width="1.5"/>
    <!-- Dual Glowing Quartz Rods -->
    <rect x="220" y="115" width="16" height="215" rx="8" fill="url(%23qTubes)" filter="url(%23qGlow)"/>
    <rect x="264" y="115" width="16" height="215" rx="8" fill="url(%23qTubes)" filter="url(%23qGlow)"/>
    <!-- Protective Wire Mesh -->
    <g stroke="%23CBD5E1" stroke-width="1" opacity="0.35">
      <line x1="195" y1="130" x2="305" y2="130"/>
      <line x1="195" y1="160" x2="305" y2="160"/>
      <line x1="195" y1="190" x2="305" y2="190"/>
      <line x1="195" y1="220" x2="305" y2="220"/>
      <line x1="195" y1="250" x2="305" y2="250"/>
      <line x1="195" y1="280" x2="305" y2="280"/>
      <line x1="195" y1="310" x2="305" y2="310"/>
    </g>
    <!-- Top Selector Knob -->
    <circle cx="250" cy="70" r="14" fill="%23334155" stroke="%23F97316" stroke-width="2"/>
    <line x1="250" y1="62" x2="250" y2="70" stroke="%23FFFFFF" stroke-width="2"/>
    <!-- Brand Label -->
    <text x="250" y="375" font-family="serif" font-weight="900" font-size="12" fill="%23FFFFFF" letter-spacing="3" text-anchor="middle">BINNEMAT</text>
    <text x="250" y="390" font-family="sans-serif" font-weight="bold" font-size="7" fill="%23F97316" letter-spacing="2" text-anchor="middle">QUARTZ INFRARED 1800W</text>
    <!-- Circular Swivel Base -->
    <ellipse cx="250" cy="425" rx="90" ry="16" fill="%23020617" stroke="%23F97316" stroke-width="2"/>
  </svg>`
};

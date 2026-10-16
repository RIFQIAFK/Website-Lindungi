/**
 * LINDUNING WEB - Vector Illustrations and Cultural Assets
 * Authentic visual representations of Komering cultural elements
 */

const CulturalAssets = {
  // Traditional Tanjak & Mahkota Ornamen
  getTanjakGold: () => `
    <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A" />
          <stop offset="50%" stop-color="#FACC15" />
          <stop offset="100%" stop-color="#CA8A04" />
        </linearGradient>
        <linearGradient id="darkGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#CA8A04" />
          <stop offset="100%" stop-color="#854D0E" />
        </linearGradient>
      </defs>
      <!-- Center Crown Peak -->
      <path d="M50 5 L62 35 L78 22 L70 52 L88 45 L78 72 L22 72 L12 45 L30 52 L22 22 L38 35 Z" fill="url(#goldGrad)" stroke="#78350F" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Filigree Details -->
      <circle cx="50" cy="24" r="4.5" fill="#DC2626" stroke="#FEF08A" stroke-width="1.5" />
      <circle cx="36" cy="42" r="3" fill="#0284C7" stroke="#FEF08A" stroke-width="1" />
      <circle cx="64" cy="42" r="3" fill="#0284C7" stroke="#FEF08A" stroke-width="1" />
      <path d="M50 32 Q50 55 50 68" stroke="url(#darkGoldGrad)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M38 52 Q50 58 62 52" stroke="url(#darkGoldGrad)" stroke-width="2" fill="none"/>
      <!-- Base Headband -->
      <rect x="20" y="65" width="60" height="9" rx="3" fill="url(#darkGoldGrad)" stroke="#78350F" stroke-width="1.5"/>
      <line x1="25" y1="69" x2="75" y2="69" stroke="#FEF08A" stroke-width="1.5" stroke-dasharray="2 3"/>
    </svg>
  `,

  // Mascot Boy in Komering traditional attire (Baju Lambis, Tanjak, Songket)
  getMascot: (pose = 'waving', prefix) => {
    const p = prefix || ('m_' + Math.floor(Math.random() * 10000) + '_');
    return `
    <svg viewBox="0 0 220 280" class="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${p}skin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFE4C4"/>
          <stop offset="100%" stop-color="#FED7AA"/>
        </linearGradient>
        <linearGradient id="${p}hair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#262626"/>
          <stop offset="100%" stop-color="#171717"/>
        </linearGradient>
        <linearGradient id="${p}songketRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#991B1B"/>
          <stop offset="50%" stop-color="#DC2626"/>
          <stop offset="100%" stop-color="#7F1D1D"/>
        </linearGradient>
        <linearGradient id="${p}tanjakCloth" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#B91C1C"/>
          <stop offset="70%" stop-color="#7F1D1D"/>
        </linearGradient>
      </defs>

      <!-- Traditional Tanjak Headgear -->
      <g id="${p}headgear">
        <path d="M60 70 C55 35 75 10 110 8 C145 10 165 35 160 70 Z" fill="url(#${p}tanjakCloth)" stroke="#78350F" stroke-width="2.5"/>
        <!-- Golden Tanjak Crest Peaks -->
        <path d="M110 6 L124 35 L145 20 L135 50 L158 45 L145 70 L75 70 L62 45 L85 50 L75 20 L96 35 Z" fill="#FACC15" stroke="#78350F" stroke-width="2"/>
        <path d="M90 40 Q110 30 130 40" stroke="#B45309" stroke-width="2" fill="none"/>
        <circle cx="110" cy="26" r="4.5" fill="#DC2626" stroke="#FEF08A" stroke-width="1.5"/>
        <!-- Headband strip with golden songket embroidery pattern -->
        <path d="M65 65 Q110 75 155 65 L158 80 Q110 90 62 80 Z" fill="#991B1B" stroke="#78350F" stroke-width="2"/>
        <path d="M68 72 Q110 81 152 72" stroke="#FDE047" stroke-width="3" stroke-dasharray="3,3" fill="none"/>
      </g>

      <!-- Head & Face -->
      <path d="M72 75 C72 60 148 60 148 75 C152 110 148 135 110 135 C72 135 68 110 72 75 Z" fill="url(#${p}skin)" stroke="#78350F" stroke-width="2.5"/>
      <!-- Hair sideburns -->
      <path d="M68 75 Q72 95 78 88" stroke="#171717" stroke-width="4" stroke-linecap="round"/>
      <path d="M152 75 Q148 95 142 88" stroke="#171717" stroke-width="4" stroke-linecap="round"/>
      <!-- Cheeks Blush -->
      <ellipse cx="85" cy="105" rx="8" ry="4.5" fill="#F87171" opacity="0.45"/>
      <ellipse cx="135" cy="105" rx="8" ry="4.5" fill="#F87171" opacity="0.45"/>
      <!-- Big Friendly Eyes -->
      <ellipse cx="90" cy="94" rx="7.5" ry="9" fill="#1C1917"/>
      <circle cx="92.5" cy="91" r="3" fill="#FFFFFF"/>
      <ellipse cx="130" cy="94" rx="7.5" ry="9" fill="#1C1917"/>
      <circle cx="132.5" cy="91" r="3" fill="#FFFFFF"/>
      <!-- Eyebrows -->
      <path d="M82 82 Q90 77 98 82" stroke="#451A03" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M122 82 Q130 77 138 82" stroke="#451A03" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <!-- Nose -->
      <path d="M108 97 Q110 102 112 101" stroke="#D97706" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Cheerful Smile -->
      <path d="M96 112 Q110 126 124 112" stroke="#78350F" stroke-width="3" stroke-linecap="round" fill="#FFFFFF"/>
      <path d="M102 118 Q110 126 118 118" fill="#EF4444"/>

      <!-- Body / Baju Adat Lambis Komering (Black velvet with gold borders & embroidery) -->
      <g id="${p}body-attire">
        <path d="M72 135 L50 195 L80 200 L85 240 L135 240 L140 200 L170 195 L148 135 Z" fill="#18181B" stroke="#78350F" stroke-width="2.5"/>
        <!-- Gold center collar & buttons -->
        <path d="M105 135 L105 190 L115 190 L115 135 Z" fill="#FACC15" stroke="#78350F" stroke-width="1.5"/>
        <circle cx="110" cy="145" r="2.5" fill="#78350F"/>
        <circle cx="110" cy="158" r="2.5" fill="#78350F"/>
        <circle cx="110" cy="172" r="2.5" fill="#78350F"/>
        <circle cx="110" cy="184" r="2.5" fill="#78350F"/>
        <!-- Golden chest ornaments (Bungo Cempako Komering) -->
        <path d="M85 145 Q110 160 135 145" stroke="#FDE047" stroke-width="2.5" fill="none"/>
        <path d="M88 155 Q110 170 132 155" stroke="#FACC15" stroke-width="2" stroke-dasharray="2,2" fill="none"/>
        <!-- Sampang / Selempang Songket Merah Emas -->
        <path d="M78 136 L138 200 L122 205 L68 144 Z" fill="url(#${p}songketRed)" opacity="0.95" stroke="#78350F" stroke-width="1.5"/>
        <path d="M74 140 L132 198" stroke="#FDE047" stroke-width="2" stroke-dasharray="3,2"/>
        <!-- Kain Songket Pinggang -->
        <rect x="78" y="190" width="64" height="25" rx="3" fill="url(#${p}songketRed)" stroke="#78350F" stroke-width="2"/>
        <path d="M80 195 L140 195 M80 205 L140 205" stroke="#FDE047" stroke-width="2" stroke-dasharray="4,2"/>
        <!-- Celana Pantalon Hitam -->
        <rect x="85" y="215" width="22" height="45" rx="4" fill="#18181B" stroke="#78350F" stroke-width="2"/>
        <rect x="113" y="215" width="22" height="45" rx="4" fill="#18181B" stroke="#78350F" stroke-width="2"/>
        <line x1="86" y1="250" x2="106" y2="250" stroke="#FACC15" stroke-width="2"/>
        <line x1="114" y1="250" x2="134" y2="250" stroke="#FACC15" stroke-width="2"/>
        <!-- Sepatu Slop Kulit -->
        <ellipse cx="96" cy="264" rx="14" ry="7" fill="#78350F"/>
        <ellipse cx="124" cy="264" rx="14" ry="7" fill="#78350F"/>
      </g>

      <!-- Arms & Hands -->
      ${pose === 'waving' ? `
        <!-- Left arm resting / friendly -->
        <path d="M72 140 Q45 160 55 185" stroke="#18181B" stroke-width="14" stroke-linecap="round"/>
        <circle cx="56" cy="190" r="9" fill="url(#${p}skin)" stroke="#78350F" stroke-width="2"/>
        <!-- Right arm waving high! -->
        <g class="origin-[145px_140px] animate-[waveHand_2.5s_infinite_ease-in-out]">
          <path d="M148 140 Q175 125 185 95" stroke="#18181B" stroke-width="14" stroke-linecap="round"/>
          <line x1="175" y1="105" x2="183" y2="97" stroke="#FACC15" stroke-width="3"/>
          <ellipse cx="188" cy="88" rx="10" ry="11" fill="url(#${p}skin)" stroke="#78350F" stroke-width="2"/>
          <!-- Fingers -->
          <circle cx="183" cy="80" r="3.5" fill="url(#${p}skin)"/>
          <circle cx="189" cy="78" r="3.5" fill="url(#${p}skin)"/>
          <circle cx="195" cy="81" r="3.5" fill="url(#${p}skin)"/>
          <circle cx="198" cy="87" r="3" fill="url(#${p}skin)"/>
        </g>
      ` : `
        <!-- Both hands celebratory up! -->
        <path d="M72 140 Q35 115 45 85" stroke="#18181B" stroke-width="14" stroke-linecap="round"/>
        <circle cx="45" cy="80" r="10" fill="url(#${p}skin)" stroke="#78350F" stroke-width="2"/>
        <path d="M148 140 Q185 115 175 85" stroke="#18181B" stroke-width="14" stroke-linecap="round"/>
        <circle cx="175" cy="80" r="10" fill="url(#${p}skin)" stroke="#78350F" stroke-width="2"/>
      `}
    </svg>
  `;
  },

  // Rumah Adat Panggung Komering (Rumah Ulu Komering)
  getRumahAdat: () => `
    <svg viewBox="0 0 500 360" class="w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#9A3412" />
          <stop offset="50%" stop-color="#78350F" />
          <stop offset="100%" stop-color="#451A03" />
        </linearGradient>
        <linearGradient id="woodWall" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#D97706" />
          <stop offset="100%" stop-color="#92400E" />
        </linearGradient>
      </defs>

      <!-- Background River & Greenery -->
      <path d="M0 290 Q250 270 500 295 L500 360 L0 360 Z" fill="#38BDF8" opacity="0.7"/>
      <path d="M0 320 Q200 305 500 330 L500 360 L0 360 Z" fill="#0284C7" opacity="0.6"/>
      <!-- Riverbank Grass -->
      <ellipse cx="250" cy="315" rx="240" ry="25" fill="#22C55E"/>
      <ellipse cx="250" cy="325" rx="260" ry="20" fill="#15803D"/>

      <!-- Stilt Pillars (Tiang Kayu Unglen Panggung) -->
      <g stroke="#311102" stroke-width="2" fill="#78350F">
        <rect x="110" y="210" width="16" height="95" rx="2"/>
        <rect x="155" y="210" width="16" height="95" rx="2"/>
        <rect x="200" y="210" width="16" height="95" rx="2"/>
        <rect x="285" y="210" width="16" height="95" rx="2"/>
        <rect x="330" y="210" width="16" height="95" rx="2"/>
        <rect x="375" y="210" width="16" height="95" rx="2"/>
      </g>

      <!-- Wooden Staircase (Tangga Rumah Ulu) -->
      <g stroke="#451A03" stroke-width="2" fill="#B45309">
        <path d="M225 215 L205 310 L235 310 L255 215 Z" fill="#92400E"/>
        <line x1="222" y1="230" x2="252" y2="230" stroke="#FDE047" stroke-width="3"/>
        <line x1="218" y1="250" x2="248" y2="250" stroke="#FDE047" stroke-width="3"/>
        <line x1="214" y1="270" x2="244" y2="270" stroke="#FDE047" stroke-width="3"/>
        <line x1="210" y1="290" x2="240" y2="290" stroke="#FDE047" stroke-width="3"/>
      </g>

      <!-- Main Floor Deck & Foundation Beam -->
      <rect x="90" y="200" width="320" height="18" rx="4" fill="#B45309" stroke="#451A03" stroke-width="3"/>
      <line x1="95" y1="208" x2="405" y2="208" stroke="#FDE047" stroke-width="2"/>

      <!-- House Walls & Veranda (Beranda & Ruang Luan) -->
      <rect x="105" y="115" width="290" height="90" rx="2" fill="url(#woodWall)" stroke="#451A03" stroke-width="3"/>
      <!-- Wooden Planks Slats -->
      <line x1="140" y1="115" x2="140" y2="200" stroke="#78350F" stroke-width="2"/>
      <line x1="175" y1="115" x2="175" y2="200" stroke="#78350F" stroke-width="2"/>
      <line x1="210" y1="115" x2="210" y2="200" stroke="#78350F" stroke-width="2"/>
      <line x1="290" y1="115" x2="290" y2="200" stroke="#78350F" stroke-width="2"/>
      <line x1="325" y1="115" x2="325" y2="200" stroke="#78350F" stroke-width="2"/>
      <line x1="360" y1="115" x2="360" y2="200" stroke="#78350F" stroke-width="2"/>

      <!-- Carved Windows (Jendela Ukir Tradisional Komering) -->
      <g fill="#FEF3C7" stroke="#451A03" stroke-width="2.5">
        <rect x="125" y="135" width="35" height="45" rx="3"/>
        <rect x="340" y="135" width="35" height="45" rx="3"/>
        <!-- Window Grills / Carvings -->
        <line x1="125" y1="157" x2="160" y2="157" stroke="#CA8A04" stroke-width="2"/>
        <line x1="142" y1="135" x2="142" y2="180" stroke="#CA8A04" stroke-width="2"/>
        <line x1="340" y1="157" x2="375" y2="157" stroke="#CA8A04" stroke-width="2"/>
        <line x1="357" y1="135" x2="357" y2="180" stroke="#CA8A04" stroke-width="2"/>
      </g>

      <!-- Main Carved Doorway -->
      <rect x="230" y="135" width="40" height="65" rx="4" fill="#451A03" stroke="#FDE047" stroke-width="3"/>
      <circle cx="260" cy="170" r="3" fill="#FACC15"/>

      <!-- Balcony Railing -->
      <rect x="100" y="188" width="300" height="14" fill="#78350F" stroke="#311102" stroke-width="2"/>
      <path d="M105 192 H395" stroke="#FACC15" stroke-width="2" stroke-dasharray="6,4"/>

      <!-- Grand Limas Pelana Roof of Komering Architecture -->
      <path d="M250 25 L435 125 L65 125 Z" fill="url(#roofGrad)" stroke="#311102" stroke-width="4"/>
      <!-- Roof Ridge Ornaments (Simbar / Tanduk Kerbau Emas) -->
      <path d="M250 12 L242 26 L258 26 Z" fill="#FACC15" stroke="#78350F" stroke-width="2"/>
      <path d="M60 125 Q50 115 50 100 Q65 110 75 125 Z" fill="#FACC15" stroke="#78350F" stroke-width="1.5"/>
      <path d="M440 125 Q450 115 450 100 Q435 110 425 125 Z" fill="#FACC15" stroke="#78350F" stroke-width="1.5"/>
      <!-- Front Gable Carvings (Tebing Layar Ukiran Emas) -->
      <polygon points="250,45 370,118 130,118" fill="#78350F" stroke="#FACC15" stroke-width="3"/>
      <circle cx="250" cy="85" r="14" fill="#FACC15" stroke="#451A03" stroke-width="2"/>
      <path d="M242 85 Q250 75 258 85 Q250 95 242 85" fill="#DC2626"/>
    </svg>
  `,

  // Ningkuk Gathering Scene Illustration (Muda-mudi Berbalas Pantun & Selendang)
  getNingkukScene: () => `
    <svg viewBox="0 0 600 320" class="w-full h-full rounded-2xl drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FEF3C7"/>
          <stop offset="100%" stop-color="#FDE68A"/>
        </linearGradient>
      </defs>
      <!-- Traditional Balai / Serambi Adat -->
      <rect width="600" height="320" fill="url(#hallGrad)"/>
      <rect x="0" y="240" width="600" height="80" fill="#92400E"/>
      <line x1="0" y1="240" x2="600" y2="240" stroke="#FACC15" stroke-width="6"/>

      <!-- Festive Banners & Lampu Gantung -->
      <path d="M0 40 Q150 70 300 40 Q450 70 600 40" stroke="#DC2626" stroke-width="4" fill="none"/>
      <circle cx="150" cy="62" r="10" fill="#FACC15" stroke="#B45309" stroke-width="2"/>
      <circle cx="300" cy="40" r="12" fill="#FACC15" stroke="#B45309" stroke-width="2"/>
      <circle cx="450" cy="62" r="10" fill="#FACC15" stroke="#B45309" stroke-width="2"/>

      <!-- Center Ceremony Table with Betel Nut Box (Tepak Sirih Adat Komering) -->
      <ellipse cx="300" cy="245" rx="60" ry="18" fill="#78350F" stroke="#FACC15" stroke-width="3"/>
      <rect x="275" y="222" width="50" height="20" rx="4" fill="#FACC15" stroke="#78350F" stroke-width="2"/>
      <circle cx="300" cy="232" r="5" fill="#DC2626"/>

      <!-- The Selendang Adat being exchanged (Golden Red Silk Scarf) -->
      <path d="M210 180 Q300 135 390 180" stroke="#DC2626" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.9"/>
      <path d="M210 180 Q300 135 390 180" stroke="#FDE047" stroke-width="2" stroke-dasharray="4,4" fill="none"/>

      <!-- Left Group: Bujang Komering (Young men in black & gold jackets with tanjak) -->
      <g transform="translate(60, 110)">
        <!-- Boy 1 -->
        <circle cx="70" cy="40" r="22" fill="#FED7AA"/>
        <!-- Tanjak -->
        <path d="M50 35 L70 10 L90 35 Z" fill="#B91C1C" stroke="#FACC15" stroke-width="2"/>
        <rect x="45" y="60" width="50" height="80" rx="8" fill="#18181B" stroke="#FACC15" stroke-width="2"/>
        <path d="M55 75 Q70 95 85 75" stroke="#FACC15" stroke-width="3" fill="none"/>
        <!-- Boy 2 sitting -->
        <circle cx="130" cy="55" r="20" fill="#FED7AA"/>
        <path d="M112 50 L130 30 L148 50 Z" fill="#B91C1C" stroke="#FACC15" stroke-width="2"/>
        <rect x="110" y="75" width="40" height="65" rx="6" fill="#18181B" stroke="#FACC15" stroke-width="1.5"/>
      </g>

      <!-- Right Group: Gadis Komering (Young women in golden red Kurung & Songket with Mahkota Cempaka) -->
      <g transform="translate(360, 110)">
        <!-- Girl 1 extending scarf -->
        <circle cx="50" cy="40" r="22" fill="#FED7AA"/>
        <!-- Mahkota Cempaka / Sanggul Emas -->
        <path d="M30 35 L50 15 L70 35 Z" fill="#FACC15" stroke="#78350F" stroke-width="2"/>
        <circle cx="50" cy="22" r="5" fill="#DC2626"/>
        <rect x="25" y="60" width="50" height="80" rx="8" fill="#991B1B" stroke="#FACC15" stroke-width="2"/>
        <path d="M35 75 Q50 95 65 75" stroke="#FACC15" stroke-width="3" fill="none"/>
        <!-- Girl 2 smiling -->
        <circle cx="110" cy="55" r="20" fill="#FED7AA"/>
        <path d="M95 50 L110 32 L125 50 Z" fill="#FACC15" stroke="#78350F" stroke-width="2"/>
        <rect x="90" y="75" width="40" height="65" rx="6" fill="#991B1B" stroke="#FACC15" stroke-width="1.5"/>
      </g>

      <!-- Pantun Warahan Speech Bubbles -->
      <g class="animate-bounce">
        <!-- Bujang Bubble -->
        <rect x="110" y="55" width="120" height="36" rx="10" fill="#FFFFFF" stroke="#0284C7" stroke-width="2"/>
        <text x="170" y="77" font-family="'Nunito', sans-serif" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">"Kambang Melati..."</text>
        <!-- Gadis Bubble -->
        <rect x="370" y="55" width="130" height="36" rx="10" fill="#FFFFFF" stroke="#DC2626" stroke-width="2"/>
        <text x="435" y="77" font-family="'Nunito', sans-serif" font-size="12" font-weight="bold" fill="#B91C1C" text-anchor="middle">"...Harum di Hati!"</text>
      </g>
    </svg>
  `,

  // Motif Pucuk Rebung & Sisik Ikan khas Kain Kawai Kanduk Komering
  getMotifKain: () => `
    <svg viewBox="0 0 200 200" class="w-full h-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#78350F"/>
      <defs>
        <pattern id="komeringPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <!-- Diamond Sisik Ikan -->
          <polygon points="20,0 40,20 20,40 0,20" fill="#9A3412" stroke="#FACC15" stroke-width="1.5"/>
          <!-- Pucuk Rebung triangle inside -->
          <polygon points="20,5 30,20 10,20" fill="#FDE047"/>
          <polygon points="20,35 30,20 10,20" fill="#DC2626"/>
          <circle cx="20" cy="20" r="3" fill="#FFFFFF"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#komeringPattern)"/>
      <rect x="10" y="10" width="180" height="180" fill="none" stroke="#FDE047" stroke-width="4" rx="8"/>
    </svg>
  `,

  // Alat Musik Tradisional Kulintang / Kelittang Komering
  getAlatMusik: () => `
    <svg viewBox="0 0 240 180" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <!-- Wooden Stand Frame -->
      <rect x="20" y="80" width="200" height="35" rx="6" fill="#78350F" stroke="#FACC15" stroke-width="3"/>
      <!-- Legs -->
      <rect x="35" y="115" width="16" height="45" rx="3" fill="#451A03"/>
      <rect x="189" y="115" width="16" height="45" rx="3" fill="#451A03"/>
      <!-- 5 Golden Bonang / Kulintang Gongs -->
      <circle cx="45" cy="85" r="16" fill="#FACC15" stroke="#78350F" stroke-width="2"/>
      <circle cx="45" cy="85" r="5" fill="#B45309"/>
      <circle cx="82" cy="85" r="16" fill="#FACC15" stroke="#78350F" stroke-width="2"/>
      <circle cx="82" cy="85" r="5" fill="#B45309"/>
      <circle cx="120" cy="85" r="16" fill="#FACC15" stroke="#78350F" stroke-width="2"/>
      <circle cx="120" cy="85" r="5" fill="#B45309"/>
      <circle cx="158" cy="85" r="16" fill="#FACC15" stroke="#78350F" stroke-width="2"/>
      <circle cx="158" cy="85" r="5" fill="#B45309"/>
      <circle cx="195" cy="85" r="16" fill="#FACC15" stroke="#78350F" stroke-width="2"/>
      <circle cx="195" cy="85" r="5" fill="#B45309"/>
      <!-- Mallets / Pemukul Kayu Berbalut Kain -->
      <line x1="60" y1="50" x2="100" y2="75" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
      <circle cx="102" cy="76" r="6" fill="#DC2626"/>
      <line x1="175" y1="50" x2="140" y2="75" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
      <circle cx="138" cy="76" r="6" fill="#DC2626"/>
    </svg>
  `
};

window.CulturalAssets = CulturalAssets;

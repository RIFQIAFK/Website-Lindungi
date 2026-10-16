/**
 * LINDUNING WEB - Main Application Controller
 * Handles SPA navigation, culture modals, interactive mini-games, dynamic map, and quiz system
 */

function initApp() {
  // Initialize illustrations in containers
  renderInitialIllustrations();

  // Navigation handlers
  setupNavigation();

  // Settings Modal Handlers
  setupSettingsModal();

  // Accordion for Ningkuk
  setupNingkukAccordion();

  // Culture Cards Detail Modal
  setupMateriModal();

  // Games Engine
  setupGamesEngine();

  // Interactive Map Engine
  setupMapEngine();

  // Quiz Engine
  setupQuizEngine();

  // Add click sound effects to all buttons
  document.querySelectorAll('button, .clickable').forEach(el => {
    el.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* ============================================================
   1. Initial Illustration Render
   ============================================================ */
function renderInitialIllustrations() {
  const crownSlot = document.getElementById('logo-crown-slot');
  if (crownSlot) crownSlot.innerHTML = window.CulturalAssets.getTanjakGold();

  const heroMascot = document.getElementById('hero-mascot-slot');
  if (heroMascot) heroMascot.innerHTML = window.CulturalAssets.getMascot('waving', 'hm_');

  const dashMascot = document.getElementById('dash-mascot-icon');
  if (dashMascot) dashMascot.innerHTML = window.CulturalAssets.getMascot('waving', 'dm_');

  const heroHouse = document.getElementById('hero-house-slot');
  if (heroHouse) heroHouse.innerHTML = window.CulturalAssets.getRumahAdat();

  const ningkukSceneSlot = document.getElementById('ningkuk-scene-slot');
  if (ningkukSceneSlot) ningkukSceneSlot.innerHTML = window.CulturalAssets.getNingkukScene();

  const quizMascotSlot = document.getElementById('quiz-mascot-slot');
  if (quizMascotSlot) quizMascotSlot.innerHTML = window.CulturalAssets.getMascot('waving', 'qm_');

  const resultMascotSlot = document.getElementById('result-mascot-slot');
  if (resultMascotSlot) resultMascotSlot.innerHTML = window.CulturalAssets.getMascot('cheering', 'rm_');
}

/* ============================================================
   2. SPA Navigation System
   ============================================================ */
function setupNavigation() {
  const navLinks = document.querySelectorAll('[data-target]');
  const sections = document.querySelectorAll('main > section');

  function showSection(targetId) {
    sections.forEach(sec => {
      if (sec.id === targetId) {
        sec.classList.remove('hidden');
        sec.classList.add('block');
      } else {
        sec.classList.add('hidden');
        sec.classList.remove('block');
      }
    });

    // Update active nav link indicator
    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.dataset.target === targetId) {
        btn.classList.add('bg-amber-400', 'text-amber-950', 'shadow-md');
        btn.classList.remove('text-amber-900', 'hover:bg-amber-200');
      } else {
        btn.classList.remove('bg-amber-400', 'text-amber-950', 'shadow-md');
        btn.classList.add('text-amber-900', 'hover:bg-amber-200');
      }
    });

    // Scroll to top of section smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle section-specific activations
    if (targetId === 'games-section') {
      loadGame('tebak-gambar');
    } else if (targetId === 'peta-section') {
      selectMapLocation(0);
    } else if (targetId === 'kuis-section') {
      if (typeof restartQuiz === 'function' && quizCurrentIndex >= QUIZ_QUESTIONS.length) {
        restartQuiz();
      } else if (typeof loadQuizQuestion === 'function') {
        loadQuizQuestion();
      }
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      if (target) {
        showSection(target);
      }
      // Close mobile menu if open
      const mobileNav = document.getElementById('mobile-menu');
      if (mobileNav && !mobileNav.classList.contains('hidden')) {
        mobileNav.classList.add('hidden');
      }
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Quick CTA button in Hero
  const btnMulai = document.getElementById('btn-hero-mulai');
  if (btnMulai) {
    btnMulai.addEventListener('click', () => {
      showSection('dashboard-section');
    });
  }

  // Expose showSection globally
  window.navigateTo = showSection;
}

/* ============================================================
   3. Settings Modal & Audio Controls
   ============================================================ */
function setupSettingsModal() {
  const settingsModal = document.getElementById('settings-modal');
  const openBtn = document.getElementById('btn-open-settings');
  const closeBtn = document.getElementById('btn-close-settings');
  const soundToggleBtn = document.getElementById('btn-sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  
  // Modal sliders and switches
  const modalSoundSwitch = document.getElementById('setting-sound-switch');
  const modalMusicSlider = document.getElementById('setting-music-slider');
  const modalSfxSlider = document.getElementById('setting-sfx-slider');

  // Open modal
  if (openBtn && settingsModal) {
    openBtn.addEventListener('click', () => {
      settingsModal.classList.remove('hidden');
      settingsModal.classList.add('flex');
    });
  }

  // Close modal
  if (closeBtn && settingsModal) {
    closeBtn.addEventListener('click', () => {
      settingsModal.classList.add('hidden');
      settingsModal.classList.remove('flex');
    });
  }

  // Quick sound toggle button in navbar
  if (soundToggleBtn && soundIcon) {
    soundToggleBtn.addEventListener('click', () => {
      const isEnabled = window.soundEngine.toggleSound();
      updateSoundUI(isEnabled);
      if (modalSoundSwitch) modalSoundSwitch.checked = isEnabled;
    });
  }

  // Modal Sound Toggle
  if (modalSoundSwitch) {
    modalSoundSwitch.addEventListener('change', (e) => {
      const isEnabled = window.soundEngine.toggleSound(e.target.checked);
      updateSoundUI(isEnabled);
    });
  }

  // Music Slider
  if (modalMusicSlider) {
    modalMusicSlider.addEventListener('input', (e) => {
      window.soundEngine.setMusicVolume(e.target.value);
    });
  }

  // SFX Slider
  if (modalSfxSlider) {
    modalSfxSlider.addEventListener('input', (e) => {
      window.soundEngine.setSfxVolume(e.target.value);
    });
  }

  function updateSoundUI(isEnabled) {
    if (soundIcon) {
      if (isEnabled) {
        soundIcon.innerHTML = `
          <svg class="w-6 h-6 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"/>
          </svg>
        `;
      } else {
        soundIcon.innerHTML = `
          <svg class="w-6 h-6 text-red-700" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        `;
      }
    }
  }

  // Audio start on first user interaction anywhere
  const startAudioOnFirstClick = () => {
    window.soundEngine.init();
    if (window.soundEngine.musicEnabled && window.soundEngine.soundEnabled) {
      window.soundEngine.startMusic();
    }
    document.removeEventListener('click', startAudioOnFirstClick);
  };
  document.addEventListener('click', startAudioOnFirstClick);
}

/* ============================================================
   4. Accordion Logic for Pengenalan Ningkuk
   ============================================================ */
function setupNingkukAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion-btn');

  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.accordionTarget;
      const content = document.getElementById(targetId);
      const icon = btn.querySelector('.accordion-icon');

      if (!content) return;

      const isOpen = content.classList.contains('open');

      // Close all first for clean single-view accordion
      document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.accordion-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        content.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ============================================================
   5. Materi Budaya Detail Modal
   ============================================================ */
const MATERI_DATA = {
  pakaian: {
    title: "Pakaian Adat Suku Komering",
    tagline: "Keanggunan Beludru Bertabur Benang Emas dan Simbol Kehormatan",
    badge: "Busana Tradisional",
    color: "#D97706",
    content: `
      <p class="mb-4">Pakaian adat Suku Komering mencerminkan kemegahan budaya Melayu-Komering di Sumatera Selatan. Busana ini dikenakan pada momen-momen penting seperti upacara pernikahan, prosesi Ningkuk, dan penyambutan tamu kehormatan.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-amber-100/70 p-3.5 rounded-xl border border-amber-300">
          <h4 class="font-bold text-amber-900 font-title mb-1">👔 Busana Pria (Bujang / Pengantin Pria)</h4>
          <ul class="text-sm space-y-1.5 text-stone-700">
            <li><strong>Baju Lambis:</strong> Jas beludru hitam berhiaskan sulaman benang emas motif bunga cempaka.</li>
            <li><strong>Tanjak Komering:</strong> Penutup kepala runcing dengan ornamen emas lambang kepemimpinan dan marwah pria.</li>
            <li><strong>Kain Songket Komering:</strong> Dililitkan sebatas lutut dengan motif khas Kawai Kanduk.</li>
            <li><strong>Keris & Selempang:</strong> Simbol keberanian dan tanggung jawab keluarga.</li>
          </ul>
        </div>

        <div class="bg-rose-100/70 p-3.5 rounded-xl border border-rose-300">
          <h4 class="font-bold text-rose-950 font-title mb-1">👗 Busana Wanita (Gadis / Pengantin Wanita)</h4>
          <ul class="text-sm space-y-1.5 text-stone-700">
            <li><strong>Baju Kurung Beludru:</strong> Baju kurung warna merah marun atau merah tua bertabur manik keemasan.</li>
            <li><strong>Mahkota Cempako:</strong> Mahkota emas bertingkat dengan hiasan kembang melati bergoyang.</li>
            <li><strong>Kain Songket Lepus:</strong> Sarung tenun songket benang emas asli dengan kilau anggun.</li>
            <li><strong>Kalung Tapak Jajo:</strong> Kalung emas bertingkat lambang kesucian budi pekerti wanita Komering.</li>
          </ul>
        </div>
      </div>

      <div class="p-3 bg-emerald-100/80 rounded-xl border border-emerald-300 text-sm text-emerald-900">
        💡 <strong>Fakta Budaya:</strong> Dalam prosesi Ningkuk, para bujang memakai kopiah/tanjak rapi dan gadis mengenakan selendang songket yang menjadi sarana utama saling berbalas pantun dan menyerahkan tanda perkenalan!
      </div>
    `
  },
  rumah: {
    title: "Rumah Adat Panggung Komering (Rumah Ulu)",
    tagline: "Kearifan Arsitektur Tepi Sungai yang Harmonis dengan Alam",
    badge: "Arsitektur Kuno",
    color: "#B45309",
    content: `
      <p class="mb-4">Rumah Adat Suku Komering yang dikenal sebagai <strong>Rumah Ulu</strong> merupakan rumah panggung kayu khas yang dibangun berjejer menghadap aliran Sungai Komering. Rumah ini menjadi bukti kecerdasan nenek moyang dalam beradaptasi dengan siklus pasang surut sungai.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-amber-100/70 p-3.5 rounded-xl border border-amber-300">
          <h4 class="font-bold text-amber-900 font-title mb-1">🪵 Struktur & Tiang Bebas Banjir</h4>
          <p class="text-sm text-stone-700">Dibangun dengan tiang kayu ulin/unglen kokoh setinggi 2 hingga 3 meter di atas tanah. Kolong bawah rumah digunakan untuk menyimpan perahu ketek, hasil panen lada dan padi, serta melindungi keluarga dari luapan air sungai.</p>
        </div>

        <div class="bg-amber-100/70 p-3.5 rounded-xl border border-amber-300">
          <h4 class="font-bold text-amber-900 font-title mb-1">🏠 Pembagian Ruangan Filosofis</h4>
          <ul class="text-sm space-y-1 text-stone-700">
            <li><strong>Garang:</strong> Teras depan tempat mencuci kaki dan menyapa tamu.</li>
            <li><strong>Luan:</strong> Ruang depan luas untuk musyawarah adat dan tradisi Ningkuk.</li>
            <li><strong>Luan Balik:</strong> Ruang keluarga dan kamar para gadis yang terlindungi.</li>
          </ul>
        </div>
      </div>

      <div class="p-3 bg-amber-200/80 rounded-xl border border-amber-400 text-sm text-amber-950">
        ✨ <strong>Ukiran Kayu Khas:</strong> Tebing layar atap dihiasi ukiran simbar bertanduk dan ornamen flora yang dicat kuning emas alami.
      </div>
    `
  },
  motif: {
    title: "Motif & Ornamen Tradisional Komering",
    tagline: "Filosofi Mendalam di Setiap Lekukan Benang dan Ukiran Kayu",
    badge: "Seni Rupa & Tekstil",
    color: "#EA580C",
    content: `
      <p class="mb-4">Karya seni rupa Suku Komering tercermin kuat pada kain tenun tradisional <em>Kawai Kanduk</em>, kain songket, serta ukiran pada dinding kayu rumah panggung.</p>
      
      <div class="space-y-3 mb-4">
        <div class="bg-orange-50 p-3.5 rounded-xl border border-orange-300">
          <h4 class="font-bold text-orange-900 font-title">🌿 Motif Pucuk Rebung (Pucuk Tubu)</h4>
          <p class="text-sm text-stone-700 mt-1">Bentuk segitiga bertingkat yang melambangkan bambu muda yang terus tumbuh tegak ke atas. Maknanya: manusia Komering harus senantiasa berbudi luhur, berilmu, dan selalu berguna bagi masyarakat di sekitarnya.</p>
        </div>

        <div class="bg-orange-50 p-3.5 rounded-xl border border-orange-300">
          <h4 class="font-bold text-orange-900 font-title">🐟 Motif Sisik Ikan & Aliran Air</h4>
          <p class="text-sm text-stone-700 mt-1">Menggambarkan keterikatan erat masyarakat Komering dengan kehidupan sungai penghidupan. Melambangkan kelimpahan rezeki, ketenangan jiwa, dan keluwesan dalam pergaulan.</p>
        </div>

        <div class="bg-orange-50 p-3.5 rounded-xl border border-orange-300">
          <h4 class="font-bold text-orange-900 font-title">🌸 Ornamen Bunga Cempaka & Melati</h4>
          <p class="text-sm text-stone-700 mt-1">Sering dipahatkan pada ventilasi jendela dan pintu rumah ulu. Melambangkan keharuman nama baik keluarga serta kesucian hati.</p>
        </div>
      </div>
    `
  },
  bahasa: {
    title: "Bahasa dan Kesenian Komering",
    tagline: "Irama Tabuhan Kulintang dan Keindahan Sastra Tutur Warahan",
    badge: "Sastra & Musik",
    color: "#16A34A",
    content: `
      <p class="mb-4">Suku Komering memiliki bahasa daerah yang kaya ragam dialek (seperti dialek Ilir dan Ulu) serta tradisi kesenian musik dan tari yang memikat.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-emerald-100/70 p-3.5 rounded-xl border border-emerald-300">
          <h4 class="font-bold text-emerald-950 font-title mb-1">🎶 Tabuhan Kulintang (Kelittang)</h4>
          <p class="text-sm text-stone-700">Instrumen musik tradisional berbahan perunggu yang disusun berjajar di atas rancak kayu ukir, dimainkan bersama gong dan gendang untuk mengiringi tari adat dan memeriahkan malam Ningkuk.</p>
        </div>

        <div class="bg-emerald-100/70 p-3.5 rounded-xl border border-emerald-300">
          <h4 class="font-bold text-emerald-950 font-title mb-1">💃 Tari Tigol</h4>
          <p class="text-sm text-stone-700">Tarian kehormatan khas Komering yang dibawakan dengan lemah gemulai oleh para gadis mengenakan busana adat lengkap, sebagai wujud syukur dan penghormatan tertinggi kepada tamu agung.</p>
        </div>
      </div>

      <div class="p-3 bg-amber-100/80 rounded-xl border border-amber-300 text-sm text-amber-950">
        📜 <strong>Tradisi Warahan (Pantun Komering):</strong> Di malam Ningkuk, muda-mudi melantunkan pantun bersahut-sahutan dengan bahasa yang halus dan penuh perumpamaan nilai kesopanan.
      </div>
    `
  }
};

function setupMateriModal() {
  const modal = document.getElementById('materi-modal');
  const closeBtn = document.getElementById('btn-close-materi-modal');
  const modalTitle = document.getElementById('materi-modal-title');
  const modalTagline = document.getElementById('materi-modal-tagline');
  const modalBadge = document.getElementById('materi-modal-badge');
  const modalBody = document.getElementById('materi-modal-body');

  document.querySelectorAll('.btn-materi-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.materi;
      const data = MATERI_DATA[type];
      if (!data || !modal) return;

      modalTitle.textContent = data.title;
      modalTagline.textContent = data.tagline;
      modalBadge.textContent = data.badge;
      modalBadge.style.backgroundColor = data.color;
      modalBody.innerHTML = data.content;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }
}

/* ============================================================
   6. Game Edukasi Engine (4 Mini-Games)
   ============================================================ */
let currentGame = 'tebak-gambar';

function setupGamesEngine() {
  // Game Selector Tabs
  document.querySelectorAll('.game-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.game-tab-btn').forEach(b => {
        b.classList.remove('bg-amber-400', 'text-amber-950', 'border-amber-600', 'scale-105');
        b.classList.add('bg-amber-100', 'text-amber-800');
      });
      btn.classList.add('bg-amber-400', 'text-amber-950', 'border-amber-600', 'scale-105');
      btn.classList.remove('bg-amber-100', 'text-amber-800');

      const gameType = btn.dataset.game;
      loadGame(gameType);
    });
  });

  // Initial Game Load
  loadGame('tebak-gambar');
}

function loadGame(gameType) {
  currentGame = gameType;
  const container = document.getElementById('game-arena-container');
  if (!container) return;

  if (gameType === 'tebak-gambar') {
    initTebakGambar(container);
  } else if (gameType === 'cocokkan-kartu') {
    initCocokkanKartu(container);
  } else if (gameType === 'puzzle-rumah') {
    initPuzzleRumah(container);
  } else if (gameType === 'tebak-motif') {
    initTebakMotif(container);
  }
}

/* Game 1: Tebak Gambar Budaya */
const TEBAK_GAMBAR_QUESTIONS = [
  {
    q: "Benda apa yang dipakai di kepala pria pada pakaian adat Komering ini?",
    imgDesc: "Penutup kepala adat runcing berhiaskan sulaman benang emas",
    options: ["Tanjak Komering", "Songkok Polos", "Blangkon", "Topi Caping"],
    answer: 0,
    fact: "Tanjak Komering melambangkan kewibawaan, marwah, dan kepemimpinan pria Suku Komering."
  },
  {
    q: "Bangunan tradisional bertiang kayu ulin di tepian Sungai Komering ini adalah...",
    imgDesc: "Rumah panggung kayu tinggi dengan atap simbar dan beranda luas",
    options: ["Rumah Gadang", "Rumah Ulu / Panggung Komering", "Rumah Tongkonan", "Rumah Joglo"],
    answer: 1,
    fact: "Rumah Ulu dibangun tinggi untuk mengatasi luapan Sungai Komering dan memiliki beranda untuk musyawarah adat."
  },
  {
    q: "Alat musik pukul dari jejeran gong perunggu kecil khas Komering ini bernama...",
    imgDesc: "Jajaran 5 gong kecil perunggu di atas rak kayu ukiran dengan pemukul kayu",
    options: ["Angklung", "Kulintang / Kelittang", "Sasando", "Kolintang Bambu"],
    answer: 1,
    fact: "Kulintang dimainkan dengan irama dinamis dalam malam tradisi Ningkuk dan pesta rakyat Komering."
  },
  {
    q: "Motif segitiga bertingkat yang melambangkan bambu muda yang terus tumbuh adalah motif...",
    imgDesc: "Pola segitiga bertingkat runcing ke atas pada tepian kain adat",
    options: ["Pucuk Rebung", "Parang Rusak", "Mega Mendung", "Sisik Naga"],
    answer: 0,
    fact: "Pucuk Rebung mengajarkan agar manusia terus menuntut ilmu dan bermanfaat sejak muda hingga tua."
  }
];

let tebakGambarIndex = 0;
let tebakGambarScore = 0;

function initTebakGambar(container) {
  tebakGambarIndex = 0;
  tebakGambarScore = 0;
  renderTebakGambarQuestion(container);
}

function renderTebakGambarQuestion(container) {
  if (tebakGambarIndex >= TEBAK_GAMBAR_QUESTIONS.length) {
    // Win Screen
    if (window.soundEngine) window.soundEngine.playVictory();
    container.innerHTML = `
      <div class="text-center py-8">
        <div class="inline-block p-4 bg-amber-100 rounded-full mb-3 border-4 border-amber-400">
          <span class="text-5xl">🏆</span>
        </div>
        <h3 class="text-2xl font-bold font-title text-amber-950 mb-2">Hebat Sekali!</h3>
        <p class="text-stone-700 mb-4">Kamu berhasil menyelesaikan Tebak Gambar Budaya Komering!</p>
        <div class="text-3xl font-bold text-amber-600 mb-6">Skor: ${tebakGambarScore} / ${TEBAK_GAMBAR_QUESTIONS.length * 25}</div>
        <button id="btn-replay-tebak" class="btn-game-gold px-6 py-2.5 rounded-xl font-bold text-base cursor-pointer">
          Mainkan Lagi 🔄
        </button>
      </div>
    `;
    document.getElementById('btn-replay-tebak').addEventListener('click', () => {
      initTebakGambar(container);
    });
    return;
  }

  const qData = TEBAK_GAMBAR_QUESTIONS[tebakGambarIndex];

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center bg-amber-100/70 p-3 rounded-xl border border-amber-300">
        <span class="font-bold text-amber-900 text-sm">Soal ${tebakGambarIndex + 1} dari ${TEBAK_GAMBAR_QUESTIONS.length}</span>
        <span class="font-bold text-amber-700 text-sm">Skor: ${tebakGambarScore} Poin</span>
      </div>

      <!-- Question Image Illustration Card -->
      <div class="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 text-center">
        <div class="h-44 w-full flex items-center justify-center bg-sky-100 rounded-xl border-2 border-sky-300 overflow-hidden mb-3">
          ${tebakGambarIndex === 0 ? window.CulturalAssets.getTanjakGold() : ''}
          ${tebakGambarIndex === 1 ? window.CulturalAssets.getRumahAdat() : ''}
          ${tebakGambarIndex === 2 ? window.CulturalAssets.getAlatMusik() : ''}
          ${tebakGambarIndex === 3 ? window.CulturalAssets.getMotifKain() : ''}
        </div>
        <p class="text-xs text-stone-500 italic mb-1">Keterangan: ${qData.imgDesc}</p>
        <h4 class="font-bold text-amber-950 font-title text-base sm:text-lg">${qData.q}</h4>
      </div>

      <!-- Options -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="tebak-options">
        ${qData.options.map((opt, idx) => `
          <button class="opt-btn bg-white hover:bg-amber-100 text-stone-800 font-bold p-3 rounded-xl border-2 border-amber-300 text-left transition-all hover:scale-[1.02] cursor-pointer shadow-sm" data-idx="${idx}">
            <span class="inline-block w-6 h-6 rounded-full bg-amber-400 text-amber-950 text-center text-xs leading-6 mr-2 font-bold">${String.fromCharCode(65 + idx)}</span>
            ${opt}
          </button>
        `).join('')}
      </div>

      <div id="tebak-feedback" class="hidden p-3 rounded-xl text-sm font-semibold"></div>
    </div>
  `;

  // Attach option clicks
  const optionButtons = container.querySelectorAll('.opt-btn');
  const feedback = container.getElementById('tebak-feedback');

  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = parseInt(btn.dataset.idx);
      optionButtons.forEach(b => b.disabled = true);

      if (selected === qData.answer) {
        if (window.soundEngine) window.soundEngine.playCorrect();
        btn.classList.remove('bg-white', 'border-amber-300');
        btn.classList.add('bg-emerald-500', 'text-white', 'border-emerald-700');
        tebakGambarScore += 25;
        feedback.className = 'p-3 rounded-xl text-sm font-bold bg-emerald-100 text-emerald-900 border border-emerald-400 block';
        feedback.innerHTML = `🎉 <strong>Benar Sekali!</strong> ${qData.fact}`;
      } else {
        if (window.soundEngine) window.soundEngine.playWrong();
        btn.classList.remove('bg-white', 'border-amber-300');
        btn.classList.add('bg-rose-500', 'text-white', 'border-rose-700');
        optionButtons[qData.answer].classList.add('bg-emerald-500', 'text-white');
        feedback.className = 'p-3 rounded-xl text-sm font-bold bg-rose-100 text-rose-900 border border-rose-400 block';
        feedback.innerHTML = `❌ <strong>Kurang Tepat!</strong> Jawaban yang benar adalah <em>${qData.options[qData.answer]}</em>. ${qData.fact}`;
      }

      setTimeout(() => {
        tebakGambarIndex++;
        renderTebakGambarQuestion(container);
      }, 2200);
    });
  });
}

/* Game 2: Cocokkan Gambar dengan Nama (Memory Matching Cards) */
const MEMORY_ITEMS = [
  { id: 'tanjak', name: 'Tanjak Komering', icon: '👑', desc: 'Penutup Kepala' },
  { id: 'rumah', name: 'Rumah Ulu Panggung', icon: '🏠', desc: 'Rumah Adat' },
  { id: 'kulintang', name: 'Alat Musik Kulintang', icon: '🎶', desc: 'Gong Perunggu' },
  { id: 'songket', name: 'Kain Kawai Kanduk', icon: '🧣', desc: 'Motif Komering' },
  { id: 'ningkuk', name: 'Tradisi Ningkuk', icon: '🤝', desc: 'Silaturahmi Bujang-Gadis' },
  { id: 'sungai', name: 'Sungai Komering', icon: '🌊', desc: 'Aliran Bersejarah' }
];

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryMoves = 0;
let memoryLocked = false;

function initCocokkanKartu(container) {
  matchedPairs = 0;
  memoryMoves = 0;
  flippedCards = [];
  memoryLocked = false;

  // Create deck of 12 cards (6 pairs)
  let deck = [];
  MEMORY_ITEMS.forEach(item => {
    // Card A: Visual Icon + Name
    deck.push({ ...item, key: item.id + '-a', type: 'icon' });
    // Card B: Text Description + Title
    deck.push({ ...item, key: item.id + '-b', type: 'text' });
  });

  // Shuffle deck
  deck.sort(() => Math.random() - 0.5);
  memoryCards = deck;

  renderMemoryBoard(container);
}

function renderMemoryBoard(container) {
  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center bg-sky-100/80 p-3 rounded-xl border border-sky-300">
        <div>
          <span class="text-sm font-bold text-sky-950">Langkah: <strong id="mem-moves">${memoryMoves}</strong></span>
          <span class="mx-2 text-stone-300">|</span>
          <span class="text-sm font-bold text-sky-950">Pasangan: <strong id="mem-pairs">${matchedPairs} / 6</strong></span>
        </div>
        <button id="btn-reset-memory" class="btn-game-wood px-3.5 py-1 text-xs rounded-lg font-bold cursor-pointer">
          Mulai Ulang 🔄
        </button>
      </div>

      <div class="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-lg mx-auto" id="memory-grid">
        ${memoryCards.map((card, idx) => `
          <div class="memory-card" data-index="${idx}">
            <div class="memory-card-inner">
              <div class="memory-card-front">
                <span class="text-2xl text-amber-300 font-bold">✨</span>
                <span class="text-xs font-bold text-sky-100 mt-1">LINDUNING</span>
              </div>
              <div class="memory-card-back p-2 flex flex-col items-center justify-center text-center">
                <span class="text-3xl mb-1">${card.icon}</span>
                <span class="text-[11px] font-extrabold text-amber-950 leading-tight">${card.name}</span>
                <span class="text-[9px] text-amber-800 bg-amber-200/80 px-1.5 py-0.5 rounded-full mt-1">${card.desc}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('btn-reset-memory').addEventListener('click', () => {
    initCocokkanKartu(container);
  });

  const cardElements = container.querySelectorAll('.memory-card');
  cardElements.forEach(cardEl => {
    cardEl.addEventListener('click', () => {
      const idx = parseInt(cardEl.dataset.index);
      handleCardClick(cardEl, idx, container);
    });
  });
}

function handleCardClick(cardEl, index, container) {
  if (memoryLocked) return;
  if (cardEl.classList.contains('flipped')) return;

  if (window.soundEngine) window.soundEngine.playCardFlip();
  cardEl.classList.add('flipped');
  flippedCards.push({ el: cardEl, data: memoryCards[index] });

  if (flippedCards.length === 2) {
    memoryMoves++;
    const movesEl = document.getElementById('mem-moves');
    if (movesEl) movesEl.textContent = memoryMoves;

    const [first, second] = flippedCards;
    if (first.data.id === second.data.id) {
      // Matched!
      if (window.soundEngine) window.soundEngine.playCorrect();
      matchedPairs++;
      const pairsEl = document.getElementById('mem-pairs');
      if (pairsEl) pairsEl.textContent = `${matchedPairs} / 6`;

      flippedCards = [];

      if (matchedPairs === 6) {
        setTimeout(() => {
          if (window.soundEngine) window.soundEngine.playVictory();
          container.innerHTML = `
            <div class="text-center py-8">
              <div class="inline-block p-4 bg-emerald-100 rounded-full mb-3 border-4 border-emerald-400">
                <span class="text-5xl">🎉</span>
              </div>
              <h3 class="text-2xl font-bold font-title text-emerald-950 mb-2">Luar Biasa, Berhasil!</h3>
              <p class="text-stone-700 mb-2">Kamu berhasil mencocokkan semua kartu budaya Komering!</p>
              <div class="text-lg font-bold text-emerald-700 mb-6">Total Langkah: ${memoryMoves} Gerakan</div>
              <button id="btn-replay-mem" class="btn-game-green px-6 py-2.5 rounded-xl font-bold text-base cursor-pointer">
                Main Lagi 🔄
              </button>
            </div>
          `;
          document.getElementById('btn-replay-mem').addEventListener('click', () => {
            initCocokkanKartu(container);
          });
        }, 600);
      }
    } else {
      // Not matched
      memoryLocked = true;
      setTimeout(() => {
        first.el.classList.remove('flipped');
        second.el.classList.remove('flipped');
        flippedCards = [];
        memoryLocked = false;
      }, 900);
    }
  }
}

/* Game 3: Susun Puzzle Rumah Adat */
let puzzleTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let selectedPuzzleIndex = null;
let puzzleSteps = 0;

function initPuzzleRumah(container) {
  puzzleSteps = 0;
  selectedPuzzleIndex = null;
  // Shuffle tiles slightly for easy fun solving
  puzzleTiles = [3, 0, 2, 5, 4, 1, 6, 8, 7];
  renderPuzzleBoard(container);
}

function renderPuzzleBoard(container) {
  container.innerHTML = `
    <div class="space-y-4 text-center">
      <div class="flex justify-between items-center bg-amber-100/80 p-3 rounded-xl border border-amber-300">
        <span class="text-sm font-bold text-amber-950">Langkah Tukar: <strong id="puzzle-steps">${puzzleSteps}</strong></span>
        <div class="space-x-2">
          <button id="btn-hint-puzzle" class="bg-amber-300 hover:bg-amber-400 text-amber-950 px-2.5 py-1 text-xs rounded-lg font-bold cursor-pointer">
            Lihat Contoh 👁️
          </button>
          <button id="btn-reset-puzzle" class="btn-game-wood px-2.5 py-1 text-xs rounded-lg font-bold cursor-pointer">
            Acak Ulang 🔄
          </button>
        </div>
      </div>

      <p class="text-xs text-amber-800">Klik <strong>dua kepingan</strong> untuk saling menukarkan posisinya hingga susunan gambar Rumah Adat Komering menjadi utuh dan benar!</p>

      <div id="puzzle-grid" class="puzzle-grid">
        ${puzzleTiles.map((tileVal, idx) => `
          <div class="puzzle-tile ${selectedPuzzleIndex === idx ? 'selected' : ''}" data-idx="${idx}">
            <div class="w-full h-full relative" style="
              background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(window.CulturalAssets.getRumahAdat())}');
              background-size: 300% 300%;
              background-position: ${(tileVal % 3) * 50}% ${Math.floor(tileVal / 3) * 50}%;
            ">
              <span class="absolute top-1 left-1 bg-amber-950/70 text-amber-200 text-[10px] px-1.5 py-0.5 rounded-full font-bold">#${tileVal + 1}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Preview Modal Slot -->
      <div id="puzzle-hint-box" class="hidden bg-amber-50 p-3 rounded-xl border-2 border-amber-400 max-w-xs mx-auto">
        <h5 class="font-bold text-xs text-amber-950 mb-1">Contoh Rumah Adat Utuh:</h5>
        <div class="h-32 w-full">${window.CulturalAssets.getRumahAdat()}</div>
      </div>
    </div>
  `;

  document.getElementById('btn-reset-puzzle').addEventListener('click', () => {
    initPuzzleRumah(container);
  });

  const hintBox = document.getElementById('puzzle-hint-box');
  document.getElementById('btn-hint-puzzle').addEventListener('click', () => {
    hintBox.classList.toggle('hidden');
  });

  const tiles = container.querySelectorAll('.puzzle-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const clickedIdx = parseInt(tile.dataset.idx);

      if (selectedPuzzleIndex === null) {
        // Select first tile
        selectedPuzzleIndex = clickedIdx;
        if (window.soundEngine) window.soundEngine.playClick();
        renderPuzzleBoard(container);
      } else {
        // Swap with second tile
        const temp = puzzleTiles[selectedPuzzleIndex];
        puzzleTiles[selectedPuzzleIndex] = puzzleTiles[clickedIdx];
        puzzleTiles[clickedIdx] = temp;
        puzzleSteps++;

        if (window.soundEngine) window.soundEngine.playCardFlip();
        selectedPuzzleIndex = null;
        renderPuzzleBoard(container);

        // Check if solved
        const isSolved = puzzleTiles.every((val, idx) => val === idx);
        if (isSolved) {
          setTimeout(() => {
            if (window.soundEngine) window.soundEngine.playVictory();
            container.innerHTML = `
              <div class="text-center py-8">
                <div class="inline-block p-4 bg-amber-100 rounded-full mb-3 border-4 border-amber-400">
                  <span class="text-5xl">🏛️</span>
                </div>
                <h3 class="text-2xl font-bold font-title text-amber-950 mb-2">Puzzle Selesai Sempurna!</h3>
                <p class="text-stone-700 mb-2">Rumah Adat Panggung Komering tersusun dengan sangat indah!</p>
                <div class="h-36 max-w-sm mx-auto my-3">${window.CulturalAssets.getRumahAdat()}</div>
                <div class="text-base font-bold text-amber-700 mb-6">Diselesaikan dalam: ${puzzleSteps} Langkah</div>
                <button id="btn-replay-puz" class="btn-game-gold px-6 py-2.5 rounded-xl font-bold text-base cursor-pointer">
                  Susun Lagi 🔄
                </button>
              </div>
            `;
            document.getElementById('btn-replay-puz').addEventListener('click', () => {
              initPuzzleRumah(container);
            });
          }, 350);
        }
      }
    });
  });
}

/* Game 4: Tebak Motif Tradisional */
const MOTIF_QUESTIONS = [
  {
    title: "Motif Segitiga Runcing Bertingkat",
    options: ["Motif Pucuk Rebung", "Motif Tapak Dara", "Motif Bunga Melati", "Motif Sisik Ikan"],
    answer: 0,
    meaning: "Pucuk Rebung melambangkan harapan masa depan, keteguhan hati, dan pertumbuhan generasi muda Komering yang bermanfaat."
  },
  {
    title: "Pola Belah Ketupat Bertaut",
    options: ["Motif Daun Sirih", "Motif Sisik Ikan (Iwak Komering)", "Motif Kembang Cengkeh", "Motif Rantai Besi"],
    answer: 1,
    meaning: "Sisik Ikan melambangkan kelimpahan sumber pangan dan rezeki yang melimpah di sepanjang aliran Sungai Komering."
  }
];
let currentMotifIdx = 0;

function initTebakMotif(container) {
  currentMotifIdx = 0;
  renderTebakMotifQuestion(container);
}

function renderTebakMotifQuestion(container) {
  if (currentMotifIdx >= MOTIF_QUESTIONS.length) {
    if (window.soundEngine) window.soundEngine.playVictory();
    container.innerHTML = `
      <div class="text-center py-8">
        <span class="text-5xl">🎨</span>
        <h3 class="text-2xl font-bold font-title text-amber-950 mt-3 mb-2">Pengetahuan Seni Kamu Luar Biasa!</h3>
        <p class="text-stone-700 mb-6">Kamu telah mengenali makna filosofis motif tradisional Suku Komering!</p>
        <button id="btn-replay-motif" class="btn-game-gold px-6 py-2.5 rounded-xl font-bold cursor-pointer">Main Lagi 🔄</button>
      </div>
    `;
    document.getElementById('btn-replay-motif').addEventListener('click', () => initTebakMotif(container));
    return;
  }

  const data = MOTIF_QUESTIONS[currentMotifIdx];

  container.innerHTML = `
    <div class="space-y-4">
      <div class="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 text-center">
        <div class="h-40 w-40 mx-auto rounded-xl overflow-hidden border-4 border-amber-400 shadow-md mb-3">
          ${window.CulturalAssets.getMotifKain()}
        </div>
        <h4 class="font-bold text-amber-950 font-title text-base sm:text-lg mb-1">${data.title}</h4>
        <p class="text-xs text-stone-600">Perhatikan pola ornamen tradisional Komering di atas. Apa nama motif tersebut?</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="motif-options">
        ${data.options.map((opt, i) => `
          <button class="opt-motif-btn bg-white hover:bg-amber-100 text-stone-800 font-bold p-3 rounded-xl border-2 border-amber-300 text-left cursor-pointer transition-all" data-idx="${i}">
            <span class="inline-block w-6 h-6 rounded-full bg-amber-400 text-amber-950 text-center text-xs leading-6 mr-2 font-bold">${String.fromCharCode(65 + i)}</span>
            ${opt}
          </button>
        `).join('')}
      </div>

      <div id="motif-feedback" class="hidden p-3 rounded-xl text-sm font-bold"></div>
    </div>
  `;

  const buttons = container.querySelectorAll('.opt-motif-btn');
  const fb = container.getElementById('motif-feedback');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sel = parseInt(btn.dataset.idx);
      buttons.forEach(b => b.disabled = true);

      if (sel === data.answer) {
        if (window.soundEngine) window.soundEngine.playCorrect();
        btn.classList.add('bg-emerald-500', 'text-white');
        fb.className = 'p-3 rounded-xl text-sm font-bold bg-emerald-100 text-emerald-950 border border-emerald-400 block';
        fb.innerHTML = `✨ <strong>Tepat Sekali!</strong> ${data.meaning}`;
      } else {
        if (window.soundEngine) window.soundEngine.playWrong();
        btn.classList.add('bg-rose-500', 'text-white');
        buttons[data.answer].classList.add('bg-emerald-500', 'text-white');
        fb.className = 'p-3 rounded-xl text-sm font-bold bg-rose-100 text-rose-950 border border-rose-400 block';
        fb.innerHTML = `💡 Jawaban yang benar adalah <em>${data.options[data.answer]}</em>. ${data.meaning}`;
      }

      setTimeout(() => {
        currentMotifIdx++;
        renderTebakMotifQuestion(container);
      }, 2300);
    });
  });
}

/* ============================================================
   7. Interactive Map Engine (Peta Budaya Komering)
   ============================================================ */
const MAP_LOCATIONS = [
  {
    id: 'cempaka',
    name: 'Desa Cempaka & Betung',
    badge: 'Rumah Adat Kuno',
    cx: 260,
    cy: 220,
    desc: 'Salah satu kawasan permukiman Suku Komering tertua di tepi sungai yang masih merawat deretan Rumah Ulu kayu berusia lebih dari satu abad.',
    highlight: 'Kawasan konservasi arsitektur tradisional panggung kayu tanpa paku besi.',
    icon: '🏛️'
  },
  {
    id: 'martapura',
    name: 'Martapura (OKU Timur)',
    badge: 'Pusat Sejarah Ningkuk',
    cx: 160,
    cy: 280,
    desc: 'Ibu kota kabupaten yang dialiri Sungai Komering, tempat prosesi Ningkuk masih sering diselenggarakan dalam perayaan adat pengantin dan festival kebudayaan.',
    highlight: 'Pusat festival kebudayaan daerah Sebiduk Sehaluan Komering.',
    icon: '🤝'
  },
  {
    id: 'belitang',
    name: 'Belitang & Sekitarnya',
    badge: 'Kesenian Musik & Tari',
    cx: 230,
    cy: 330,
    desc: 'Wilayah subur yang menjadi sentra sanggar kesenian musik Kulintang (Kelittang) serta pelestarian Tari Tigol penyambutan tamu kehormatan.',
    highlight: 'Pusat pelestarian tabuhan irama tradisi gong perunggu Komering.',
    icon: '🎶'
  },
  {
    id: 'ranau',
    name: 'Danau Ranau & Muaradua',
    badge: 'Hulu Sungai Komering',
    cx: 100,
    cy: 340,
    desc: 'Hulu mata air jernih yang menjadi titik awal mengalirnya Sungai Komering melintasi dataran tinggi hingga ke pedalaman Sumatera Selatan.',
    highlight: 'Pemandangan alam perbukitan dan asal muasal kisah nenek moyang Komering.',
    icon: '🌄'
  },
  {
    id: 'kayuagung',
    name: 'Kayu Agung & Aliran Ilir',
    badge: 'Kerajinan Songket & Anyaman',
    cx: 370,
    cy: 140,
    desc: 'Kawasan hilir Sungai Komering yang terkenal dengan sentra penenun kain songket motif halus serta kerajinan tembikar dan anyaman tikar purun khas.',
    highlight: 'Sentra tenun songket benang emas dan kerajinan tradisional Komering Ilir.',
    icon: '🧣'
  }
];

function setupMapEngine() {
  const mapSvg = document.getElementById('komering-map-svg');
  if (!mapSvg) return;

  renderMapPins();
  selectMapLocation(0);

  // Filter Buttons
  document.querySelectorAll('.map-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-filter-btn').forEach(b => {
        b.classList.remove('bg-amber-400', 'text-amber-950');
        b.classList.add('bg-amber-100', 'text-amber-800');
      });
      btn.classList.add('bg-amber-400', 'text-amber-950');
      btn.classList.remove('bg-amber-100', 'text-amber-800');
    });
  });
}

function renderMapPins() {
  const pinsGroup = document.getElementById('map-pins-group');
  if (!pinsGroup) return;

  pinsGroup.innerHTML = MAP_LOCATIONS.map((loc, idx) => `
    <g class="map-pin cursor-pointer" data-index="${idx}" transform="translate(${loc.cx}, ${loc.cy})">
      <!-- Pin Shadow -->
      <ellipse cx="0" cy="12" rx="10" ry="4" fill="#000000" opacity="0.25" />
      <!-- Pin Body (Teardrop red pin with gold rim) -->
      <path d="M0 -22 C-14 -22 -14 -6 0 10 C14 -6 14 -22 0 -22 Z" fill="#DC2626" stroke="#FDE047" stroke-width="2.5" />
      <circle cx="0" cy="-11" r="5" fill="#FFFFFF" />
      <circle cx="0" cy="-11" r="2.5" fill="#DC2626" />
      <!-- Text label badge -->
      <rect x="-40" y="-38" width="80" height="15" rx="4" fill="#78350F" opacity="0.9" stroke="#FACC15" stroke-width="1"/>
      <text x="0" y="-27" font-size="8.5" font-weight="bold" fill="#FEF3C7" text-anchor="middle" font-family="'Nunito', sans-serif">${loc.name.split(' ')[0]}</text>
    </g>
  `).join('');

  pinsGroup.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const idx = parseInt(pin.dataset.index);
      selectMapLocation(idx);
    });
  });
}

function selectMapLocation(index) {
  const loc = MAP_LOCATIONS[index];
  if (!loc) return;

  if (window.soundEngine) window.soundEngine.playPin();

  // Highlight selected pin
  document.querySelectorAll('.map-pin').forEach((pin, i) => {
    if (i === index) {
      pin.classList.add('active');
    } else {
      pin.classList.remove('active');
    }
  });

  // Update Map Detail Card
  const titleEl = document.getElementById('map-card-title');
  const badgeEl = document.getElementById('map-card-badge');
  const descEl = document.getElementById('map-card-desc');
  const factEl = document.getElementById('map-card-fact');
  const iconEl = document.getElementById('map-card-icon');

  if (titleEl) titleEl.textContent = loc.name;
  if (badgeEl) badgeEl.textContent = loc.badge;
  if (descEl) descEl.textContent = loc.desc;
  if (factEl) factEl.textContent = loc.highlight;
  if (iconEl) iconEl.textContent = loc.icon;
}

/* ============================================================
   8. Quiz Engine (10 Soal Interaktif & Hasil Belajar)
   ============================================================ */
const QUIZ_QUESTIONS = [
  {
    q: "Apa nama tradisi perkumpulan bujang dan gadis Suku Komering yang menjadi ajang saling mengenal dengan tata krama kesopanan?",
    options: ["Ningkuk", "Gawi Adat", "Sedekah Rame", "Tepung Tawar"],
    answer: 0,
    explanation: "Tradisi Ningkuk adalah adat pertemuan muda-mudi Suku Komering yang diiringi berbalas pantun dan saling mengenalkan diri dengan santun."
  },
  {
    q: "Masyarakat Suku Komering secara geografis banyak mendiami wilayah di sepanjang aliran sungai di provinsi...",
    options: ["Sumatera Selatan", "Riau", "Sumatera Barat", "Jambi"],
    answer: 0,
    explanation: "Suku Komering adalah salah satu suku asli Sumatera Selatan yang bermukim di sepanjang aliran Sungai Komering (OKU Timur, OKU Selatan, OKI)."
  },
  {
    q: "Rumah adat tradisional masyarakat Komering bertipe panggung yang dirancang bebas banjir dikenal dengan sebutan...",
    options: ["Rumah Kebaya", "Rumah Limas Pontianak", "Rumah Ulu / Panggung Komering", "Rumah Gadang"],
    answer: 2,
    explanation: "Rumah Ulu atau Rumah Panggung Komering berdiri di atas tiang kayu ulin setinggi 2-3 meter untuk menyesuaikan luapan pasang surut sungai."
  },
  {
    q: "Penutup kepala tradisional bertingkat khas Komering/Sumsel yang dipakai kaum pria saat prosesi adat bernama...",
    options: ["Kopiah Meukeutop", "Tanjak Komering", "Destar", "Belangkon"],
    answer: 1,
    explanation: "Tanjak Komering berbentuk segitiga runcing dengan ornamen sulaman emas yang melambangkan marwah dan kepemimpinan."
  },
  {
    q: "Baju kurung beludru hitam berhiaskan sulaman benang emas yang dipakai mempelai pria Komering disebut...",
    options: ["Baju Bodo", "Baju Lambis", "Baju Teluk Belanga", "Baju Pokko"],
    answer: 1,
    explanation: "Baju Lambis adalah pakaian kebesaran pria Komering yang terbuat dari beludru hitam bertabur payet dan benang emas."
  },
  {
    q: "Aliran sungai utama yang menjadi urat nadi peradaban, transportasi, dan permukiman Suku Komering adalah...",
    options: ["Sungai Komering", "Sungai Musi Hulu", "Sungai Batanghari", "Sungai Asahan"],
    answer: 0,
    explanation: "Sungai Komering mengalir dari Danau Ranau melintasi Martapura hingga bermuara ke Sungai Musi."
  },
  {
    q: "Motif segitiga bertingkat yang melambangkan harapan masa depan dan keluhuran budi pekerti adalah motif...",
    options: ["Parang Rusak", "Pucuk Rebung", "Ceplok Ksatria", "Bunga Melati Tumpuk"],
    answer: 1,
    explanation: "Motif Pucuk Rebung melambangkan bambu muda yang mengajarkan agar senantiasa berilmu dan bermanfaat bagi sesama."
  },
  {
    q: "Alat musik tradisional berupa deretan gong perunggu kecil di atas rak kayu khas Komering dikenal dengan nama...",
    options: ["Kulintang / Kelittang", "Talempong Batu", "Gamelan Degung", "Sasando"],
    answer: 0,
    explanation: "Kulintang atau Kelittang Komering memiliki tangga nada khas dan dimainkan dalam irama riang pengiring tarian dan upacara Ningkuk."
  },
  {
    q: "Tarian adat penyambutan tamu kehormatan yang dibawakan oleh gadis-gadis Komering dengan anggun adalah...",
    options: ["Tari Piring", "Tari Saman", "Tari Tigol", "Tari Jaipong"],
    answer: 2,
    explanation: "Tari Tigol adalah tarian tradisional kebanggaan Suku Komering untuk memuliakan tamu yang berkunjung."
  },
  {
    q: "Nilai luhur utama yang terkandung dan dilestarikan dalam pelaksanaan tradisi Ningkuk adalah...",
    options: ["Individualisme dan persaingan", "Gotong royong, kesantunan, dan kekerabatan", "Hura-hura tanpa aturan", "Perdagangan bebas"],
    answer: 1,
    explanation: "Tradisi Ningkuk menjunjung tinggi adab sopan santun, mempererat tali persaudaraan, dan menjaga kehormatan keluarga."
  }
];

let quizCurrentIndex = 0;
let quizScore = 0;
let quizSelectedOption = null;
let quizState = 'answering'; // 'answering' | 'answered'

function setupQuizEngine() {
  const answerBtn = document.getElementById('btn-submit-answer');
  const restartBtn = document.getElementById('btn-restart-quiz');
  const quizHomeBtn = document.getElementById('btn-quiz-back-home');

  if (answerBtn) {
    // Single permanent click handler driven by state
    answerBtn.addEventListener('click', () => {
      if (quizState === 'answering') {
        if (quizSelectedOption === null) {
          // If no option selected yet, highlight options gently
          const opts = document.querySelectorAll('.quiz-option-btn');
          opts.forEach(b => {
            b.classList.add('ring-2', 'ring-rose-400');
            setTimeout(() => b.classList.remove('ring-2', 'ring-rose-400'), 600);
          });
          return;
        }
        submitQuizAnswer();
      } else if (quizState === 'answered') {
        quizCurrentIndex++;
        if (quizCurrentIndex < QUIZ_QUESTIONS.length) {
          loadQuizQuestion();
        } else {
          showQuizResults();
        }
      }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', restartQuiz);
  }

  if (quizHomeBtn) {
    quizHomeBtn.addEventListener('click', () => {
      window.navigateTo('dashboard-section');
    });
  }

  // Load first question
  loadQuizQuestion();
}

function restartQuiz() {
  quizCurrentIndex = 0;
  quizScore = 0;
  quizSelectedOption = null;
  quizState = 'answering';
  
  const activeView = document.getElementById('quiz-active-view');
  const resultView = document.getElementById('quiz-result-view');
  if (resultView) resultView.classList.add('hidden');
  if (activeView) activeView.classList.remove('hidden');
  
  loadQuizQuestion();
}

function loadQuizQuestion() {
  quizState = 'answering';
  quizSelectedOption = null;

  const activeView = document.getElementById('quiz-active-view');
  const resultView = document.getElementById('quiz-result-view');
  if (resultView) resultView.classList.add('hidden');
  if (activeView) activeView.classList.remove('hidden');

  const qData = QUIZ_QUESTIONS[quizCurrentIndex];
  if (!qData) return;

  // Progress Bar & Counter
  const progressPercent = Math.round(((quizCurrentIndex + 1) / QUIZ_QUESTIONS.length) * 100);
  const progressBar = document.getElementById('quiz-progress-bar');
  const progressText = document.getElementById('quiz-progress-text');
  
  if (progressBar) progressBar.style.width = `${progressPercent}%`;
  if (progressText) progressText.textContent = `${quizCurrentIndex + 1}/${QUIZ_QUESTIONS.length}`;

  // Question Text
  const questionTextEl = document.getElementById('quiz-question-text');
  if (questionTextEl) questionTextEl.textContent = qData.q;

  // Render Options
  const optionsContainer = document.getElementById('quiz-options-container');
  if (optionsContainer) {
    optionsContainer.innerHTML = qData.options.map((opt, idx) => `
      <button type="button" class="quiz-option-btn w-full p-3.5 sm:p-4 text-left rounded-xl border-2 border-amber-300 bg-white hover:bg-amber-50 font-bold text-stone-800 transition-all flex items-center shadow-sm cursor-pointer select-none active:scale-[0.99]" data-idx="${idx}">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-200 text-amber-950 font-extrabold mr-3 text-sm shrink-0">
          ${String.fromCharCode(65 + idx)}
        </span>
        <span class="text-sm sm:text-base">${opt}</span>
      </button>
    `).join('');

    // Attach click events on option buttons
    optionsContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quizState !== 'answering') return;
        
        if (window.soundEngine) window.soundEngine.playClick();
        
        // Reset styles for all options
        optionsContainer.querySelectorAll('.quiz-option-btn').forEach(b => {
          b.classList.remove('border-amber-600', 'bg-amber-200', 'ring-2', 'ring-amber-500');
          b.classList.add('border-amber-300', 'bg-white');
        });
        
        // Mark clicked option as selected
        btn.classList.remove('border-amber-300', 'bg-white');
        btn.classList.add('border-amber-600', 'bg-amber-200', 'ring-2', 'ring-amber-500');
        
        quizSelectedOption = parseInt(btn.dataset.idx);

        // Enable Submit Button
        const submitBtn = document.getElementById('btn-submit-answer');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      });
    });
  }

  // Reset Submit Button
  const submitBtn = document.getElementById('btn-submit-answer');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
    submitBtn.textContent = 'Jawab Sekarang';
  }

  // Hide Explanation Box
  const expBox = document.getElementById('quiz-explanation-box');
  if (expBox) {
    expBox.classList.add('hidden');
    expBox.innerHTML = '';
  }
}

function submitQuizAnswer() {
  if (quizSelectedOption === null || quizState !== 'answering') return;

  quizState = 'answered';
  const qData = QUIZ_QUESTIONS[quizCurrentIndex];
  const optionsButtons = document.querySelectorAll('.quiz-option-btn');
  const expBox = document.getElementById('quiz-explanation-box');
  const submitBtn = document.getElementById('btn-submit-answer');

  // Disable options so answer cannot be changed
  optionsButtons.forEach(b => {
    b.disabled = true;
    b.classList.remove('cursor-pointer');
  });

  const isCorrect = quizSelectedOption === qData.answer;

  if (isCorrect) {
    if (window.soundEngine) window.soundEngine.playCorrect();
    quizScore += 10;
    if (optionsButtons[quizSelectedOption]) {
      optionsButtons[quizSelectedOption].classList.remove('bg-white', 'bg-amber-200', 'border-amber-300', 'border-amber-600');
      optionsButtons[quizSelectedOption].classList.add('bg-emerald-500', 'text-white', 'border-emerald-600');
    }
    
    if (expBox) {
      expBox.className = 'p-3.5 rounded-xl text-sm font-bold bg-emerald-100 text-emerald-950 border border-emerald-400 block mt-4';
      expBox.innerHTML = `🎉 <strong>Benar!</strong> ${qData.explanation}`;
    }
  } else {
    if (window.soundEngine) window.soundEngine.playWrong();
    if (optionsButtons[quizSelectedOption]) {
      optionsButtons[quizSelectedOption].classList.remove('bg-white', 'bg-amber-200', 'border-amber-300', 'border-amber-600');
      optionsButtons[quizSelectedOption].classList.add('bg-rose-500', 'text-white', 'border-rose-600');
    }
    
    // Highlight the correct answer
    if (optionsButtons[qData.answer]) {
      optionsButtons[qData.answer].classList.remove('bg-white', 'border-amber-300');
      optionsButtons[qData.answer].classList.add('bg-emerald-500', 'text-white', 'border-emerald-600');
    }

    if (expBox) {
      expBox.className = 'p-3.5 rounded-xl text-sm font-bold bg-rose-100 text-rose-950 border border-rose-400 block mt-4';
      expBox.innerHTML = `❌ <strong>Kurang Tepat!</strong> Jawaban yang benar adalah <em>${qData.options[qData.answer]}</em>.<br><span class="font-normal text-xs mt-1 block">${qData.explanation}</span>`;
    }
  }

  // Set button text for next step
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    if (quizCurrentIndex + 1 < QUIZ_QUESTIONS.length) {
      submitBtn.textContent = 'Soal Berikutnya ▶';
    } else {
      submitBtn.textContent = 'Lihat Hasil Belajar 🏆';
    }
  }
}

function showQuizResults() {
  const activeView = document.getElementById('quiz-active-view');
  const resultView = document.getElementById('quiz-result-view');
  if (activeView) activeView.classList.add('hidden');
  if (resultView) resultView.classList.remove('hidden');

  if (window.soundEngine) window.soundEngine.playVictory();

  // Populate Score
  const scoreEl = document.getElementById('result-score-number');
  if (scoreEl) scoreEl.textContent = quizScore;
  
  const correctEl = document.getElementById('result-correct-count');
  if (correctEl) correctEl.textContent = `${Math.round(quizScore / 10)} / ${QUIZ_QUESTIONS.length}`;

  // Star Rating
  const starsContainer = document.getElementById('result-stars-slot');
  const titleEl = document.getElementById('result-banner-title');
  let starsHtml = '';
  if (quizScore >= 80) {
    starsHtml = '<span class="text-4xl text-amber-400 animate-bounce">⭐ ⭐ ⭐</span>';
    if (titleEl) titleEl.textContent = 'Hebat! Luar Biasa!';
  } else if (quizScore >= 50) {
    starsHtml = '<span class="text-4xl text-amber-400 animate-bounce">⭐ ⭐</span>';
    if (titleEl) titleEl.textContent = 'Bagus Sekali!';
  } else {
    starsHtml = '<span class="text-4xl text-amber-400">⭐</span>';
    if (titleEl) titleEl.textContent = 'Tetap Semangat Belajar!';
  }
  if (starsContainer) starsContainer.innerHTML = starsHtml;

  const resultMascot = document.getElementById('result-mascot-slot');
  if (resultMascot && window.CulturalAssets) {
    resultMascot.innerHTML = window.CulturalAssets.getMascot('cheering', 'res_');
  }

  // Trigger celebration confetti
  triggerConfetti();
}

function triggerConfetti() {
  const confettiBox = document.getElementById('confetti-container');
  if (!confettiBox) return;

  confettiBox.innerHTML = '';
  const colors = ['#FACC15', '#38BDF8', '#22C55E', '#EF4444', '#EC4899', '#A855F7'];

  for (let i = 0; i < 40; i++) {
    const flake = document.createElement('div');
    flake.className = 'absolute rounded-sm';
    flake.style.width = `${Math.random() * 10 + 6}px`;
    flake.style.height = `${Math.random() * 12 + 6}px`;
    flake.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    flake.style.left = `${Math.random() * 100}%`;
    flake.style.top = '-20px';
    flake.style.opacity = '0.9';
    flake.style.animation = `confettiFall ${Math.random() * 2 + 1.8}s linear forwards`;
    flake.style.animationDelay = `${Math.random() * 0.8}s`;
    confettiBox.appendChild(flake);
  }
}

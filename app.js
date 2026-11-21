/**
 * Quiet Spot — Main Application Script
 * Features:
 * - Color theme system (System / Light / Dark) with system change listener
 * - Curated Quiet Spots directory with reactive filtering, search & bookmarks
 * - Native <dialog> modal with light-dismiss fallback & validation
 * - Native Web Audio API ambient sound generator (Rain, Pink noise, Forest breeze, 432Hz Drone)
 * - Focus Sprint Timer (Pomodoro) with audio bell notifications
 */

// ==========================================================================
// 1. Initial Data & State
// ==========================================================================

const DEFAULT_SPOTS = [
  {
    id: "spot-1",
    name: "The Old Oak Reading Room",
    category: "library",
    categoryName: "Library & Archive",
    noise: 28,
    location: "Central Library, 4th Floor North",
    amenities: ["Power Outlets", "Natural Light", "Strict Quiet Policy", "Wi-Fi"],
    description: "Soaring double-height vaulted timber ceilings, large oak study desks, brass lamps, and an enforced silent policy."
  },
  {
    id: "spot-2",
    name: "Verdant Botanical Glasshouse",
    category: "garden",
    categoryName: "Garden Sanctuary",
    noise: 32,
    location: "City Conservatory, Palm Wing",
    amenities: ["Natural Light", "Outdoor Seating", "Tea / Coffee"],
    description: "Surrounded by ferns and palm canopies. The soft sound of distant trickling fountains masks extraneous street sounds."
  },
  {
    id: "spot-3",
    name: "Komorebi Tea House & Study Nook",
    category: "cafe",
    categoryName: "Calm Cafe",
    noise: 38,
    location: "East Riverside Lane, Unit B",
    amenities: ["Tea / Coffee", "Wi-Fi", "Natural Light"],
    description: "Shoji screens separating cozy cedar alcoves, warm matcha, gentle low acoustic guitar, and a no-calls-allowed policy."
  },
  {
    id: "spot-4",
    name: "Highland Solitude Co-working Pods",
    category: "pod",
    categoryName: "Acoustic Pod",
    noise: 26,
    location: "Highland Tech Quarter, Level 2",
    amenities: ["Power Outlets", "Wi-Fi", "Strict Quiet Policy"],
    description: "Double-glazed acoustic glass pods featuring active ventilation, ergonomic Herman Miller chairs, and dimmable lighting."
  },
  {
    id: "spot-5",
    name: "St. Jude Cloister Garden & Arcades",
    category: "garden",
    categoryName: "Historic Courtyard",
    noise: 30,
    location: "Old Town Quadrangle",
    amenities: ["Outdoor Seating", "Strict Quiet Policy", "Natural Light"],
    description: "14th-century stone archways surrounding a manicured lawn. Weather-sheltered stone benches ideal for reflective reading."
  },
  {
    id: "spot-6",
    name: "Paper & Ink Manuscript Corner",
    category: "bookstore",
    categoryName: "Bookstore Nook",
    noise: 35,
    location: "33 Heritage Row",
    amenities: ["Wi-Fi", "Tea / Coffee", "Natural Light"],
    description: "Tucked away behind poetry shelves with plush velvet armchairs, vintage lamps, and the comforting aroma of old paper."
  }
];

// App State
const state = {
  spots: [],
  savedSpotIds: new Set(),
  activeCategory: "all",
  searchQuery: "",
  maxNoise: "all",
  theme: "auto", // 'auto' | 'light' | 'dark'
  timer: {
    totalSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    isRunning: false,
    intervalId: null
  }
};

// ==========================================================================
// 2. Storage Helpers
// ==========================================================================

function loadStoredData() {
  try {
    const savedSpots = localStorage.getItem("quietspot-custom-spots");
    const userSpots = savedSpots ? JSON.parse(savedSpots) : [];
    state.spots = [...DEFAULT_SPOTS, ...userSpots];

    const savedBookmarks = localStorage.getItem("quietspot-saved-ids");
    if (savedBookmarks) {
      state.savedSpotIds = new Set(JSON.parse(savedBookmarks));
    }

    const savedTheme = localStorage.getItem("quietspot-theme");
    if (savedTheme) {
      state.theme = savedTheme;
    }
  } catch (err) {
    console.warn("Storage loading fallback:", err);
    state.spots = [...DEFAULT_SPOTS];
  }
}

function saveCustomSpot(spot) {
  try {
    const customSpots = state.spots.filter(s => !DEFAULT_SPOTS.some(def => def.id === s.id));
    localStorage.setItem("quietspot-custom-spots", JSON.stringify(customSpots));
  } catch (err) {
    console.warn("Error saving spot to storage:", err);
  }
}

function saveBookmarks() {
  try {
    localStorage.setItem("quietspot-saved-ids", JSON.stringify([...state.savedSpotIds]));
  } catch (err) {
    console.warn("Error saving bookmarks:", err);
  }
}

// ==========================================================================
// 3. Theme Manager
// ==========================================================================

function initTheme() {
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggleBtn");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme) {
    state.theme = theme;
    if (theme === "auto") {
      root.removeAttribute("data-theme");
      themeBtn.setAttribute("title", `Theme: System (${systemPrefersDark.matches ? "Dark" : "Light"})`);
    } else {
      root.setAttribute("data-theme", theme);
      themeBtn.setAttribute("title", `Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`);
    }
    localStorage.setItem("quietspot-theme", theme);
  }

  // Handle click on theme button (Cycles Auto -> Light -> Dark)
  themeBtn.addEventListener("click", () => {
    if (state.theme === "auto") {
      applyTheme(systemPrefersDark.matches ? "light" : "dark");
    } else if (state.theme === "light") {
      applyTheme("dark");
    } else {
      applyTheme("auto");
    }
  });

  // Listen to OS color scheme changes dynamically
  systemPrefersDark.addEventListener("change", (e) => {
    if (state.theme === "auto") {
      applyTheme("auto");
    }
  });

  applyTheme(state.theme);
}

// ==========================================================================
// 4. Spot Directory & Rendering
// ==========================================================================

function renderSpots() {
  const grid = document.getElementById("spotsGrid");
  const emptyState = document.getElementById("emptyState");
  const countBadge = document.getElementById("spotsCountBadge");
  const savedCountEl = document.getElementById("savedCount");

  if (savedCountEl) {
    savedCountEl.textContent = state.savedSpotIds.size;
  }

  // Filter spots
  const filtered = state.spots.filter(spot => {
    // Category filter
    if (state.activeCategory === "saved") {
      if (!state.savedSpotIds.has(spot.id)) return false;
    } else if (state.activeCategory !== "all" && spot.category !== state.activeCategory) {
      return false;
    }

    // Noise limit
    if (state.maxNoise !== "all") {
      const limit = parseInt(state.maxNoise, 10);
      if (spot.noise > limit) return false;
    }

    // Search query
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase();
      const inName = spot.name.toLowerCase().includes(q);
      const inLocation = spot.location.toLowerCase().includes(q);
      const inDesc = spot.description.toLowerCase().includes(q);
      const inAmenities = spot.amenities.some(a => a.toLowerCase().includes(q));
      if (!inName && !inLocation && !inDesc && !inAmenities) return false;
    }

    return true;
  });

  // Update count badge
  countBadge.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "spot" : "spots"}`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  grid.innerHTML = filtered.map(spot => {
    const isSaved = state.savedSpotIds.has(spot.id);
    // Noise progress calculation (20dB = 0%, 55dB = 100%)
    const pct = Math.min(100, Math.max(10, ((spot.noise - 20) / 35) * 100));

    return `
      <article class="spot-card" data-id="${spot.id}">
        <div>
          <div class="card-top">
            <span class="spot-category-badge">${escapeHTML(spot.categoryName)}</span>
            <button 
              type="button" 
              class="bookmark-btn ${isSaved ? "saved" : ""}" 
              data-spot-id="${spot.id}"
              aria-label="${isSaved ? "Remove from saved spots" : "Save this spot"}"
              title="${isSaved ? "Remove from saved" : "Save spot"}"
            >
              <svg viewBox="0 0 24 24" fill="${isSaved ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>

          <h3 class="spot-title">${escapeHTML(spot.name)}</h3>
          
          <div class="spot-location">
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <span>${escapeHTML(spot.location)}</span>
          </div>

          <p class="spot-desc">${escapeHTML(spot.description)}</p>
        </div>

        <div>
          <div class="noise-meter-box" aria-label="Acoustic reading: ${spot.noise} decibels">
            <div class="noise-meter-header">
              <span>Acoustic Reading</span>
              <span class="noise-db-val">${spot.noise} dB &middot; ${getNoiseLabel(spot.noise)}</span>
            </div>
            <div class="noise-progress-track">
              <div class="noise-progress-bar" style="inline-size: ${pct}%"></div>
            </div>
          </div>

          <div class="amenities-tags" aria-label="Amenities">
            ${spot.amenities.map(a => `<span class="amenity-tag">${escapeHTML(a)}</span>`).join("")}
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Attach bookmark toggle listeners
  grid.querySelectorAll(".bookmark-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const spotId = btn.getAttribute("data-spot-id");
      toggleBookmark(spotId);
    });
  });
}

function getNoiseLabel(db) {
  if (db <= 30) return "Whisper Quiet";
  if (db <= 40) return "Library Calm";
  return "Gentle Ambience";
}

function toggleBookmark(id) {
  if (state.savedSpotIds.has(id)) {
    state.savedSpotIds.delete(id);
    showToast("Spot removed from saved sanctuaries.");
  } else {
    state.savedSpotIds.add(id);
    showToast("Spot saved to your sanctuaries collection!");
  }
  saveBookmarks();
  renderSpots();
}

function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, tag => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[tag] || tag));
}

// ==========================================================================
// 5. Search & Filters Setup
// ==========================================================================

function initFilters() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  const noiseSelect = document.getElementById("noiseLevelSelect");
  const categoryPills = document.querySelectorAll(".filter-pill");
  const resetBtn = document.getElementById("resetFiltersBtn");

  // Search input handler
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    clearBtn.hidden = state.searchQuery === "";
    renderSpots();
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";
    clearBtn.hidden = true;
    searchInput.focus();
    renderSpots();
  });

  // Noise level select handler
  noiseSelect.addEventListener("change", (e) => {
    state.maxNoise = e.target.value;
    renderSpots();
  });

  // Category pill handlers
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeCategory = pill.getAttribute("data-category");
      renderSpots();
    });
  });

  // Reset filters
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.searchQuery = "";
      state.maxNoise = "all";
      state.activeCategory = "all";

      searchInput.value = "";
      clearBtn.hidden = true;
      noiseSelect.value = "all";

      categoryPills.forEach(p => {
        p.classList.toggle("active", p.getAttribute("data-category") === "all");
      });

      renderSpots();
    });
  }
}

// ==========================================================================
// 6. Modal Dialog Handling (Modern Native <dialog>)
// ==========================================================================

function initDialog() {
  const dialog = document.getElementById("addSpotModal");
  const openBtn = document.getElementById("openAddSpotBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const cancelBtn = document.getElementById("cancelModalBtn");
  const form = document.getElementById("addSpotForm");
  const noiseSlider = document.getElementById("spotNoise");
  const noiseDisplay = document.getElementById("noiseDisplayVal");

  // Noise range display sync
  noiseSlider.addEventListener("input", (e) => {
    noiseDisplay.textContent = `${e.target.value} dB`;
  });

  // Open modal
  openBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  // Close buttons
  const closeModal = () => dialog.close();
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // Fallback for browsers that do not yet support declarative light-dismiss via closedby="any"
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (event) => {
      // 1. When clicking the backdrop, event target is the dialog element itself
      if (event.target !== dialog) return;

      // 2. Check if the click coordinates fall within the dialog content boundaries
      const rect = dialog.getBoundingClientRect();
      const isInsideContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      if (!isInsideContent) {
        dialog.close();
      }
    });
  }

  // Clear stale returnValue on close per modern guidance
  dialog.addEventListener("close", () => {
    dialog.returnValue = "";
  });

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("spotName").value.trim();
    const category = document.getElementById("spotCategory").value;
    const categoryName = document.getElementById("spotCategory").selectedOptions[0].text;
    const noise = parseInt(noiseSlider.value, 10);
    const location = document.getElementById("spotLocation").value.trim();
    const description = document.getElementById("spotDescription").value.trim() || "A serene space recommended by the community.";

    const checkedAmenities = Array.from(form.querySelectorAll("input[name='amenity']:checked"))
      .map(cb => cb.value);

    const newSpot = {
      id: `custom-${Date.now()}`,
      name,
      category,
      categoryName,
      noise,
      location,
      amenities: checkedAmenities.length > 0 ? checkedAmenities : ["Natural Light"],
      description
    };

    state.spots.unshift(newSpot);
    saveCustomSpot(newSpot);

    form.reset();
    noiseDisplay.textContent = "32 dB";
    dialog.close();

    // Re-render and show toast
    renderSpots();
    showToast(`"${name}" added to Quiet Spot sanctuaries!`);

    // Scroll to directory
    document.getElementById("directory").scrollIntoView({ behavior: "smooth" });
  });
}

// ==========================================================================
// 7. Live Toast Notifications
// ==========================================================================

function showToast(message, duration = 3500) {
  const container = document.getElementById("toastNotification");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 300ms ease";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ==========================================================================
// 8. Web Audio API Ambient Sound Sanctuary
// ==========================================================================

class AmbientSoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.channels = {
      rain: { active: false, gain: null, node: null, volume: 0.4 },
      pink: { active: false, gain: null, node: null, volume: 0.35 },
      breeze: { active: false, gain: null, node: null, volume: 0.4 },
      drone: { active: false, gain: null, node: null, volume: 0.3 }
    };
    this.masterVolume = 0.7;
    this.initialized = false;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;

      const statusEl = document.getElementById("audioEngineStatus");
      if (statusEl) {
        statusEl.textContent = "Audio Engine Active";
      }
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setMasterVolume(val) {
    this.masterVolume = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.05);
    }
  }

  setChannelVolume(type, val) {
    if (!this.channels[type]) return;
    this.channels[type].volume = val;
    if (this.channels[type].gain && this.ctx) {
      this.channels[type].gain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.05);
    }
  }

  toggleSound(type) {
    this.ensureContext();
    const ch = this.channels[type];
    if (ch.active) {
      this.stopSound(type);
      return false;
    } else {
      this.startSound(type);
      return true;
    }
  }

  startSound(type) {
    this.ensureContext();
    const ch = this.channels[type];
    if (ch.active) return;

    ch.gain = this.ctx.createGain();
    ch.gain.gain.setValueAtTime(ch.volume, this.ctx.currentTime);
    ch.gain.connect(this.masterGain);

    switch (type) {
      case "rain":
        ch.node = this.createRainNode(ch.gain);
        break;
      case "pink":
        ch.node = this.createPinkNoiseNode(ch.gain);
        break;
      case "breeze":
        ch.node = this.createBreezeNode(ch.gain);
        break;
      case "drone":
        ch.node = this.createDroneNode(ch.gain);
        break;
    }

    ch.active = true;
  }

  stopSound(type) {
    const ch = this.channels[type];
    if (!ch.active) return;

    if (ch.gain && this.ctx) {
      // Smooth fade out
      ch.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
      setTimeout(() => {
        if (ch.node) {
          if (Array.isArray(ch.node)) {
            ch.node.forEach(n => { try { n.stop(); n.disconnect(); } catch (e) {} });
          } else {
            try { ch.node.stop(); ch.node.disconnect(); } catch (e) {}
          }
        }
        if (ch.gain) ch.gain.disconnect();
        ch.active = false;
      }, 100);
    } else {
      ch.active = false;
    }
  }

  // Pink noise algorithm via buffer
  createPinkNoiseBuffer() {
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  createPinkNoiseNode(targetGain) {
    const buffer = this.createPinkNoiseBuffer();
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(targetGain);
    source.start();
    return source;
  }

  // Gentle rain via filtered noise with gentle randomized rumble
  createRainNode(targetGain) {
    const buffer = this.createPinkNoiseBuffer();
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(1400, this.ctx.currentTime);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.setValueAtTime(250, this.ctx.currentTime);

    source.connect(lowpass);
    lowpass.connect(highpass);
    highpass.connect(targetGain);
    source.start();
    return source;
  }

  // Forest breeze with gentle sweeping filter
  createBreezeNode(targetGain) {
    const buffer = this.createPinkNoiseBuffer();
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // LFO to slowly sweep breeze frequency
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    source.connect(filter);
    filter.connect(targetGain);

    source.start();
    lfo.start();
    return [source, lfo];
  }

  // Harmonic 432Hz Drone with gentle vibrato
  createDroneNode(targetGain) {
    const osc1 = this.ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(216, this.ctx.currentTime); // Fundamental 216Hz

    const osc2 = this.ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(432, this.ctx.currentTime); // 432Hz harmonic

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    osc1.connect(targetGain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(targetGain);

    osc1.start();
    osc2.start();
    return [osc1, osc2];
  }

  // Play peaceful chime bell for timer completion
  playChime() {
    this.ensureContext();
    const notes = [528, 660, 792]; // Harmonic soothing chord
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);

      const startTime = this.ctx.currentTime + idx * 0.12;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 2.6);
    });
  }
}

function initSoundSanctuary() {
  const engine = new AmbientSoundEngine();

  // Setup sound toggles
  const sounds = ["rain", "pink", "breeze", "drone"];
  sounds.forEach(type => {
    const btn = document.getElementById(`${type}Toggle`);
    const slider = document.getElementById(`${type}Volume`);

    if (btn) {
      btn.addEventListener("click", () => {
        const isNowPlaying = engine.toggleSound(type);
        btn.setAttribute("aria-pressed", isNowPlaying ? "true" : "false");
        btn.classList.toggle("playing", isNowPlaying);
      });
    }

    if (slider) {
      slider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value, 10) / 100;
        engine.setChannelVolume(type, val);
      });
    }
  });

  // Master volume
  const masterSlider = document.getElementById("masterVolumeSlider");
  const masterValEl = document.getElementById("masterVolVal");
  if (masterSlider) {
    masterSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      masterValEl.textContent = `${val}%`;
      engine.setMasterVolume(val / 100);
    });
  }

  // Connect chime to timer completion
  window.quietSpotSoundEngine = engine;
}

// ==========================================================================
// 9. Focus Sprint Timer
// ==========================================================================

function initFocusTimer() {
  const display = document.getElementById("timerClock");
  const playBtn = document.getElementById("timerPlayBtn");
  const playText = document.getElementById("timerPlayText");
  const playIcon = document.getElementById("timerPlayIcon");
  const resetBtn = document.getElementById("timerResetBtn");
  const modePills = document.querySelectorAll(".timer-pill");

  function formatTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function updateDisplay() {
    const formatted = formatTime(state.timer.remainingSeconds);
    display.textContent = formatted;
    if (state.timer.isRunning) {
      document.title = `(${formatted}) Quiet Spot Focus`;
    } else {
      document.title = "Quiet Spot — Serene Spaces & Focus Sanctuary";
    }
  }

  function startTimer() {
    if (state.timer.isRunning) return;
    state.timer.isRunning = true;
    playText.textContent = "Pause";
    playIcon.textContent = "⏸";

    state.timer.intervalId = setInterval(() => {
      if (state.timer.remainingSeconds > 0) {
        state.timer.remainingSeconds--;
        updateDisplay();
      } else {
        clearInterval(state.timer.intervalId);
        state.timer.isRunning = false;
        playText.textContent = "Start Focus";
        playIcon.textContent = "▶";
        updateDisplay();

        // Play gentle chime
        if (window.quietSpotSoundEngine) {
          window.quietSpotSoundEngine.playChime();
        }
        showToast("Focus sprint complete! Time for a mindful breath.");
      }
    }, 1000);
  }

  function pauseTimer() {
    state.timer.isRunning = false;
    clearInterval(state.timer.intervalId);
    playText.textContent = "Resume";
    playIcon.textContent = "▶";
    updateDisplay();
  }

  function resetTimer() {
    pauseTimer();
    state.timer.remainingSeconds = state.timer.totalSeconds;
    playText.textContent = "Start Focus";
    updateDisplay();
  }

  playBtn.addEventListener("click", () => {
    if (state.timer.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  resetBtn.addEventListener("click", resetTimer);

  modePills.forEach(pill => {
    pill.addEventListener("click", () => {
      modePills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const mins = parseInt(pill.getAttribute("data-minutes"), 10);
      state.timer.totalSeconds = mins * 60;
      state.timer.remainingSeconds = mins * 60;
      resetTimer();
    });
  });

  updateDisplay();
}

// ==========================================================================
// 10. Application Bootstrap
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadStoredData();
  initTheme();
  initFilters();
  renderSpots();
  initDialog();
  initSoundSanctuary();
  initFocusTimer();
});


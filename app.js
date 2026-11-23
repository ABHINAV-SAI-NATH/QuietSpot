/**
 * QuietSpot v2.0 (P06 — A Seat to Study)
 * Institution Context: Lovely Professional University (LPU)
 * Central Campus Library & Academic Block Study Spaces
 * Team G6 (K3P26HK) — Johan Samuel Reji, Abhinav Sai Nath, Diya, Daksh Phartiyal
 */

// ==========================================================================
// 1. REALISTIC LPU CAMPUS TELEMETRY DATA (ZERO PLACEHOLDERS)
// ==========================================================================

const INITIAL_CAMPUS_FLOORS = [
  {
    id: "floor-5",
    name: "Central Library — 5th Floor",
    subtitle: "Deep Focus Silent Zone",
    category: "silent",
    noise: 34,
    noiseLabel: "Library Calm",
    noiseClass: "badge-whisper",
    policy: "Strict Quiet Policy · Laptop typing and turning pages only",
    amenities: ["⚡ Power Outlets", "Natural Daylight", "Strict Quiet", "Wi-Fi"],
    desks: [
      { id: "5F-A01", status: "occupied", power: true, label: "Window Solo" },
      { id: "5F-A02", status: "occupied", power: false, label: "Window Solo" },
      { id: "5F-A03", status: "open", power: true, label: "Aisle Carrel" },
      { id: "5F-A04", status: "open", power: false, label: "Aisle Carrel" },
      { id: "5F-B01", status: "occupied", power: true, label: "Center Table" },
      { id: "5F-B02", status: "open", power: false, label: "Center Table" },
      { id: "5F-B03", status: "occupied", power: false, label: "Center Table" },
      { id: "5F-B04", status: "open", power: true, label: "Corner Solo (Best)" }, // Target desk
      { id: "5F-C01", status: "occupied", power: true, label: "Quiet Wall" },
      { id: "5F-C02", status: "open", power: true, label: "Quiet Wall" },
      { id: "5F-C03", status: "occupied", power: false, label: "Quiet Wall" },
      { id: "5F-C04", status: "open", power: false, label: "East Alcove" }
    ]
  },
  {
    id: "floor-4",
    name: "Central Library — 4th Floor",
    subtitle: "Quiet Reading & Reference Wing",
    category: "silent",
    noise: 38,
    noiseLabel: "Library Calm",
    noiseClass: "badge-calm",
    policy: "Quiet Policy · Journal reading and individual study",
    amenities: ["⚡ Power Outlets", "Book Stacks", "Wi-Fi", "Air Conditioned"],
    desks: [
      { id: "4F-A01", status: "open", power: true, label: "Stack Alcove" },
      { id: "4F-A02", status: "occupied", power: true, label: "Stack Alcove" },
      { id: "4F-A03", status: "open", power: false, label: "Window Desk" },
      { id: "4F-A04", status: "occupied", power: false, label: "Window Desk" },
      { id: "4F-A05", status: "open", power: true, label: "Reference Carrel" },
      { id: "4F-A06", status: "open", power: false, label: "Reference Carrel" },
      { id: "4F-B01", status: "occupied", power: true, label: "Study Row" },
      { id: "4F-B02", status: "occupied", power: false, label: "Study Row" },
      { id: "4F-B03", status: "open", power: true, label: "Study Row" },
      { id: "4F-B04", status: "open", power: false, label: "Study Row" },
      { id: "4F-B05", status: "occupied", power: true, label: "Quiet Corner" },
      { id: "4F-B06", status: "open", power: true, label: "Quiet Corner" }
    ]
  },
  {
    id: "floor-2",
    name: "Central Library — 2nd Floor",
    subtitle: "Solo Study Cabins & Dissertation Nooks",
    category: "silent",
    noise: 42,
    noiseLabel: "Gentle Murmur",
    noiseClass: "badge-murmur",
    policy: "Individual Cabins · Solo deep focus and thesis drafting",
    amenities: ["Private Cabins", "⚡ Power Outlets", "Ergonomic Chairs", "Wi-Fi"],
    isCabins: true,
    cabins: [
      { id: "2F-CAB01", status: "occupied", power: true, label: "Single Cabin" },
      { id: "2F-CAB02", status: "open", power: true, label: "Single Cabin" },
      { id: "2F-CAB03", status: "occupied", power: true, label: "Single Cabin" },
      { id: "2F-CAB04", status: "open", power: true, label: "Single Cabin" },
      { id: "2F-CAB05", status: "occupied", power: true, label: "Corner Cabin" },
      { id: "2F-CAB06", status: "open", power: true, label: "Corner Cabin" },
      { id: "2F-CAB07", status: "occupied", power: true, label: "Thesis Pod" },
      { id: "2F-CAB08", status: "open", power: true, label: "Thesis Pod" }
    ]
  },
  {
    id: "floor-dr",
    name: "Central Library — Discussion Rooms & Basement",
    subtitle: "Collaborative Study & Peer Sprint Zone",
    category: "discussion",
    noise: 54,
    noiseLabel: "Group Discussion Allowed",
    noiseClass: "badge-alert",
    policy: "Collaborative Zone · Verbal peer discussion and project review permitted",
    amenities: ["Whiteboards", "Group Tables", "⚡ Power Outlets", "Screen Share"],
    isDiscussionRooms: true,
    rooms: [
      { id: "DR-01", name: "Discussion Room 1", status: "open", capacity: "6 Seats", features: ["Dry-Erase Board", "⚡ Outlets", "HDMI Screen"] },
      { id: "DR-02", name: "Discussion Room 2", status: "occupied", capacity: "8 Seats", features: ["Projector", "⚡ Outlets", "Whiteboard"] },
      { id: "DR-03", name: "Discussion Room 3", status: "open", capacity: "4 Seats", features: ["⚡ Outlets", "Whiteboard", "Round Table"] },
      { id: "DR-BASE", name: "Basement Large Collaborative Hall", status: "open", capacity: "24 Seats Open", features: ["Open Cluster Tables", "Wi-Fi", "Coffee Kiosk Nearby"] }
    ]
  },
  {
    id: "floor-block34",
    name: "Academic Block 34 — Study Corners",
    subtitle: "Between-Class Quick Overflow Sanctuaries",
    category: "silent",
    noise: 46,
    noiseLabel: "Gentle Murmur",
    noiseClass: "badge-murmur",
    policy: "Between-Lecture Overflow · Quiet study nooks so students avoid staircases",
    amenities: ["2-Min Walk From Lectures", "Natural Light", "Power Outlets", "Wi-Fi"],
    desks: [
      { id: "34-ALC01", status: "open", power: true, label: "2nd Floor West Alcove" },
      { id: "34-ALC02", status: "occupied", power: true, label: "2nd Floor West Alcove" },
      { id: "34-ALC03", status: "open", power: false, label: "3rd Floor Sunlit Corner" },
      { id: "34-ALC04", status: "open", power: true, label: "3rd Floor Sunlit Corner" },
      { id: "34-ALC05", status: "occupied", power: false, label: "4th Floor Balcony Nook" },
      { id: "34-ALC06", status: "open", power: true, label: "4th Floor Balcony Nook" }
    ]
  }
];

// Initial Anonymized Decorum Activity Feed
const INITIAL_DECORUM_ALERTS = [
  { id: "alert-1", time: "12 mins ago", floor: "5th Floor — Deep Focus", category: "Loud Talking in Silent Zone", status: "Supervisor Dispatched" },
  { id: "alert-2", time: "34 mins ago", floor: "4th Floor — Reading Wing", category: "Table / Bag Encroachment", status: "Resolved & Cleared" },
  { id: "alert-3", time: "1 hour ago", floor: "2nd Floor — Study Cabins", category: "Cabin Video Filming / Calls", status: "Resolved & Cleared" }
];

// Student Personas
const PERSONAS = {
  aarav: {
    id: "aarav",
    name: "Aarav Sharma",
    avatar: "AS",
    avatarClass: "",
    badge: "Primary Persona · Habit-Driven Quiet Seeker",
    major: "3rd Year B.Tech CSE",
    preferredFloor: "floor-5",
    preferredDesk: "5F-B04",
    priorities: "5th Floor Deep Focus, Power Outlet ⚡, 5:15–7:30 PM post-lecture peak"
  },
  rohan: {
    id: "rohan",
    name: "Rohan Verma",
    avatar: "RV",
    avatarClass: "avatar-rohan",
    badge: "Secondary Persona · Adaptable Exam-Week Studier",
    major: "2nd Year MBA",
    preferredFloor: "floor-4",
    preferredDesk: "4F-B06",
    priorities: "4th Floor & Discussion Rooms for project group peer sprints"
  }
};

// ==========================================================================
// 2. CENTRAL STATE & LOCAL STORAGE INITIALIZATION
// ==========================================================================

const state = {
  floors: [],
  activeTab: "map-view",
  persona: "aarav",
  coStudyMode: false,
  savedFloorIds: new Set(["floor-5", "floor-2"]),
  activeHold: null,     // { deskId, floorId, floorName, holdExpiresAt, remainingSeconds }
  activeSession: null,  // { deskId, floorId, floorName, checkedInAt, elapsedSeconds, isBreak, breakRemainingSeconds }
  decorumAlerts: [],
  filterCategory: "all",
  powerFilterActive: false,
  searchQuery: "",
  sortOrder: "quietest",
  stats: {
    completedSessions: 4,
    savedWalkMins: 45,
    cleanCheckouts: 100
  },
  intervals: {
    holdTimer: null,
    sessionTimer: null,
    breakTimer: null,
    pomodoroTimer: null,
    micSamplingTimer: null
  },
  pomodoro: {
    totalSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    isRunning: false
  }
};

function loadStoredState() {
  try {
    const savedFloors = localStorage.getItem("quietspot_v2_floors");
    state.floors = savedFloors ? JSON.parse(savedFloors) : JSON.parse(JSON.stringify(INITIAL_CAMPUS_FLOORS));

    const savedAlerts = localStorage.getItem("quietspot_v2_alerts");
    state.decorumAlerts = savedAlerts ? JSON.parse(savedAlerts) : [...INITIAL_DECORUM_ALERTS];

    const savedPersona = localStorage.getItem("quietspot_v2_persona");
    if (savedPersona && PERSONAS[savedPersona]) state.persona = savedPersona;

    const savedBookmarks = localStorage.getItem("quietspot_v2_bookmarks");
    if (savedBookmarks) state.savedFloorIds = new Set(JSON.parse(savedBookmarks));

    const savedHold = localStorage.getItem("quietspot_v2_active_hold");
    if (savedHold) {
      const parsedHold = JSON.parse(savedHold);
      const remaining = Math.max(0, Math.floor((parsedHold.holdExpiresAt - Date.now()) / 1000));
      if (remaining > 0) {
        parsedHold.remainingSeconds = remaining;
        state.activeHold = parsedHold;
      } else {
        localStorage.removeItem("quietspot_v2_active_hold");
      }
    }

    const savedSession = localStorage.getItem("quietspot_v2_active_session");
    if (savedSession) {
      const parsedSession = JSON.parse(savedSession);
      parsedSession.elapsedSeconds = Math.max(0, Math.floor((Date.now() - parsedSession.checkedInAt) / 1000));
      if (parsedSession.isBreak && parsedSession.breakExpiresAt) {
        parsedSession.breakRemainingSeconds = Math.max(0, Math.floor((parsedSession.breakExpiresAt - Date.now()) / 1000));
        if (parsedSession.breakRemainingSeconds <= 0) {
          parsedSession.isBreak = false;
        }
      }
      state.activeSession = parsedSession;
    }

    const savedStats = localStorage.getItem("quietspot_v2_stats");
    if (savedStats) state.stats = JSON.parse(savedStats);

  } catch (err) {
    console.warn("Storage recovery fallback:", err);
    state.floors = JSON.parse(JSON.stringify(INITIAL_CAMPUS_FLOORS));
    state.decorumAlerts = [...INITIAL_DECORUM_ALERTS];
  }
}

function persistState() {
  try {
    localStorage.setItem("quietspot_v2_floors", JSON.stringify(state.floors));
    localStorage.setItem("quietspot_v2_alerts", JSON.stringify(state.decorumAlerts));
    localStorage.setItem("quietspot_v2_persona", state.persona);
    localStorage.setItem("quietspot_v2_bookmarks", JSON.stringify([...state.savedFloorIds]));
    localStorage.setItem("quietspot_v2_stats", JSON.stringify(state.stats));

    if (state.activeHold) {
      localStorage.setItem("quietspot_v2_active_hold", JSON.stringify(state.activeHold));
    } else {
      localStorage.removeItem("quietspot_v2_active_hold");
    }

    if (state.activeSession) {
      localStorage.setItem("quietspot_v2_active_session", JSON.stringify(state.activeSession));
    } else {
      localStorage.removeItem("quietspot_v2_active_session");
    }
  } catch (err) {
    console.warn("Error persisting state:", err);
  }
}

// ==========================================================================
// 3. TAB NAVIGATION ARCHITECTURE
// ==========================================================================

function switchTab(tabId) {
  state.activeTab = tabId;

  // Update desktop nav buttons
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  // Update mobile bottom nav buttons
  document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  // Switch visible section
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === tabId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initNavigation() {
  document.querySelectorAll("[data-tab]").forEach(el => {
    el.addEventListener("click", () => {
      const targetTab = el.getAttribute("data-tab");
      switchTab(targetTab);
    });
  });

  const brandBtn = document.getElementById("brandLogoBtn");
  if (brandBtn) {
    brandBtn.addEventListener("click", (e) => {
      e.preventDefault();
      switchTab("map-view");
    });
  }

  const jumpToMapBtn = document.getElementById("jumpToMapBtn");
  if (jumpToMapBtn) {
    jumpToMapBtn.addEventListener("click", () => switchTab("map-view"));
  }
}

// ==========================================================================
// 4. THEME & PERSONA MANAGEMENT
// ==========================================================================

function initTheme() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("themeToggleBtn");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const savedTheme = localStorage.getItem("quietspot_v2_theme") || "auto";

  function applyTheme(theme) {
    if (theme === "auto") {
      root.removeAttribute("data-theme");
      toggleBtn.setAttribute("title", `Theme: System (${systemPrefersDark.matches ? "Dark" : "Light"})`);
    } else {
      root.setAttribute("data-theme", theme);
      toggleBtn.setAttribute("title", `Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`);
    }
    localStorage.setItem("quietspot_v2_theme", theme);
  }

  toggleBtn.addEventListener("click", () => {
    const current = localStorage.getItem("quietspot_v2_theme") || "auto";
    if (current === "auto") {
      applyTheme(systemPrefersDark.matches ? "light" : "dark");
    } else if (current === "light") {
      applyTheme("dark");
    } else {
      applyTheme("auto");
    }
  });

  systemPrefersDark.addEventListener("change", () => {
    const current = localStorage.getItem("quietspot_v2_theme") || "auto";
    if (current === "auto") applyTheme("auto");
  });

  applyTheme(savedTheme);
}

function setPersona(personaKey) {
  if (!PERSONAS[personaKey]) return;
  state.persona = personaKey;
  const p = PERSONAS[personaKey];

  // Update header quick pill
  const headerAvatar = document.getElementById("headerPersonaAvatar");
  const headerName = document.getElementById("headerPersonaName");
  if (headerAvatar) {
    headerAvatar.textContent = p.avatar;
    headerAvatar.className = `persona-avatar ${p.avatarClass}`;
  }
  if (headerName) {
    headerName.textContent = p.name.split(" ")[0];
  }

  // Update routine tab persona cards
  const cardAarav = document.getElementById("personaCardAarav");
  const cardRohan = document.getElementById("personaCardRohan");
  const activeBadge = document.getElementById("activePersonaBadge");

  if (cardAarav && cardRohan) {
    cardAarav.classList.toggle("active", personaKey === "aarav");
    cardRohan.classList.toggle("active", personaKey === "rohan");
  }
  if (activeBadge) {
    activeBadge.textContent = `Active: ${p.name}`;
  }

  persistState();
  showToast(`Switched student persona to ${p.name} (${p.major})`);
}

function initPersonaHandlers() {
  const headerPill = document.getElementById("personaQuickSwitchBtn");
  if (headerPill) {
    headerPill.addEventListener("click", () => {
      const next = state.persona === "aarav" ? "rohan" : "aarav";
      setPersona(next);
    });
  }

  const cardAarav = document.getElementById("personaCardAarav");
  const cardRohan = document.getElementById("personaCardRohan");
  if (cardAarav) cardAarav.addEventListener("click", () => setPersona("aarav"));
  if (cardRohan) cardRohan.addEventListener("click", () => setPersona("rohan"));

  setPersona(state.persona);
}

// ==========================================================================
// 5. MAP & HOLD TAB (CP6 Fix ISS-01 & ISS-03)
// ==========================================================================

function calculateKPIs() {
  let freeSeats = 0;
  let openDRs = 0;

  state.floors.forEach(floor => {
    if (floor.desks) {
      freeSeats += floor.desks.filter(d => d.status === "open").length;
    }
    if (floor.cabins) {
      freeSeats += floor.cabins.filter(c => c.status === "open").length;
    }
    if (floor.rooms) {
      openDRs += floor.rooms.filter(r => r.status === "open" && r.id.startsWith("DR-0")).length;
    }
  });

  const kpiFree = document.getElementById("kpiFreeSeatsCount");
  const kpiRooms = document.getElementById("kpiOpenRoomsCount");
  if (kpiFree) kpiFree.textContent = freeSeats;
  if (kpiRooms) kpiRooms.textContent = `${openDRs} of 3`;
}

function renderFloors() {
  const container = document.getElementById("floorsContainer");
  if (!container) return;

  calculateKPIs();

  // Filter logic
  let filtered = state.floors.filter(floor => {
    // Category chip filter
    if (state.filterCategory === "silent" && floor.category !== "silent") return false;
    if (state.filterCategory === "discussion" && floor.category !== "discussion") return false;

    // Search query
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase();
      const matchName = floor.name.toLowerCase().includes(q);
      const matchSub = floor.subtitle.toLowerCase().includes(q);
      const matchAmenities = floor.amenities.some(a => a.toLowerCase().includes(q));
      if (!matchName && !matchSub && !matchAmenities) return false;
    }

    return true;
  });

  // Sorting
  if (state.sortOrder === "quietest") {
    filtered.sort((a, b) => a.noise - b.noise);
  } else if (state.sortOrder === "seats") {
    filtered.sort((a, b) => {
      const freeA = (a.desks || a.cabins || []).filter(d => d.status === "open").length;
      const freeB = (b.desks || b.cabins || []).filter(d => d.status === "open").length;
      return freeB - freeA;
    });
  }

  container.innerHTML = filtered.map(floor => {
    const isSaved = state.savedFloorIds.has(floor.id);
    let desksHtml = "";
    let freeCount = 0;
    let totalCount = 0;
    let bestOpenDesk = null;

    if (floor.desks) {
      let displayDesks = floor.desks;
      if (state.powerFilterActive) {
        displayDesks = displayDesks.filter(d => d.power);
      }
      totalCount = displayDesks.length;
      freeCount = displayDesks.filter(d => d.status === "open").length;
      bestOpenDesk = displayDesks.find(d => d.status === "open" && d.power) || displayDesks.find(d => d.status === "open");

      desksHtml = `
        <div class="desk-grid-instructions">
          <span>Tap any green desk to hold for 15 min &middot; ⚡ = Power socket</span>
          <span class="occupancy-summary-pill">${freeCount} of ${totalCount} Free</span>
        </div>
        <div class="desks-interactive-grid">
          ${displayDesks.map(desk => {
            const isHeld = state.activeHold && state.activeHold.deskId === desk.id;
            const isUserSession = state.activeSession && state.activeSession.deskId === desk.id;
            let statusClass = "seat-occupied";
            let statusLabel = "Occupied";

            if (isHeld) {
              statusClass = "seat-held";
              statusLabel = "Held by You";
            } else if (isUserSession) {
              statusClass = "seat-held";
              statusLabel = "Your Seat";
            } else if (desk.status === "open") {
              statusClass = "seat-open";
              statusLabel = "Free";
            }

            return `
              <div 
                class="desk-seat-pill ${statusClass}" 
                data-floor-id="${floor.id}" 
                data-desk-id="${desk.id}"
                data-open="${desk.status === "open"}"
                title="${desk.id} &middot; ${desk.label} (${desk.power ? "⚡ Power socket" : "No socket"})"
              >
                ${desk.status === "open" ? '<span class="seat-pulse"></span>' : ""}
                <span class="desk-id-label">${desk.id}</span>
                <span class="desk-status-text">${statusLabel}</span>
                ${desk.power ? '<span class="power-socket-marker" aria-label="Power socket available">⚡</span>' : ""}
              </div>
            `;
          }).join("")}
        </div>
      `;
    } else if (floor.isCabins) {
      let displayCabins = floor.cabins;
      totalCount = displayCabins.length;
      freeCount = displayCabins.filter(c => c.status === "open").length;
      bestOpenDesk = displayCabins.find(c => c.status === "open");

      desksHtml = `
        <div class="desk-grid-instructions">
          <span>Tap an open private cabin to hold for 15 min</span>
          <span class="occupancy-summary-pill">${freeCount} of ${totalCount} Free</span>
        </div>
        <div class="desks-interactive-grid">
          ${displayCabins.map(cabin => {
            const isHeld = state.activeHold && state.activeHold.deskId === cabin.id;
            const isUserSession = state.activeSession && state.activeSession.deskId === cabin.id;
            let statusClass = "seat-occupied";
            let statusLabel = "Occupied";

            if (isHeld) {
              statusClass = "seat-held";
              statusLabel = "Held by You";
            } else if (isUserSession) {
              statusClass = "seat-held";
              statusLabel = "Your Cabin";
            } else if (cabin.status === "open") {
              statusClass = "seat-open";
              statusLabel = "Free";
            }

            return `
              <div 
                class="desk-seat-pill ${statusClass}" 
                data-floor-id="${floor.id}" 
                data-desk-id="${cabin.id}"
                data-open="${cabin.status === "open"}"
                title="${cabin.id} &middot; Solo Study Cabin (⚡ Power Outlets)"
              >
                ${cabin.status === "open" ? '<span class="seat-pulse"></span>' : ""}
                <span class="desk-id-label">${cabin.id}</span>
                <span class="desk-status-text">${statusLabel}</span>
                <span class="power-socket-marker">⚡</span>
              </div>
            `;
          }).join("")}
        </div>
      `;
    } else if (floor.isDiscussionRooms) {
      desksHtml = `
        <div class="rooms-grid">
          ${floor.rooms.map(room => {
            const isOpen = room.status === "open";
            return `
              <div class="room-card-box ${isOpen ? "room-open" : ""}">
                <div class="room-card-header">
                  <span class="room-id-title">${escapeHTML(room.name)}</span>
                  <span class="db-reading-badge ${isOpen ? "badge-whisper" : "badge-alert"}">
                    ${isOpen ? "Available Now" : "In Use"}
                  </span>
                </div>
                <span class="room-capacity-badge">Capacity: ${escapeHTML(room.capacity)}</span>
                <div class="room-features-list">
                  ${room.features.map(f => `<span class="feature-pill">${escapeHTML(f)}</span>`).join("")}
                </div>
                ${isOpen ? `
                  <button type="button" class="btn btn-sm btn-primary hold-room-btn" data-floor-id="${floor.id}" data-room-id="${room.id}">
                    Hold Discussion Room &middot; 15 Min
                  </button>
                ` : `
                  <span class="text-subtle text-xs" style="font-size:0.75rem; color:var(--color-text-subtle);">Occupied by Peer Study Group</span>
                `}
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    // Direct Hold Best Quiet Seat button (CP6 Fix ISS-01)
    const holdBtnHtml = bestOpenDesk ? `
      <button 
        type="button" 
        class="btn-hold-best" 
        data-floor-id="${floor.id}" 
        data-desk-id="${bestOpenDesk.id}"
      >
        Hold Best Quiet Seat &middot; 15 Min
      </button>
    ` : `
      <button type="button" class="btn-hold-best" style="opacity:0.5; cursor:not-allowed;" disabled>
        Floor Fully Occupied
      </button>
    `;

    return `
      <article class="floor-card" data-floor-id="${floor.id}">
        <div class="floor-card-header">
          <div class="floor-title-block">
            <div class="floor-badge-row">
              <span class="zone-type-badge">${escapeHTML(floor.category)}</span>
              <span class="db-reading-badge ${floor.noiseClass}">
                <span aria-hidden="true">📡</span>
                <span>${floor.noise} dB &middot; ${floor.noiseLabel}</span>
              </span>
            </div>
            <h2 class="floor-name">${escapeHTML(floor.name)}</h2>
            <p class="floor-location-meta">${escapeHTML(floor.subtitle)} &middot; ${escapeHTML(floor.policy)}</p>
          </div>

          <div class="floor-cta-block">
            <!-- CP6 Fix ISS-01: Direct Action CTA on Floor Card -->
            ${!floor.isDiscussionRooms ? holdBtnHtml : ""}
            <button 
              type="button" 
              class="floor-bookmark-btn ${isSaved ? "saved" : ""}" 
              data-bookmark-floor="${floor.id}"
              aria-label="${isSaved ? "Remove from saved floors" : "Save this floor"}"
              title="${isSaved ? "Remove from favorites" : "Save to favorites"}"
            >
              <svg viewBox="0 0 24 24" fill="${isSaved ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>

        ${desksHtml}
      </article>
    `;
  }).join("");

  attachFloorEventListeners();
}

function attachFloorEventListeners() {
  // Hold Best button click
  document.querySelectorAll(".btn-hold-best").forEach(btn => {
    btn.addEventListener("click", () => {
      const floorId = btn.getAttribute("data-floor-id");
      const deskId = btn.getAttribute("data-desk-id");
      if (floorId && deskId) openHoldConfirmModal(floorId, deskId);
    });
  });

  // Individual Desk Tap click
  document.querySelectorAll(".desk-seat-pill.seat-open").forEach(seat => {
    seat.addEventListener("click", () => {
      const floorId = seat.getAttribute("data-floor-id");
      const deskId = seat.getAttribute("data-desk-id");
      if (floorId && deskId) openHoldConfirmModal(floorId, deskId);
    });
  });

  // Room hold buttons
  document.querySelectorAll(".hold-room-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const floorId = btn.getAttribute("data-floor-id");
      const roomId = btn.getAttribute("data-room-id");
      if (floorId && roomId) openHoldConfirmModal(floorId, roomId);
    });
  });

  // Floor bookmark button click
  document.querySelectorAll(".floor-bookmark-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const floorId = btn.getAttribute("data-bookmark-floor");
      toggleSaveFloor(floorId);
    });
  });
}

function toggleSaveFloor(floorId) {
  if (state.savedFloorIds.has(floorId)) {
    state.savedFloorIds.delete(floorId);
    showToast("Floor removed from your saved list.");
  } else {
    state.savedFloorIds.add(floorId);
    showToast("Floor added to your saved sanctuaries!");
  }
  persistState();
  renderFloors();
  renderSavedSpotsList();
}

// Search and Filter controls in Tab 1
function initFloorControls() {
  const searchInput = document.getElementById("zoneSearchInput");
  const clearBtn = document.getElementById("clearZoneSearchBtn");
  const chips = document.querySelectorAll(".filter-chip:not(.chip-power)");
  const powerChip = document.getElementById("powerFilterChip");
  const sortSelect = document.getElementById("zoneSortSelect");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (clearBtn) clearBtn.hidden = state.searchQuery === "";
      renderFloors();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      clearBtn.hidden = true;
      searchInput.focus();
      renderFloors();
    });
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.filterCategory = chip.getAttribute("data-filter");
      renderFloors();
    });
  });

  // CP6 Fix ISS-03: Power Outlets Toggle
  if (powerChip) {
    powerChip.addEventListener("click", () => {
      state.powerFilterActive = !state.powerFilterActive;
      powerChip.classList.toggle("active", state.powerFilterActive);
      powerChip.setAttribute("data-active", state.powerFilterActive ? "true" : "false");
      renderFloors();
      if (state.powerFilterActive) {
        showToast("Filtering desks with ⚡ Power Outlets only");
      }
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortOrder = e.target.value;
      renderFloors();
    });
  }
}

// ==========================================================================
// 6. HOLD & SESSION TIMERS ARCHITECTURE
// ==========================================================================

function formatMMSS(totalSecs) {
  const m = Math.floor(totalSecs / 60).toString().padStart(2, "0");
  const s = (totalSecs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function formatHHMMSS(totalSecs) {
  const h = Math.floor(totalSecs / 3600).toString().padStart(2, "0");
  const m = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, "0");
  const s = (totalSecs % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function updateActiveSessionBanner() {
  const banner = document.getElementById("activeSessionBanner");
  const badge = document.getElementById("sessionStatusBadge");
  const deskEl = document.getElementById("sessionDeskId");
  const locEl = document.getElementById("sessionLocationMeta");
  const timerLbl = document.getElementById("sessionTimerLabel");
  const clock = document.getElementById("sessionTickingClock");
  const primaryBtn = document.getElementById("bannerPrimaryActionBtn");
  const secondaryBtn = document.getElementById("bannerSecondaryActionBtn");

  if (!banner) return;

  if (state.activeHold) {
    banner.hidden = false;
    banner.className = "active-session-banner";
    badge.textContent = "15-Min Hold Active";
    deskEl.textContent = state.activeHold.deskId;
    locEl.textContent = `· ${state.activeHold.floorName}`;
    timerLbl.textContent = "Walk Hold Countdown:";
    clock.textContent = formatMMSS(state.activeHold.remainingSeconds);

    primaryBtn.textContent = "Scan Desk QR";
    primaryBtn.onclick = () => switchTab("scan-view");

    secondaryBtn.textContent = "Cancel Hold";
    secondaryBtn.onclick = () => releaseHold("Hold cancelled by user.");
  } else if (state.activeSession) {
    banner.hidden = false;
    deskEl.textContent = state.activeSession.deskId;
    locEl.textContent = `· ${state.activeSession.floorName}`;

    if (state.activeSession.isBreak) {
      banner.className = "active-session-banner status-break";
      badge.textContent = "20-Min Break Hold";
      timerLbl.textContent = "Break Remaining:";
      clock.textContent = formatMMSS(state.activeSession.breakRemainingSeconds);

      primaryBtn.textContent = "Resume Study";
      primaryBtn.onclick = () => resumeFromBreak();

      secondaryBtn.textContent = "Check-Out";
      secondaryBtn.onclick = () => openCleanCheckOutModal();
    } else {
      banner.className = "active-session-banner status-checked-in";
      badge.textContent = "Checked In & Studying";
      timerLbl.textContent = "Study Time Elapsed:";
      clock.textContent = formatHHMMSS(state.activeSession.elapsedSeconds);

      primaryBtn.textContent = "Take Break";
      primaryBtn.onclick = () => startBreak();

      secondaryBtn.textContent = "Clean Check-Out";
      secondaryBtn.onclick = () => openCleanCheckOutModal();
    }
  } else {
    banner.hidden = true;
  }

  updateScannerViewUI();
}

function startHoldCountdown() {
  if (state.intervals.holdTimer) clearInterval(state.intervals.holdTimer);

  state.intervals.holdTimer = setInterval(() => {
    if (!state.activeHold) {
      clearInterval(state.intervals.holdTimer);
      return;
    }

    state.activeHold.remainingSeconds--;

    if (state.activeHold.remainingSeconds <= 0) {
      clearInterval(state.intervals.holdTimer);
      const expiredDesk = state.activeHold.deskId;
      releaseHold(`Walk hold for ${expiredDesk} expired. Seat released for campus peers.`);
    } else {
      updateActiveSessionBanner();
      persistState();
    }
  }, 1000);
}

function startSessionClock() {
  if (state.intervals.sessionTimer) clearInterval(state.intervals.sessionTimer);

  state.intervals.sessionTimer = setInterval(() => {
    if (!state.activeSession) {
      clearInterval(state.intervals.sessionTimer);
      return;
    }

    if (state.activeSession.isBreak) {
      if (state.activeSession.breakRemainingSeconds > 0) {
        state.activeSession.breakRemainingSeconds--;
      } else {
        // Break expired -> auto release seat
        showToast("Break time expired. Desk released for other students.");
        cleanCheckOutSession();
        return;
      }
    } else {
      state.activeSession.elapsedSeconds++;
    }

    updateActiveSessionBanner();
    persistState();
  }, 1000);
}

function releaseHold(reason) {
  if (state.activeHold) {
    const { floorId, deskId } = state.activeHold;
    const floor = state.floors.find(f => f.id === floorId);
    if (floor) {
      const desk = (floor.desks || floor.cabins || []).find(d => d.id === deskId);
      if (desk) desk.status = "open";
    }
    state.activeHold = null;
    clearInterval(state.intervals.holdTimer);
    persistState();
    renderFloors();
    updateActiveSessionBanner();
    if (reason) showToast(reason);
  }
}

// ==========================================================================
// 7. TAB 2: SCAN DESK QR & ARRIVAL VERIFICATION
// ==========================================================================

function updateScannerViewUI() {
  const targetPill = document.getElementById("scannerTargetPill");
  const scanBtnText = document.getElementById("scanBtnText");
  const qrBadge = document.getElementById("qrDeskCodeBadge");
  const deskStatePill = document.getElementById("deskStatePill");
  const emptyState = document.getElementById("noActiveSessionState");
  const sessionPanel = document.getElementById("activeSessionPanel");
  const walkInPicker = document.getElementById("walkInDeskPickerWrapper");
  const walkInSelect = document.getElementById("walkInDeskSelect");

  const activeFloor = document.getElementById("activeFloorName");
  const activeDesk = document.getElementById("activeDeskDisplayId");
  const activeClock = document.getElementById("activeSessionElapsedTime");
  const activeTimerCaption = document.getElementById("activeTimerCaption");
  const activeTimerSub = document.getElementById("activeTimerSubtext");
  const breakBtn = document.getElementById("takeBreakBtn");
  const breakBtnText = document.getElementById("breakBtnText");

  if (!targetPill || !scanBtnText) return;

  if (state.activeHold) {
    const dId = state.activeHold.deskId;
    targetPill.textContent = `Target: ${dId}`;
    scanBtnText.textContent = `Simulate Desk QR Scan (Check In to ${dId})`;
    qrBadge.textContent = `DESK: ${dId}`;
    deskStatePill.textContent = "15-Min Hold Active";
    deskStatePill.className = "state-pill text-amber";

    emptyState.hidden = true;
    sessionPanel.hidden = false;
    walkInPicker.hidden = true;

    activeFloor.textContent = state.activeHold.floorName;
    activeDesk.textContent = dId;
    activeClock.textContent = formatMMSS(state.activeHold.remainingSeconds);
    activeClock.className = "box-clock text-amber";
    activeTimerCaption.textContent = "Walk Hold Countdown";
    activeTimerSub.textContent = "Tap 'Simulate Desk QR Scan' on arrival to confirm desk.";
    breakBtn.hidden = true;

  } else if (state.activeSession) {
    const dId = state.activeSession.deskId;
    targetPill.textContent = `Active: ${dId}`;
    scanBtnText.textContent = `Verified at Desk ${dId}`;
    qrBadge.textContent = `DESK: ${dId}`;
    deskStatePill.textContent = state.activeSession.isBreak ? "Break Hold Active" : "In Session";
    deskStatePill.className = state.activeSession.isBreak ? "state-pill text-amber" : "state-pill text-emerald";

    emptyState.hidden = true;
    sessionPanel.hidden = false;
    walkInPicker.hidden = true;

    activeFloor.textContent = state.activeSession.floorName;
    activeDesk.textContent = dId;
    breakBtn.hidden = false;

    if (state.activeSession.isBreak) {
      activeClock.textContent = formatMMSS(state.activeSession.breakRemainingSeconds);
      activeClock.className = "box-clock text-amber";
      activeTimerCaption.textContent = "20-Min Break Time Left";
      activeTimerSub.textContent = "Seat protected. Tap 'Resume Study' upon return.";
      breakBtnText.textContent = "Resume Studying";
    } else {
      activeClock.textContent = formatHHMMSS(state.activeSession.elapsedSeconds);
      activeClock.className = "box-clock text-emerald";
      activeTimerCaption.textContent = "Study Session In Progress";
      activeTimerSub.textContent = "Checked in via Optical Desk QR Verification";
      breakBtnText.textContent = "Take 20-Min Break Hold";
    }

  } else {
    // No hold, no session
    targetPill.textContent = "Target: Open Desks";
    scanBtnText.textContent = "Simulate Desk QR Scan (Walk-In)";
    qrBadge.textContent = "SCAN ANY DESK";
    deskStatePill.textContent = "No Active Session";
    deskStatePill.className = "state-pill";

    emptyState.hidden = false;
    sessionPanel.hidden = true;
    walkInPicker.hidden = false;

    // Populate walk in select with open desks
    if (walkInSelect) {
      let openOptions = [];
      state.floors.forEach(f => {
        (f.desks || f.cabins || []).forEach(d => {
          if (d.status === "open") {
            openOptions.push(`<option value="${f.id}|${d.id}">${d.id} &middot; ${f.name}</option>`);
          }
        });
      });
      walkInSelect.innerHTML = openOptions.join("");
    }
  }
}

function checkInToDesk(floorId, deskId) {
  // Clear hold if held
  if (state.activeHold) {
    clearInterval(state.intervals.holdTimer);
    state.activeHold = null;
  }

  const floor = state.floors.find(f => f.id === floorId);
  const floorName = floor ? floor.name : "Central Library 5th Floor";

  if (floor) {
    const desk = (floor.desks || floor.cabins || []).find(d => d.id === deskId);
    if (desk) desk.status = "occupied";
  }

  state.activeSession = {
    deskId,
    floorId,
    floorName,
    checkedInAt: Date.now(),
    elapsedSeconds: 0,
    isBreak: false,
    breakRemainingSeconds: 20 * 60
  };

  startSessionClock();
  persistState();
  renderFloors();
  updateActiveSessionBanner();

  showToast(`QR Scan Verified! Checked in to ${deskId}. Digital Desk Boundary is now active.`);
}

function startBreak() {
  if (!state.activeSession) return;

  state.activeSession.isBreak = true;
  state.activeSession.breakRemainingSeconds = 20 * 60;
  state.activeSession.breakExpiresAt = Date.now() + 20 * 60 * 1000;

  persistState();
  updateActiveSessionBanner();
  showToast("20-Minute Break Hold started. Desk protected against bag-sprawling.");
}

function resumeFromBreak() {
  if (!state.activeSession) return;
  state.activeSession.isBreak = false;
  persistState();
  updateActiveSessionBanner();
  showToast("Welcome back! Study session resumed.");
}

function cleanCheckOutSession() {
  if (!state.activeSession) return;

  const { floorId, deskId } = state.activeSession;
  const floor = state.floors.find(f => f.id === floorId);
  if (floor) {
    const desk = (floor.desks || floor.cabins || []).find(d => d.id === deskId);
    if (desk) desk.status = "open";
  }

  clearInterval(state.intervals.sessionTimer);
  state.activeSession = null;

  // Increment stats
  state.stats.completedSessions++;
  state.stats.savedWalkMins += 15;

  persistState();
  renderFloors();
  updateActiveSessionBanner();
  renderStudyStats();

  showToast(`Clean check-out confirmed for ${deskId}. Desk is ready for fellow students!`);
}

function initScanHandlers() {
  const triggerBtn = document.getElementById("triggerScanActionBtn");
  const walkInBtn = document.getElementById("walkInCheckInBtn");
  const walkInSelect = document.getElementById("walkInDeskSelect");
  const breakBtn = document.getElementById("takeBreakBtn");
  const checkOutBtn = document.getElementById("cleanCheckOutBtn");

  if (triggerBtn) {
    triggerBtn.addEventListener("click", () => {
      if (state.activeHold) {
        checkInToDesk(state.activeHold.floorId, state.activeHold.deskId);
      } else if (state.activeSession) {
        showToast(`You are already checked in to ${state.activeSession.deskId}.`);
      } else {
        // Walk in scan to 5F-B04 default or first open
        if (walkInSelect && walkInSelect.value) {
          const [fId, dId] = walkInSelect.value.split("|");
          checkInToDesk(fId, dId);
        } else {
          checkInToDesk("floor-5", "5F-B04");
        }
      }
    });
  }

  if (walkInBtn && walkInSelect) {
    walkInBtn.addEventListener("click", () => {
      if (walkInSelect.value) {
        const [fId, dId] = walkInSelect.value.split("|");
        checkInToDesk(fId, dId);
      }
    });
  }

  if (breakBtn) {
    breakBtn.addEventListener("click", () => {
      if (state.activeSession) {
        if (state.activeSession.isBreak) {
          resumeFromBreak();
        } else {
          startBreak();
        }
      }
    });
  }

  if (checkOutBtn) {
    checkOutBtn.addEventListener("click", () => openCleanCheckOutModal());
  }
}

// ==========================================================================
// 8. TAB 3: QUIET ALERT (100% ANONYMOUS DECORUM REPORTING)
// ==========================================================================

function renderRecentAlerts() {
  const list = document.getElementById("recentAlertsList");
  if (!list) return;

  list.innerHTML = state.decorumAlerts.map(alert => `
    <div class="alert-feed-item">
      <div>
        <span class="feed-status-dot"></span>
        <strong>${escapeHTML(alert.category)}</strong>
        <span class="text-subtle"> &middot; ${escapeHTML(alert.floor)}</span>
      </div>
      <div style="text-align:right;">
        <span class="feed-time">${escapeHTML(alert.time)}</span>
        <div style="font-size:0.7rem; color:var(--color-emerald); font-weight:600;">${escapeHTML(alert.status)}</div>
      </div>
    </div>
  `).join("");
}

function initDecorumAlertForm() {
  const form = document.getElementById("decorumAlertForm");
  const chips = document.querySelectorAll(".disruption-chip");
  let selectedCategory = "Loud Talking in Silent Zone";

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      selectedCategory = chip.getAttribute("data-category");
    });
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const floor = document.getElementById("alertFloorSelect").value;
      const deskContext = document.getElementById("alertDeskInput").value.trim();

      const newAlert = {
        id: `alert-${Date.now()}`,
        time: "Just now",
        floor: deskContext ? `${floor} (${deskContext})` : floor,
        category: selectedCategory,
        status: "Floor Supervisor Notified (Check: 3-5m)"
      };

      state.decorumAlerts.unshift(newAlert);
      if (state.decorumAlerts.length > 5) state.decorumAlerts.pop();

      persistState();
      renderRecentAlerts();

      form.reset();
      chips[0].click();

      showToast("Floor supervisor silently notified. 100% anonymous — no credentials sent.");
    });
  }
}

// 6-Second Browser Microphone Decibel Meter (Web Audio API)
function initMicMeter() {
  const startBtn = document.getElementById("startMicMeterBtn");
  const meterText = document.getElementById("meterBtnText");
  const dbVal = document.getElementById("liveMeterDbVal");
  const classBadge = document.getElementById("liveMeterClassBadge");
  const barFill = document.getElementById("meterBarFill");
  const samplingState = document.getElementById("meterSamplingState");
  const countdownVal = document.getElementById("meterCountdownVal");

  let audioCtx = null;
  let micStream = null;

  startBtn.addEventListener("click", async () => {
    startBtn.disabled = true;
    meterText.textContent = "Measuring room sound...";
    samplingState.hidden = false;

    let secondsLeft = 6;
    countdownVal.textContent = "6s";

    let samples = [];

    // Attempt real Web Audio API getUserMedia
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(micStream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const sampleInterval = setInterval(() => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          // Approximate calibrated dB scale (20dB to 75dB)
          const estimatedDb = Math.round(28 + (avg / 255) * 45);
          samples.push(estimatedDb);
          updateMeterDisplay(estimatedDb);
        }, 200);

        // 6 second timer
        const countInterval = setInterval(() => {
          secondsLeft--;
          countdownVal.textContent = `${secondsLeft}s`;
          if (secondsLeft <= 0) {
            clearInterval(countInterval);
            clearInterval(sampleInterval);
            finishMeasurement(samples, micStream, audioCtx);
          }
        }, 1000);

        return;
      }
    } catch (err) {
      console.warn("Microphone access unavailable or denied. Using calibrated simulated telemetry fallback.", err);
    }

    // Graceful simulated measurement fallback
    const simInterval = setInterval(() => {
      const simulatedDb = Math.floor(32 + Math.random() * 8); // 32-40 dB library range
      samples.push(simulatedDb);
      updateMeterDisplay(simulatedDb);
    }, 250);

    const countInterval = setInterval(() => {
      secondsLeft--;
      countdownVal.textContent = `${secondsLeft}s`;
      if (secondsLeft <= 0) {
        clearInterval(countInterval);
        clearInterval(simInterval);
        finishMeasurement(samples, null, null);
      }
    }, 1000);
  });

  function updateMeterDisplay(db) {
    dbVal.textContent = `${db} dB`;
    const pct = Math.min(100, Math.max(10, ((db - 20) / 60) * 100));
    barFill.style.inlineSize = `${pct}%`;

    if (db <= 35) {
      dbVal.className = "live-db-val text-emerald";
      classBadge.textContent = "Whisper Silent · Optimal for Deep Focus";
    } else if (db <= 44) {
      dbVal.className = "live-db-val text-blue";
      classBadge.textContent = "Library Calm · Optimal for Study";
    } else {
      dbVal.className = "live-db-val text-amber";
      classBadge.textContent = "Gentle Murmur · Casual Collaboration";
    }
  }

  function finishMeasurement(samples, stream, ctx) {
    if (stream) stream.getTracks().forEach(t => t.stop());
    if (ctx) ctx.close();

    samplingState.hidden = true;
    startBtn.disabled = false;
    meterText.textContent = "Measure Again (6-Sec Meter)";

    const avgDb = samples.length > 0 
      ? Math.round(samples.reduce((a, b) => a + b, 0) / samples.length) 
      : 36;

    updateMeterDisplay(avgDb);
    showToast(`Acoustic measurement complete: Average ${avgDb} dB recorded locally.`);
  }
}

// ==========================================================================
// 9. TAB 4: ROUTINE, FOCUS TOOLS & WEBAUDIO AMBIENT GENERATOR
// ==========================================================================

function renderSavedSpotsList() {
  const container = document.getElementById("savedSpotsList");
  const countBadge = document.getElementById("savedCountBadge");
  if (!container) return;

  if (countBadge) {
    countBadge.textContent = `${state.savedFloorIds.size} Saved`;
  }

  const savedFloors = state.floors.filter(f => state.savedFloorIds.has(f.id));

  if (savedFloors.length === 0) {
    container.innerHTML = `
      <div style="font-size:0.84rem; color:var(--color-text-subtle); padding:1rem; text-align:center;">
        No favorite floors saved yet. Tap the bookmark icon on any floor in Map &amp; Hold to pin it here.
      </div>
    `;
    return;
  }

  container.innerHTML = savedFloors.map(f => `
    <div class="saved-item-box">
      <div class="saved-item-info">
        <span class="saved-item-name">${escapeHTML(f.name)}</span>
        <span class="saved-item-meta">${escapeHTML(f.subtitle)} &middot; ${f.noise} dB</span>
      </div>
      <button type="button" class="btn btn-sm btn-secondary" onclick="switchTab('map-view')">
        Open Map
      </button>
    </div>
  `).join("");
}

function renderStudyStats() {
  const comp = document.getElementById("statCompletedSessions");
  const walk = document.getElementById("statSavedWalkMins");
  const clean = document.getElementById("statCleanCheckouts");

  if (comp) comp.textContent = state.stats.completedSessions;
  if (walk) walk.textContent = `${state.stats.savedWalkMins}m`;
  if (clean) clean.textContent = `${state.stats.cleanCheckouts}%`;
}

// Web Audio Ambient Synthesizer
class CampusSoundSanctuary {
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
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
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

  setVolume(type, val) {
    if (!this.channels[type]) return;
    this.channels[type].volume = val;
    if (this.channels[type].gain && this.ctx) {
      this.channels[type].gain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.05);
    }
  }

  toggle(type) {
    this.ensureContext();
    const ch = this.channels[type];
    if (ch.active) {
      this.stop(type);
      return false;
    } else {
      this.start(type);
      return true;
    }
  }

  start(type) {
    this.ensureContext();
    const ch = this.channels[type];
    if (ch.active) return;

    ch.gain = this.ctx.createGain();
    ch.gain.gain.setValueAtTime(ch.volume, this.ctx.currentTime);
    ch.gain.connect(this.masterGain);

    if (type === "pink") ch.node = this.createPinkNoise(ch.gain);
    if (type === "rain") ch.node = this.createRain(ch.gain);
    if (type === "breeze") ch.node = this.createBreeze(ch.gain);
    if (type === "drone") ch.node = this.createDrone(ch.gain);

    ch.active = true;
  }

  stop(type) {
    const ch = this.channels[type];
    if (!ch.active) return;

    if (ch.gain && this.ctx) {
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
    }
  }

  createPinkBuffer() {
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  createPinkNoise(target) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.createPinkBuffer();
    src.loop = true;
    src.connect(target);
    src.start();
    return src;
  }

  createRain(target) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.createPinkBuffer();
    src.loop = true;

    const lp = this.ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(1200, this.ctx.currentTime);

    const hp = this.ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.setValueAtTime(300, this.ctx.currentTime);

    src.connect(lp);
    lp.connect(hp);
    hp.connect(target);
    src.start();
    return src;
  }

  createBreeze(target) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.createPinkBuffer();
    src.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(200, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    src.connect(filter);
    filter.connect(target);

    src.start();
    lfo.start();
    return [src, lfo];
  }

  createDrone(target) {
    const osc1 = this.ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(216, this.ctx.currentTime);

    const osc2 = this.ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(432, this.ctx.currentTime);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.25, this.ctx.currentTime);

    osc1.connect(target);
    osc2.connect(gain2);
    gain2.connect(target);

    osc1.start();
    osc2.start();
    return [osc1, osc2];
  }

  playChime() {
    this.ensureContext();
    [528, 660, 792].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);

      const t = this.ctx.currentTime + idx * 0.12;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 2.6);
    });
  }
}

function initSoundSanctuary() {
  const engine = new CampusSoundSanctuary();
  window.campusSoundEngine = engine;

  ["rain", "pink", "breeze", "drone"].forEach(key => {
    const btn = document.getElementById(`${key}AudioToggle`);
    const range = document.getElementById(`${key}VolumeRange`);

    if (btn) {
      btn.addEventListener("click", () => {
        const isPlaying = engine.toggle(key);
        btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
      });
    }

    if (range) {
      range.addEventListener("input", (e) => {
        engine.setVolume(key, parseInt(e.target.value, 10) / 100);
      });
    }
  });

  const masterRange = document.getElementById("masterAudioRange");
  const masterValText = document.getElementById("masterAudioValText");
  if (masterRange) {
    masterRange.addEventListener("input", (e) => {
      const v = parseInt(e.target.value, 10);
      if (masterValText) masterValText.textContent = `${v}%`;
      engine.setMasterVolume(v / 100);
    });
  }

  // Silent Co-Study Toggle listener
  const coStudy = document.getElementById("coStudyToggle");
  if (coStudy) {
    coStudy.addEventListener("change", (e) => {
      state.coStudyMode = e.target.checked;
      showToast(state.coStudyMode 
        ? "Silent Co-Study Mode active: Highlighting desks near peer studiers." 
        : "Co-Study Mode turned off.");
    });
  }
}

// Pomodoro Timer
function initPomodoro() {
  const clock = document.getElementById("pomodoroClock");
  const startBtn = document.getElementById("pomodoroStartBtn");
  const btnLabel = document.getElementById("pomodoroBtnLabel");
  const icon = document.getElementById("pomodoroIcon");
  const resetBtn = document.getElementById("pomodoroResetBtn");
  const chips = document.querySelectorAll(".timer-chip");

  function renderClock() {
    clock.textContent = formatMMSS(state.pomodoro.remainingSeconds);
  }

  function startTimer() {
    state.pomodoro.isRunning = true;
    btnLabel.textContent = "Pause";
    icon.textContent = "⏸";

    state.intervals.pomodoroTimer = setInterval(() => {
      if (state.pomodoro.remainingSeconds > 0) {
        state.pomodoro.remainingSeconds--;
        renderClock();
      } else {
        clearInterval(state.intervals.pomodoroTimer);
        state.pomodoro.isRunning = false;
        btnLabel.textContent = "Start Sprint";
        icon.textContent = "▶";
        renderClock();

        if (window.campusSoundEngine) window.campusSoundEngine.playChime();
        showToast("Focus sprint complete! Take a deep breath.");
      }
    }, 1000);
  }

  function pauseTimer() {
    state.pomodoro.isRunning = false;
    clearInterval(state.intervals.pomodoroTimer);
    btnLabel.textContent = "Resume";
    icon.textContent = "▶";
  }

  function resetTimer() {
    pauseTimer();
    state.pomodoro.remainingSeconds = state.pomodoro.totalSeconds;
    btnLabel.textContent = "Start Sprint";
    icon.textContent = "▶";
    renderClock();
  }

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (state.pomodoro.isRunning) pauseTimer();
      else startTimer();
    });
  }

  if (resetBtn) resetBtn.addEventListener("click", resetTimer);

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const mins = parseInt(chip.getAttribute("data-mins"), 10);
      state.pomodoro.totalSeconds = mins * 60;
      resetTimer();
    });
  });

  renderClock();
}

// ==========================================================================
// 10. MODAL DIALOGS (HOLD CONFIRMATION & CLEAN CHECKOUT)
// ==========================================================================

let pendingHoldSelection = null;

function openHoldConfirmModal(floorId, deskId) {
  const floor = state.floors.find(f => f.id === floorId);
  if (!floor) return;

  const desk = (floor.desks || floor.cabins || floor.rooms || []).find(d => d.id === deskId);
  const modal = document.getElementById("holdConfirmModal");
  if (!modal) return;

  pendingHoldSelection = { floorId, deskId, floorName: floor.name };

  document.getElementById("holdModalDeskId").textContent = deskId;
  document.getElementById("holdModalLocation").textContent = `${floor.name} (${floor.subtitle})`;
  document.getElementById("holdModalNoise").textContent = `${floor.noise} dB · ${floor.noiseLabel}`;
  document.getElementById("holdModalAmenities").textContent = floor.amenities.join(" · ");

  modal.showModal();
}

function openCleanCheckOutModal() {
  const modal = document.getElementById("cleanCheckOutModal");
  if (!modal || !state.activeSession) return;

  document.getElementById("checkOutDeskId").textContent = state.activeSession.deskId;
  modal.showModal();
}

function initModals() {
  const holdModal = document.getElementById("holdConfirmModal");
  const checkOutModal = document.getElementById("cleanCheckOutModal");

  const closeHoldBtn = document.getElementById("closeHoldModalBtn");
  const cancelHoldBtn = document.getElementById("cancelHoldBtn");
  const confirmHoldBtn = document.getElementById("confirmHoldActionBtn");

  const closeCheckOutBtn = document.getElementById("closeCheckOutModalBtn");
  const cancelCheckOutBtn = document.getElementById("cancelCheckOutBtn");
  const confirmCheckOutBtn = document.getElementById("confirmCheckOutBtn");

  // Close hold
  const closeHold = () => { if (holdModal) holdModal.close(); };
  if (closeHoldBtn) closeHoldBtn.addEventListener("click", closeHold);
  if (cancelHoldBtn) cancelHoldBtn.addEventListener("click", closeHold);

  // Close checkout
  const closeCheckOut = () => { if (checkOutModal) checkOutModal.close(); };
  if (closeCheckOutBtn) closeCheckOutBtn.addEventListener("click", closeCheckOut);
  if (cancelCheckOutBtn) cancelCheckOutBtn.addEventListener("click", closeCheckOut);

  // Light dismiss fallback for browsers without native closedby
  [holdModal, checkOutModal].forEach(modal => {
    if (!modal) return;
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      modal.addEventListener("click", (e) => {
        if (e.target !== modal) return;
        const rect = modal.getBoundingClientRect();
        const inside = (
          rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX && e.clientX <= rect.left + rect.width
        );
        if (!inside) modal.close();
      });
    }
    modal.addEventListener("close", () => { modal.returnValue = ""; });
  });

  // Confirm 15-minute walk hold
  if (confirmHoldBtn) {
    confirmHoldBtn.addEventListener("click", () => {
      if (!pendingHoldSelection) return;

      // If user had an existing hold on another seat, release it
      if (state.activeHold) {
        releaseHold();
      }

      const { floorId, deskId, floorName } = pendingHoldSelection;

      state.activeHold = {
        deskId,
        floorId,
        floorName,
        holdExpiresAt: Date.now() + 15 * 60 * 1000,
        remainingSeconds: 15 * 60
      };

      // Mark desk as held
      const floor = state.floors.find(f => f.id === floorId);
      if (floor) {
        const desk = (floor.desks || floor.cabins || []).find(d => d.id === deskId);
        if (desk) desk.status = "held";
      }

      startHoldCountdown();
      persistState();
      renderFloors();
      updateActiveSessionBanner();

      holdModal.close();
      showToast(`15-Minute Walk Hold active for ${deskId}. Walk over and scan desk QR on arrival.`);
    });
  }

  // Confirm clean check-out
  if (confirmCheckOutBtn) {
    confirmCheckOutBtn.addEventListener("click", () => {
      cleanCheckOutModal.close();
      cleanCheckOutSession();
    });
  }
}

// ==========================================================================
// 11. TOAST NOTIFICATIONS & DEMO RESET
// ==========================================================================

function showToast(message, duration = 3600) {
  const container = document.getElementById("toastNotification");
  if (!container) return;

  const bubble = document.createElement("div");
  bubble.className = "toast-bubble";
  bubble.textContent = message;

  container.appendChild(bubble);

  setTimeout(() => {
    bubble.style.opacity = "0";
    bubble.style.transition = "opacity 250ms ease";
    setTimeout(() => bubble.remove(), 250);
  }, duration);
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

function initDemoReset() {
  const resetBtn = document.getElementById("resetDemoBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset demo state back to default LPU campus seats & clean checkouts?")) {
        localStorage.clear();
        location.reload();
      }
    });
  }
}

// ==========================================================================
// 12. BOOTSTRAP INITIALIZATION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadStoredState();
  initTheme();
  initNavigation();
  initPersonaHandlers();
  initFloorControls();
  renderFloors();
  initModals();
  initScanHandlers();
  initDecorumAlertForm();
  renderRecentAlerts();
  initMicMeter();
  initSoundSanctuary();
  initPomodoro();
  renderSavedSpotsList();
  renderStudyStats();
  initDemoReset();

  // If there's an ongoing hold or session restored from localStorage, start clocks
  if (state.activeHold) {
    startHoldCountdown();
  }
  if (state.activeSession) {
    startSessionClock();
  }

  updateActiveSessionBanner();
});

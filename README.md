# QuietSpot : P06: "A Seat to Study"

> **Design Thinking & Innovation Project**  
> **Course / Section:** K3P26HK &middot; **Project Code:** P06  
> **Institution:** Lovely Professional University (LPU), Punjab, India  
> **Focus Context:** LPU Central Library &amp; Academic Block 34 Study Spaces  
> **Team G6:** Johan Samuel Reji &middot; Abhinav Sai Nath &middot; Diya &middot; Daksh Phartiyal  
> **Deployment:** Pure static web app ready for instant GitHub Pages hosting (zero build tools, zero backend dependencies)

---

## 1. Executive Summary & Design Challenge

Modern university campus libraries face severe peak-hour congestion, acoustic friction, and territorial seat-reservation behaviors ("bag sprawling"). During our fieldwork at **Lovely Professional University (LPU)**, particularly following the 5:00 PM lecture dispersal, students frequently walk 15–20 minutes from residential hostels (e.g., BH-4, GH-1) only to find study tables occupied by unattended water bottles, jackets, and notebooks.

**QuietSpot** ("A Seat to Study") is a student-centered digital-physical service system that solves this challenge through:
1. **Pre-Arrival 15-Minute Walk Holds**: Lock in an open quiet seat before leaving class or hostel.
2. **Optical Desk QR Arrival Check-In**: Establish a verified single-occupant "Digital Desk Boundary" to eliminate bag reservation.
3. **20-Minute Break Holds**: Fair-use seat protection for water and stretch breaks that auto-releases if unreturned.
4. **100% Anonymous Quiet Alert Decorum Reporting**: Frictionless reporting of disruptions directly to floor staff without peer confrontation or identity exposure.
5. **Offline Web Audio Sound Sanctuary & Focus Tools**: Real-time synthesized acoustic masking (rain, pink noise, wind, 432Hz calm drone) and a Pomodoro sprint timer running 100% locally.

---

## 2. Design Thinking Process & Field Research Evidence

Our team executed the 5-stage Design Thinking methodology directly on the LPU campus:

```
[ EMPATHIZE ] ──> [ DEFINE ] ──> [ IDEATE ] ──> [ PROTOTYPE ] ──> [ TEST (CP6) ]
  6 Student        Point-of-View    "Map & Hold"   Interactive      Usability Audit
  Interviews       Statements &     System & QR    Web App          & 4 Core Fixes
  & 2 Field Visits Personas         Verification                    (ISS 01 to 04)
```

### Primary Fieldwork & Student Interviews
- **Interview #1 (B.Tech CSE, 3rd Year):** *"By 5:15 PM, 5th floor silent tables are completely covered with unattended notebooks. If you move someone's bottle to sit down, an argument breaks out."*
- **Interview #2 (MBA, 2nd Year):** *"Our project groups need to discuss cases, but the 3 Discussion Rooms are black boxes: you only know if one is free by physically climbing stairs to check."*
- **Interview #3 (B.Des, 4th Year):** *"I need a wall power socket because rendering drains my laptop battery in 45 minutes. Searching for open sockets wastes half my study break."*
- **Interview #4 (Law Student):** *"Students take Zoom calls inside solo study cabins. Asking them to stop leads to hostility, and library guards aren't always stationed on every aisle."*
- **Interview #5 & #6 (Hostel Residents):** Emphasized the walk time barrier (15 minutes from hostel blocks across campus) and fear of disciplinary repercussions if their student ID was attached to noise complaints.
- **Field Observation #1 (Academic Block 34, 4:45 PM):** Dozens of students sitting on concrete staircases with laptops due to lack of real-time visibility into open study alcoves on upper floors.

---

## 3. Student Personas

| Dimension | Primary Persona: **Aarav Sharma** | Secondary Persona: **Rohan Verma** |
| :--- | :--- | :--- |
| **Profile** | 3rd Year B.Tech CSE &middot; Resident (BH-4) | 2nd Year MBA &middot; Day Scholar / Commuter |
| **Mindset** | Habit-driven deep focus seeker | Adaptable exam-week peer studier |
| **Schedule** | 5:15 PM – 7:30 PM (Post-lecture rush) | Midday lecture gaps &amp; midterm sprint blocks |
| **Primary Need** | Guaranteed seat with power socket ⚡ on 5th Floor | Fast visibility into Discussion Rooms (DR-01 to DR-03) |
| **Pain Point** | Losing desks to bag reservation; wasted walk time | Climbing stairs only to find group study rooms locked or full |

---

## 4. CP6 Usability Audit & Key Fixes

During our Phase CP6 user evaluation sessions with LPU students, 4 key friction points were discovered and engineered out in QuietSpot:

```
┌─────────┬──────────────────────────────────┬─────────────────────────────────────────────────────────────┐
│ Fix ID  │ User Friction Identified         │ Engineered Solution                                         │
├─────────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ ISS-01  │ Students tapped floor headers    │ Added high-contrast primary "Hold Best Quiet Seat (15 Min)" │
│         │ expecting to hold a seat.        │ CTA buttons directly on every floor card header.            │
├─────────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ ISS-02  │ Arrival QR check-in was buried   │ Elevated "Scan Desk QR" into a persistent top nav pill +    │
│         │ in nested card menus.            │ mobile bottom nav bar with 1-tap viewfinder simulation.     │
├─────────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ ISS-03  │ Students with dying laptops      │ Added a toggleable "⚡ Power Outlets Only" filter chip and  │
│         │ couldn't spot socket desks.      │ explicit visual ⚡ socket badges on all interactive desks.   │
├─────────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ ISS-04  │ Fear of peer retaliation or      │ Implemented 100% Anonymous reporting with zero student ID,  │
│         │ discipline on noise complaints.  │ email, or name fields, backed by a prominent trust banner.  │
└─────────┴──────────────────────────────────┴─────────────────────────────────────────────────────────────┘
```

---

## 5. System Architecture & Core Navigation Tabs

### Tab 1: Map & Hold (Pre-Arrival Discovery)
- **Campus KPI Telemetry Strip**: Real-time counter of total free quiet seats, open discussion rooms, quietest zone right now (5th floor · 34 dB), and post-5:00 PM rush alert.
- **Search & Filter Toolbar**: Instant search by zone/floor, filter by "Strictly Silent", "Discussion Allowed", and "⚡ Power Outlets Only" (ISS-03), plus sorting by quietest dB or most open seats.
- **Interactive Desk Grids**: Visual seat layouts with pulsing emerald badges for open desks, visual power socket markers, and 1-tap seat selection.
- **15-Minute Walk Hold Modal**: Starts a live ticking countdown timer (15:00) with hostel-to-library walk protection.

### Tab 2: Scan Desk QR (Arrival Verification)
- **Optical Scanner Viewfinder**: Animated laser scanning bar, corner brackets, and 1-tap simulated QR code optical reader (ISS-02).
- **Digital Desk Boundary**: Single-occupant seat lock that deters territorial bag reservation.
- **20-Minute Break Hold**: Protected water/stretch break with automatic seat release if unreturned.
- **Clean Check-Out Modal**: 3-point cleanliness hand-off (table clear, no trash/bottles left, chair pushed in).

### Tab 3: Quiet Alert (Anonymous Decorum & Acoustic Tools)
- **Mandatory Trust Banner**: "100% Anonymous: Zero Student Credentials Collected" (ISS-04).
- **One-Tap Disruption Categories**:
  1. *Loud Talking in Silent Zone* (prompts rerouting to open Discussion Rooms)
  2. *Table / Bag Encroachment* (bag-sprawling deterrence)
  3. *Cabin Video Filming / Calls*
  4. *PDA / Visual Distraction*
  5. *Leftover Bottles / Desk Litter*
- **Recent Decorum Activity Feed**: Real-time log of supervisor dispatches and resolved reports.
- **6-Second Live Browser Mic Meter**: Local RMS ambient acoustic sampling via Web Audio API (`getUserMedia`) with graceful simulated telemetry fallback.
- **Library Noise Spectrum Guide**: 20–35 dB Whisper Silent, 36–44 dB Library Calm, 45–55 dB Discussion Zone.

### Tab 4: My Routine (Personalization & Viva Inspector)
- **Live Persona Switcher**: Instant toggle between Aarav Sharma and Rohan Verma for viva presentations.
- **Silent Co-Study Mode**: Highlights desks near other quiet solo studiers to build community without conversation.
- **Saved Favorite Sanctuaries**: Local bookmarking for quick floor access.
- **Web Audio Sound Sanctuary**: 100% offline, procedural ambient generator:
  - 🌧️ *Gentle Rain* (filtered pink noise with randomized flutter)
  - 〰️ *Pink Noise* (Paul Kellet 6-pole filter algorithm)
  - 🍃 *Forest Wind* (LFO-swept resonant bandpass filter)
  - 🧘 *Calm Drone (432Hz)* (dual-harmonic pure sine/triangle wave generator)
- **Focus Sprint Pomodoro Timer**: 25m focus, 50m deep work, 5m rest, with soothing 3-tone harmonic chime alerts.
- **Evaluator Inspector Panel**: Collapsible research traceability drawer connecting features back to interviews and CP6 audit fixes.
- **Reset Demo State Button**: Single-tap footer button to reset `localStorage` to clean state for live class evaluations.

---

## 6. Pre-Populated Realistic LPU Campus Spaces

| Campus Zone | Noise Level | Type | Key Features |
| :--- | :--- | :--- | :--- |
| **Central Library: 5th Floor** | 34 dB (Whisper Silent) | Silent | 12 Desks (5F-A01 to 5F-C04), Corner Solo `5F-B04` ⚡, Strict Quiet Policy |
| **Central Library: 4th Floor** | 38 dB (Library Calm) | Silent | 12 Desks (4F-A01 to 4F-B06), Reference Stacks, Natural Daylight |
| **Central Library: 2nd Floor** | 42 dB (Gentle Murmur) | Solo Cabins | 8 Private Cabins (2F-CAB01 to 2F-CAB08), Thesis Drafting, Power Outlets |
| **Central Library: Discussion Rooms** | 54 dB (Collaborative) | Group Zone | Discussion Rooms DR-01 (Open), DR-02 (Occupied), DR-03 (Open), Basement Hall |
| **Academic Block 34: Study Corners** | 46 dB (Gentle Murmur) | Overflow | 6 Desks/Alcoves (34-ALC01 to 34-ALC06), 2-min walk from lectures (prevents staircase study) |

---

## 7. Technology Stack & Modern Web Standards

- **Markup:** Pure HTML5 with semantic landmarks (`<header>`, `<main>`, `<section>`, `<aside>`, `<dialog>`, `<footer>`), ARIA attributes, and SVG iconography.
- **Styling:** CSS3 structured in Cascade Layers (`@layer reset, base, layout, components, utilities`), `light-dark()` tokens with `@media (prefers-color-scheme: dark)` fallback, standard `scrollbar-color`, and responsive Flexbox/Grid.
- **Scripting:** Modern vanilla ES6+ JavaScript, `localStorage` persistence, and the native **Web Audio API** (`AudioContext`, `BiquadFilterNode`, `OscillatorNode`, `AudioBufferSourceNode`, `AnalyserNode`).
- **Zero Dependencies:** No React, Vue, Tailwind, npm, Vite, or external build steps. Loads instantly and runs completely offline.

---

## 8. How to Run & Present

### Option 1: Direct in Browser
Simply open `index.html` in any web browser (Chrome, Edge, Firefox, Safari):
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Option 2: Local HTTP Server (Recommended for Live Demos)
```bash
# Python 3
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.

### Option 3: GitHub Pages Deployment
1. Push this repository to GitHub.
2. In repository settings, navigate to **Pages** &rarr; select branch **`main`** &rarr; root folder **`/`**.
3. QuietSpot will be live on `https://<username>.github.io/QuietSpot/`.

---

## 9. Academic Project Credits

**Lovely Professional University (LPU)**  
*School of Computer Science and Engineering / Department of Design Thinking*  
**Course Code:** K3P26HK &middot; **Project:** P06: "A Seat to Study"  

**Team G6:**
- **Johan Samuel Reji**
- **Abhinav Sai Nath**
- **Diya**
- **Daksh Phartiyal**

*Evaluation Note:* For live viva presentations, tap the **"Reset Demo State"** button in the footer to restore default campus telemetry, open desks, and initial alerts.

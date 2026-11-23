# Quiet Spot

> **Find your sanctuary of silence.**  
> A lightweight, distraction-free web app for discovering tranquil study spaces, serene library nooks, and calm cafes, paired with a native Web Audio ambient sound generator and focus sprint timer.

---

## Overview

Modern environments are loud and overstimulating. **Quiet Spot** helps students, researchers, remote workers, and deep-thinkers locate low-noise sanctuaries in their area. In addition to a searchable directory of quiet spaces, Quiet Spot includes a built-in offline ambient sound generator and a focus sprint timer to help you maintain flow state wherever you work.

---

## Key Features

### 1. Curated Quiet Spots Directory
- **Category Filtering**: Explore locations by type — *Libraries & Archives*, *Calm Cafes & Tea Houses*, *Gardens & Courtyards*, *Soundproof Pods*, and *Bookstores*.
- **Acoustic Decibel (dB) Ratings**: Each spot displays an estimated ambient sound level (e.g. `28 dB · Whisper Quiet`) accompanied by a visual decibel scale.
- **Search & Filter**: Real-time search across location names, neighborhoods, descriptions, and amenity tags.
- **Save Sanctuaries**: Bookmark spots to easily revisit your personalized favorites list, saved locally via `localStorage`.

### 2. Built-in Sound Sanctuary (Web Audio API)
- **Zero External Audio Dependencies**: Ambient audio tracks are synthesized in real-time directly through the browser's native **Web Audio API** — no large audio files or network requests required.
- **Synthesized Channels**:
  - 🌧️ **Gentle Rain**: Filtered pink noise with randomized flutter curves.
  - 〰️ **Pink Noise**: Paul Kellet filtered algorithm for balanced acoustic masking.
  - 🍃 **Forest Breeze**: Bandpass-filtered resonant sweep modulated via low-frequency oscillators.
  - 🧘 **Calm Drone (432Hz)**: Dual-harmonic soothing sine and triangle wave generator.
- **Individual & Master Controls**: Per-sound volume sliders, active toggles, and a master volume control.

### 3. Focus Sprint Timer
- **Timed Sessions**: Preset options for 25-minute focus sprints (Pomodoro), 50-minute deep-work blocks, and 5-minute rest breaks.
- **Live Tab Indicator**: Updates the browser tab title in real-time with remaining minutes and seconds.
- **Ambient Chime Alert**: Plays a gentle 3-tone harmonic chime synthesized through Web Audio when the timer completes.

### 4. Share & Recommend Sanctuaries
- Accessible submission modal built on the native HTML `<dialog>` element.
- Submit custom spots with name, category, noise level, location, and amenity checklists (Wi-Fi, outlets, daylight, quiet policy).
- Newly added locations are immediately saved into your browser's `localStorage` and added to your directory.

### 5. Adaptive Theming & Accessibility
- **Automatic & Manual Theming**: Respects your OS color scheme (`light` / `dark`) by default, with an instant toggle button to force light or dark mode.
- **FOUC Prevention**: Uses `<meta name="color-scheme" content="light dark">` and standard `color-scheme` declarations to prevent theme flash during page loads.
- **Modern CSS Architecture**: Built using CSS Cascade Layers (`@layer reset, base, layout, components, utilities`) and standard `scrollbar-color`.
- **Keyboard Navigation & Motion Respect**: Full `:focus-visible` ring indicators, `Esc` and light-dismiss support for dialogs, and `prefers-reduced-motion` optimizations.

---

## Project Structure

```text
QuietSpot/
├── index.html     # Semantic HTML5 markup, accessible landmarks, and dialog
├── styles.css     # Layered CSS styles, design tokens, light/dark themes
├── app.js         # Reactive state, Web Audio synthesizer, and focus timer
└── README.md      # Project documentation
```

### File Breakdown

| File | Purpose |
| :--- | :--- |
| **`index.html`** | Houses the semantic structure (`<header>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>`), search bar, sound player layout, and SVG icons. |
| **`styles.css`** | Encapsulates design tokens (`light-dark()`, CSS variables), cascade layers, responsive grid/flexbox layouts, dialog backdrop blur, and scrollbar rules. |
| **`app.js`** | Handles spot filtering and search, bookmarks, modal interactions, `localStorage` synchronization, the `AmbientSoundEngine`, and Pomodoro clock logic. |

---

## Getting Started

Quiet Spot is completely static and client-side. There are **no build steps**, **no node dependencies**, and **no package installations required**.

### Option 1: Direct in Browser
Simply double-click or open `index.html` in any modern web browser:
```bash
# On Windows (PowerShell)
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

### Option 2: Local HTTP Server (Recommended)
If you prefer running through a local development server:

Using **Python 3**:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

Using **Node.js**:
```bash
npx serve .
```

---

## Technical Specifications

- **HTML**: Semantic HTML5, Native `<dialog>` with `closedby="any"` and light-dismiss fallback.
- **CSS**: CSS Cascade Layers (`@layer`), CSS Custom Properties, `color-scheme: light dark`, `light-dark()` color tokens, logical properties (`padding-inline`, `margin-block`), and responsive grid layouts.
- **JavaScript**: Modern ES6+ (vanilla), Web Audio API (`AudioContext`, `BiquadFilterNode`, `OscillatorNode`, `AudioBufferSourceNode`), and `localStorage` API.
- **Browser Compatibility**: Chrome, Edge, Firefox, Safari (desktop and mobile).

---

## Decibel Scale Reference

Quiet Spot classifies locations according to sound pressure levels:

| Decibel Range | Classification | Ideal For |
| :--- | :--- | :--- |
| **20 – 30 dB** | *Whisper Solitude* | Intense analytical thought, meditation, deep coding, and writing. |
| **30 – 42 dB** | *Library Calm* | Reading, structured research, drafting, and problem solving. |
| **42 – 52 dB** | *Gentle Atmosphere* | Casual creative sketching, relaxed study sessions, and light coffeehouse collaboration. |

---

## License

This project is licensed under the [MIT License](LICENSE) — free to use, modify, and distribute.

# Bassically

A visual bass guitar trainer built with React, Tailwind CSS, and Web Audio API. Learn the fretboard, explore notes, and practice chord progressions with an interactive neon-themed interface.

**[Live Demo](https://bassically.app)**

## Features

### Discovery Mode
Select any note from the chromatic scale and see every instance highlighted across the fretboard. Notes arpeggiate from low to high when selected, making it easy to hear and see the relationships.

### NNS Sequencer
Nashville Number System sequencer with 12 popular bass progressions (I-IV-V, I-V-vi-IV, 12-bar blues, etc.). Color-coded chord degrees — cyan for root, magenta for fourth, lime for fifth, amber for minor degrees. Adjustable tempo (40-200 BPM) with auto-advancing playback that varies octave voicings.

### Stage (Free Play)
Tap anywhere on the fretboard to hear the note. Works across all modes — every fret is always playable. Strings visually vibrate when plucked.

### Settings
Tuning presets (Standard, Drop D, Low B), adjustable fret count (12-24), left-handed mode, and audio output test.

## Tech Stack

- **React 18** — Component architecture
- **Vite** — Build tool and dev server
- **Tailwind CSS v4** — Styling with custom design tokens
- **Zustand** — State management with localStorage persistence
- **Web Audio API** — Synthesized bass tones (sawtooth + sine sub-oscillator, low-pass filter, gain envelope)
- **Vercel** — Deployment

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/dalmaer/bassically.git
cd bassically
npm install
npm run dev
```

The dev server runs on `http://localhost:5173`.

### Build

```bash
npm run build
```

Output goes to `dist/`.

### Deploy

```bash
npx vercel --prod
```

Or push to `main` — Vercel auto-deploys.

## Project Structure

```
src/
├── audio/
│   ├── AudioEngine.js        # Web Audio API synth (polyphonic)
│   └── noteFrequencies.js    # MIDI-to-frequency conversion
├── music/
│   ├── noteMap.js            # Chromatic note math
│   ├── tunings.js            # Bass tuning presets
│   ├── fretboard.js          # Fretboard grid generation
│   ├── nashville.js          # Nashville Number System
│   └── progressions.js       # Chord progression presets
├── stores/
│   ├── useAppStore.js        # Mode, settings, active notes
│   ├── useAudioStore.js      # Audio engine singleton
│   └── useSequencerStore.js  # NNS sequencer state
├── hooks/
│   ├── useAudioEngine.js     # Audio playback hook
│   ├── useFretboardData.js   # Derived fretboard data
│   ├── useFretboardPlay.js   # Tap-to-play on any mode
│   └── useNashville.js       # Nashville chord resolution
├── components/
│   ├── fretboard/            # Fretboard rendering (neck, strings, notes, markers)
│   ├── sequencer/            # NNS controls (key, progression, playback, legend)
│   ├── discovery/            # Note picker, enharmonic toggle
│   ├── modes/                # Mode screens + settings modal
│   └── layout/               # Header, footer
└── utils/
    ├── cn.js                 # Class name merge (clsx)
    └── fretSpacing.js        # 12-TET fret width calculation
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Void | `#050505` | Background |
| Surface | `#111113` | Cards, panels |
| Neon Cyan | `#00F0FF` | Root notes, primary actions |
| Neon Magenta | `#FF00FF` | Fourth degree, accents |
| Neon Lime | `#CCFF00` | Fifth degree |
| Neon Amber | `#FF9500` | Minor degrees (ii, iii, vi) |

**Fonts:** Space Grotesk (display), Rajdhani (UI), Space Mono (monospace), JetBrains Mono (code)

## License

MIT

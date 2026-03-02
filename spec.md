Project Spec: "Low End" Bass Trainer
1. Core Visual Engine
The centerpiece is a responsive, interactive SVG or Grid-based fretboard.

Orientation: Horizontal, scrolling if necessary on mobile.

String Layout: 4 Strings.

Top: G (highest pitch)

Bottom: E (lowest pitch)

Fret Markers: Standard markers at frets 3, 5, 7, 9, 12 (double dot), 15, 17, 19.

Tap Targets: Each fret-string intersection must have a minimum hit area of 44x44px for mobile accessibility.

2. Interaction & Audio
The "Pluck" Mechanic:

On Press: The note bubble appears (e.g., "C#"), the string vibrates/glows, and the corresponding .wav or .mp3 sample triggers.

On Release: The visual "press" state ends, but the audio sustains (or follows a decay envelope).

Audio Engine: Use the Web Audio API or Tone.js for low-latency playback. Polyphony is required so notes don't cut each other off during fast runs.

3. Learning Modes
A. Note Discovery (Global Mapping)
Trigger: User types or selects a note from a dropdown (e.g., "Bb").

Action: The app highlights every instance of that note across all 4 strings simultaneously.

Logic: A simple modulo-12 calculation based on the string's open note pitch.

B. Nashville Number System (NNS) Sequencer
Input 1 (Root): User selects a Key (e.g., A Major).

Input 2 (Progression): User enters a sequence (e.g., 1 - 4 - 5).

The "Rotation":

The app calculates the notes (A, D, E).

It highlights the "1" (A).

On a "Next" tap or a timed interval, it clears and highlights the "4" (D), then the "5" (E), then loops back.

Visual Cue: Use different colors for the 1 (Root), 4 (Subdominant), and 5 (Dominant) to help the brain map intervals.

4. Technical Implementation Details
Feature	Implementation Suggestion
Styling	Tailwind CSS for the fretboard grid and "glow" animations.
State Management	Zustand or React Context to track the active Key and Progression.
Audio Samples	A folder of 24–48 high-quality mono bass samples (E0 to G2+).
Testing	Playwright to simulate "fret taps" and verify the correct note labels appear in the DOM.
5. Data Logic (The Math)
To map the fretboard programmatically, you can use an array of semitones:

Open Strings: [G: 10, D: 5, A: 0, E: -5] (relative to A)

Note Logic: (OpenStringValue + FretNumber) % 12

Nashville Logic: Use a Major Scale interval map [0, 2, 4, 5, 7, 9, 11] to translate "1-4-5" into semitone offsets from the Root.

Pro Tip: Don't forget an "Enharmonic Toggle." Some bassists want to see A#, others want to see Bb. Give them a toggle to switch between sharps and flats.

Would you like me to draft the Tailwind/React code structure for the fretboard component to get you started?

export class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.activeVoices = new Map();
  }

  // Must be called synchronously inside a user gesture for iOS Safari
  init() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.audioContext.resume(); // fire-and-forget, stays in gesture context

    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.setValueAtTime(0.8, this.audioContext.currentTime);
    this.masterGain.connect(this.audioContext.destination);

    // Unlock iOS audio by playing a real oscillator at zero gain.
    // Buffer sources alone don't unlock on all iOS versions.
    const unlockGain = this.audioContext.createGain();
    unlockGain.gain.setValueAtTime(0, this.audioContext.currentTime);
    unlockGain.connect(this.audioContext.destination);

    const unlockOsc = this.audioContext.createOscillator();
    unlockOsc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    unlockOsc.connect(unlockGain);
    unlockOsc.start(this.audioContext.currentTime);
    unlockOsc.stop(this.audioContext.currentTime + 0.01);
  }

  midiToFrequency(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  playNote(midiNote, { duration = 1.5, velocity = 0.7 } = {}) {
    if (!this.audioContext) return null;

    // Resume if suspended (iOS Safari suspends on tab switch)
    if (this.audioContext.state !== 'running') {
      this.audioContext.resume();
    }

    const frequency = this.midiToFrequency(midiNote);
    const now = this.audioContext.currentTime;

    // Sawtooth oscillator for bass-like tone
    const osc = this.audioContext.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(frequency, now);

    // Sub oscillator (sine, one octave below) for bottom end
    const subOsc = this.audioContext.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(frequency / 2, now);

    // Low-pass filter for warmth
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(1.5, now);

    // Gain envelope
    const envelope = this.audioContext.createGain();
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(velocity, now + 0.008);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Sub gain (lower volume for sub)
    const subGain = this.audioContext.createGain();
    subGain.gain.setValueAtTime(velocity * 0.5, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Connect: osc -> filter -> envelope -> master
    osc.connect(filter);
    filter.connect(envelope);
    envelope.connect(this.masterGain);

    // Connect sub: subOsc -> subGain -> master
    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
    subOsc.start(now);
    subOsc.stop(now + duration);

    const voiceId = `${midiNote}-${Date.now()}`;
    this.activeVoices.set(voiceId, { osc, subOsc, envelope });
    osc.onended = () => this.activeVoices.delete(voiceId);

    return voiceId;
  }

  setVolume(value) {
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(
        Math.max(0, Math.min(1, value)),
        this.audioContext.currentTime
      );
    }
  }

  get isReady() {
    return this.audioContext?.state === 'running';
  }
}

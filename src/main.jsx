import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { useAudioStore } from './stores/useAudioStore';

// Eagerly init audio on first user interaction (critical for iOS Safari).
// touchstart at capture phase fires BEFORE pointerdown preventDefault() can
// suppress touchend/click. This ensures AudioContext is created inside a
// trusted gesture on iOS.
let audioUnlocked = false;
const unlockAudio = () => {
  if (audioUnlocked) return;
  audioUnlocked = true;
  useAudioStore.getState().initEngine();
};
document.addEventListener('touchstart', unlockAudio, { capture: true, once: false });
document.addEventListener('mousedown', unlockAudio, { capture: true, once: false });
document.addEventListener('click', unlockAudio, { capture: true, once: false });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { useAudioStore } from './stores/useAudioStore';

// Eagerly init audio on first user interaction (critical for iOS Safari)
// Use multiple events — iOS Safari needs this in a trusted gesture context
const initOnGesture = () => {
  useAudioStore.getState().initEngine();
};
document.addEventListener('touchend', initOnGesture, { once: true });
document.addEventListener('click', initOnGesture, { once: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { useAudioStore } from './stores/useAudioStore';

// Eagerly init audio on first user interaction (critical for iOS Safari)
const initOnGesture = () => {
  useAudioStore.getState().initEngine();
  document.removeEventListener('touchstart', initOnGesture);
  document.removeEventListener('mousedown', initOnGesture);
};
document.addEventListener('touchstart', initOnGesture, { once: true });
document.addEventListener('mousedown', initOnGesture, { once: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

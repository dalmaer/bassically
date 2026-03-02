import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FreePlayMode from './components/modes/FreePlayMode';
import DiscoveryMode from './components/modes/DiscoveryMode';
import SequencerMode from './components/modes/SequencerMode';
import SettingsModal from './components/modes/SettingsModal';
import { useAppStore } from './stores/useAppStore';

export default function App() {
  const activeMode = useAppStore((s) => s.activeMode);
  const isSettingsOpen = useAppStore((s) => s.isSettingsOpen);

  return (
    <div className="bg-void text-text-main h-screen w-full overflow-hidden flex flex-col font-ui antialiased selection:bg-neon-cyan selection:text-void">
      <Header />
      <main className="flex-1 relative flex flex-col overflow-hidden">
        {activeMode === 'freeplay' && <FreePlayMode />}
        {activeMode === 'discovery' && <DiscoveryMode />}
        {activeMode === 'sequencer' && <SequencerMode />}
      </main>
      <Footer />
      {isSettingsOpen && <SettingsModal />}
    </div>
  );
}

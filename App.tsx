
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

// Define a type for the audio nodes to keep track of them
interface AudioNodes {
  audioContext: AudioContext;
  drone1: OscillatorNode;
  drone2: OscillatorNode;
  gainNode: GainNode;
  filter: BiquadFilterNode;
  pingInterval: number;
}

const App: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioNodesRef = useRef<AudioNodes | null>(null);

  const createAudio = () => {
    // Prevent creating multiple audio contexts
    if (audioNodesRef.current) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    // Set initial values for audio nodes
    gainNode.gain.value = 0; // Start silent
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    // Drone 1: A deep, foundational hum
    const drone1 = audioContext.createOscillator();
    drone1.type = 'sawtooth';
    drone1.frequency.value = 50; 

    // Drone 2: Slightly detuned for a phasing/chorus effect
    const drone2 = audioContext.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 50.5;

    // Connect the nodes: Drones -> Filter -> Gain -> Output
    drone1.connect(filter);
    drone2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    drone1.start();
    drone2.start();

    // Create periodic, random "pings" to simulate data streams
    const pingInterval = window.setInterval(() => {
      if (audioContext.state === 'running' && isMusicPlaying) {
        const pingOsc = audioContext.createOscillator();
        const pingGain = audioContext.createGain();
        pingOsc.type = 'sine';
        pingOsc.frequency.value = Math.random() * 400 + 400; // 400-800Hz
        
        // Quick attack-decay envelope for the ping sound
        pingGain.gain.setValueAtTime(0.1, audioContext.currentTime);
        pingGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
        
        pingOsc.connect(pingGain);
        pingGain.connect(audioContext.destination);
        pingOsc.start(audioContext.currentTime);
        pingOsc.stop(audioContext.currentTime + 0.5);
      }
    }, 5000 + Math.random() * 5000); // every 5-10 seconds

    audioNodesRef.current = { audioContext, drone1, drone2, gainNode, filter, pingInterval };
  };

  const toggleMusic = () => {
    // Initialize audio on first user interaction to comply with autoplay policies
    if (!audioNodesRef.current) {
      createAudio();
    }
    
    const { audioContext } = audioNodesRef.current!;
    // If context is suspended, user gesture will resume it
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    setIsMusicPlaying(prev => !prev);
  };
  
  useEffect(() => {
    const audioNodes = audioNodesRef.current;
    if (audioNodes) {
        // Smoothly fade audio in or out
        const targetVolume = isMusicPlaying ? 0.05 : 0;
        audioNodes.gainNode.gain.setTargetAtTime(targetVolume, audioNodes.audioContext.currentTime, 0.2);
    }
    
    // Cleanup function to close the audio context and clear intervals on component unmount
    return () => {
      if (audioNodesRef.current) {
        clearInterval(audioNodesRef.current.pingInterval);
        audioNodesRef.current.audioContext.close();
        audioNodesRef.current = null;
      }
    };
  }, [isMusicPlaying]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header isMusicPlaying={isMusicPlaying} onToggleMusic={toggleMusic} />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
};

export default App;

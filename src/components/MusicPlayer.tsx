import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// Import the music file
import weddingMusic from '../assets/couple/music.mp3';

interface MusicPlayerProps {
  autoplay?: boolean;
}

const MusicPlayer = ({}: MusicPlayerProps) => {
  const [isPlaying] = useState(true); // Auto-play by default
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio(weddingMusic); // Using imported music file
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // 40% volume
    audioRef.current.muted = isMuted;
    
    // Auto-play music when user first interacts with page
    const handleUserInteraction = () => {
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log('Auto-play blocked, user needs to interact');
        });
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touch', handleUserInteraction);
      }
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touch', handleUserInteraction);
    
    // Start auto-play attempt after a short delay
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log('Auto-play blocked by browser');
        });
      }
    }, 1000);
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touch', handleUserInteraction);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };


  return (
    <>
      {/* Web Audio API - No HTML audio element needed */}

      {/* Floating Music Notes Animation */}
      {isPlaying && !isMuted && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [50, -50],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                delay: i * 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute text-xl text-purple-400"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
            >
              {['♪', '♫', '♬', '♩', '♪', '♫'][i]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Minimal Music Control */}
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
          className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isMuted ? <VolumeX size={18} className="text-gray-500" /> : <Volume2 size={18} className="text-purple-600" />}
          <span className="text-xs text-gray-600 font-medium">Music {isMuted ? 'Off' : 'On'}</span>
        </motion.button>
      </div>
    </>
  );
};

export default MusicPlayer;

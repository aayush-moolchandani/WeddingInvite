import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// Import the music file
import weddingMusic from '../assets/couple/music.mp3';

interface MusicPlayerProps {
  autoplay?: boolean;
}

const MusicPlayer = ({}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false); // Start as stopped
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(true); // Show play prompt initially
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio(weddingMusic); // Using imported music file
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // 40% volume
    audioRef.current.muted = isMuted;
    
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPlayPrompt(false);
      }).catch(() => {
        console.log('Could not start music');
      });
    }
  };

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

      {/* Music Controls */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {/* Play Prompt */}
        {showPlayPrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startMusic}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Volume2 size={18} />
              <span className="text-sm font-medium">🎵 Play Music</span>
            </motion.button>
          </motion.div>
        )}
        
        {/* Mute Control */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isMuted ? <VolumeX size={18} className="text-gray-500" /> : <Volume2 size={18} className="text-purple-600" />}
              <span className="text-xs text-gray-600 font-medium">Music {isMuted ? 'Off' : 'On'}</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;

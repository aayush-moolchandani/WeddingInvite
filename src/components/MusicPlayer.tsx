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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Force music to start on ANY click/touch anywhere on page
  useEffect(() => {
    const globalClick = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          document.removeEventListener('click', globalClick);
          document.removeEventListener('touchstart', globalClick);
        } catch (e) {}
      }
    };

    document.addEventListener('click', globalClick, { once: true });
    document.addEventListener('touchstart', globalClick, { once: true });

    return () => {
      document.removeEventListener('click', globalClick);
      document.removeEventListener('touchstart', globalClick);
    };
  }, [isPlaying]);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio(weddingMusic); // Using imported music file
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // 40% volume
    audioRef.current.muted = isMuted;
    audioRef.current.preload = "auto";
    

    // Multiple timing-based attempts
    const attemptTimes = [100, 500, 1000, 2000, 3000, 5000]; // Try every interval
    
    attemptTimes.forEach((delay) => {
      setTimeout(async () => {
        if (audioRef.current && !isPlaying) {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (e) {
            console.log(`Auto-play attempt ${delay}ms failed`);
          }
        }
      }, delay);
    });

    // Event-based fallbacks
    const events = ['load', 'click', 'touchstart', 'scroll', 'mousemove', 'keydown'];
    
    const handleEvent = async (event: Event) => {
      if (audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          
          // Remove all event listeners once music starts
          events.forEach(eventName => {
            window.removeEventListener(eventName, handleEvent);
            document.removeEventListener(eventName, handleEvent);
          });
        } catch (e) {
          console.log(`${event.type} trigger failed`);
        }
      }
    };

    // Add all event listeners
    events.forEach(eventName => {
      window.addEventListener(eventName, handleEvent, { passive: true, once: true });
      document.addEventListener(eventName, handleEvent, { passive: true, once: true });
    });

    // Try focusing window (some browsers allow auto-play for focused windows)
    const focusPlay = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          window.focus();
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {}
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', focusPlay, { once: true });
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      events.forEach(eventName => {
        window.removeEventListener(eventName, handleEvent);
        document.removeEventListener(eventName, handleEvent);
      });
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

      {/* Minimal Music Control - Only Visible When Playing */}
      {isPlaying && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isMuted ? <VolumeX size={16} className="text-gray-500" /> : <Volume2 size={16} className="text-purple-600" />}
              <span className="text-xs text-gray-600 font-medium">{isMuted ? 'Music Off' : 'Music On'}</span>
            </motion.button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;

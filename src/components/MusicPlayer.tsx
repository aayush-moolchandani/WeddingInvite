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

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio(weddingMusic); // Using imported music file
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // 40% volume
    audioRef.current.muted = isMuted;
    audioRef.current.preload = "auto";
    
    // Multiple auto-play attempts
    const attemptAutoPlay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto-play blocked by browser');
          
          // Try again after user scrolls
          const handleScroll = async () => {
            if (audioRef.current && !isPlaying) {
              try {
                await audioRef.current.play();
                setIsPlaying(true);
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('mousemove', handleMouseMove);
              } catch (e) {
                console.log('Still blocked');
              }
            }
          };
          
          const handleMouseMove = async () => {
            if (audioRef.current && !isPlaying) {
              try {
                await audioRef.current.play();
                setIsPlaying(true);
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('mousemove', handleMouseMove);
              } catch (e) {
                console.log('Still blocked');
              }
            }
          };
          
          // Try on first scroll or mouse movement
          window.addEventListener('scroll', handleScroll, { once: true });
          window.addEventListener('mousemove', handleMouseMove, { once: true });
          
          // Final attempt after 2 seconds
          setTimeout(async () => {
            if (audioRef.current && !isPlaying) {
              try {
                await audioRef.current.play();
                setIsPlaying(true);
              } catch (e) {
                console.log('All auto-play attempts failed');
              }
            }
          }, 2000);
        }
      }
    };
    
    // Start auto-play after component mounts
    setTimeout(attemptAutoPlay, 500);
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('scroll', attemptAutoPlay);
      window.removeEventListener('mousemove', attemptAutoPlay);
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

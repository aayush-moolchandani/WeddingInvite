import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  autoplay?: boolean;
}

const MusicPlayer = ({ autoplay = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Auto-show the music player on first visit
    const hasVisited = localStorage.getItem('musicPlayerVisited');
    if (!hasVisited) {
      setIsVisible(true);
      localStorage.setItem('musicPlayerVisited', 'true');
    } else {
      setIsVisible(false);
    }
  }, []);

  // Create a beautiful synthetic wedding melody
  const createWeddingMelody = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      if (!ctx) return;
      
      // Wedding melody notes (romantic scale)
      const melody = [262, 294, 330, 349, 392, 440, 494, 523]; // C4 to C5
      const duration = 8; // seconds for full melody
      
      // Create melody
      melody.forEach((frequency, index) => {
        setTimeout(() => {
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
          oscillator.type = 'sine';
          
          // Volume envelope
          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.1 * (isMuted ? 0 : 1), ctx.currentTime + 0.1);
          gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
          
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 1);
        }, index * 1000); // Play each note every second
      });
      
    } catch (error) {
      console.log('Audio synthesis not supported:', error);
    }
  };

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      createWeddingMelody();
      
      // Repeat the melody every 10 seconds
      const interval = setInterval(() => {
        if (isPlaying) {
          createWeddingMelody();
        } else {
          clearInterval(interval);
        }
      }, 10000);
      
    } else {
      setIsPlaying(false);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const hidePlayer = () => {
    setIsVisible(false);
  };

  return (
    <>
      {/* Web Audio API - No HTML audio element needed */}

      {/* Floating Music Notes Animation */}
      {isPlaying && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: [0, 1, 0],
                y: [100, -100],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                delay: i * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute text-2xl text-purple-400"
              style={{
                left: `${10 + i * 12}%`,
                fontSize: `${16 + i * 2}px`,
              }}
            >
              {['♪', '♫', '♬', '♩', '♪', '♫', '♬', '♩'][i]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Music Player */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20"
            >
              {/* Song Info */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center mb-2">
                  <Music className="text-purple-600 mr-2" size={20} />
                  <span className="text-sm font-medium text-gray-700">Wedding Melody</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Dekha Hazaro Dafaa</h3>
                <p className="text-xs text-gray-500 mb-1">Arijit Singh • Best Of Romance</p>
                <motion.a 
                  href="https://www.jiosaavn.com/song/dekha-hazaro-dafaa/LxEqSEBgYEY"
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="text-xs text-purple-600 hover:text-purple-700 underline inline-block mb-1"
                >
                  📀 Listen on JioSaavn
                </motion.a>
                <p className="text-xs text-gray-400">💫 Perfect for wedding vibes</p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={hidePlayer}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                >
                  ✕
                </motion.button>
              </div>

              {/* Play Status Indicator */}
              <div className="text-center">
                {isPlaying ? (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xs text-green-600 font-medium"
                  >
                    🔊 Playing • Romantic Vibes
                  </motion.div>
                ) : (
                  <p className="text-xs text-gray-500 font-medium">⏸️ Paused</p>
                )}
              </div>

              {/* Spotify-esque Progress Bar (Visual Only) */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
                    style={{ width: '33%' }}
                    animate={isPlaying ? { width: ['33%', '55%', '78%', '33%'] } : {}}
                    transition={{ duration: 8, repeat: isPlaying ? Infinity : 0 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1:24</span>
                  <span>3:27</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Button to Show Player */}
      {!isVisible && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300"
        >
          <Music size={24} />
        </motion.button>
      )}
    </>
  );
};

export default MusicPlayer;
